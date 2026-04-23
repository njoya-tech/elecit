// import React, { useState, useCallback } from "react";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import { useCatalogue } from "../../hook/useCatalogue";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// // Configuration du worker PDF.js (CDN)
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// // ─── Icônes ────────────────────────────────────────────────────────────────────

// const ArrowLeftIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
//     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
//   </svg>
// );

// const DownloadIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
//     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//     <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
//   </svg>
// );

// const ChevronIcon = ({ dir = "left" }) => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
//     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
//     style={{ transform: dir === "right" ? "rotate(180deg)" : undefined }}>
//     <polyline points="15 18 9 12 15 6" />
//   </svg>
// );

// const ZoomInIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
//     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
//     <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
//   </svg>
// );

// const ZoomOutIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
//     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
//     <line x1="8" y1="11" x2="14" y2="11" />
//   </svg>
// );

// // ─── Composants UI ─────────────────────────────────────────────────────────────

// const BackButton = ({ label, onClick }) => (
//   <button onClick={onClick}
//     className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#006F95] transition-colors duration-150 group">
//     <span className="transition-transform duration-150 group-hover:-translate-x-0.5">
//       <ArrowLeftIcon />
//     </span>
//     {label}
//   </button>
// );

// const IconButton = ({ onClick, disabled, title, children }) => (
//   <button onClick={onClick} disabled={disabled} title={title}
//     className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150">
//     {children}
//   </button>
// );

// const Divider = () => <div className="w-px h-5 bg-gray-200 mx-1" />;

// // ─── Toolbar ───────────────────────────────────────────────────────────────────

// const PdfToolbar = ({
//   currentPage, numPages,
//   onPrev, onNext,
//   scale, onZoomIn, onZoomOut, onResetZoom,
//   fileUrl, downloadLabel,
// }) => (
//   <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
//     {/* Pagination */}
//     <div className="flex items-center gap-1">
//       <IconButton onClick={onPrev} disabled={currentPage <= 1} title="Page précédente">
//         <ChevronIcon dir="left" />
//       </IconButton>
//       <span className="text-xs text-gray-500 font-medium tabular-nums px-2 min-w-[5rem] text-center">
//         {currentPage} / {numPages ?? "–"}
//       </span>
//       <IconButton onClick={onNext} disabled={currentPage >= (numPages ?? 1)} title="Page suivante">
//         <ChevronIcon dir="right" />
//       </IconButton>
//     </div>

//     {/* Zoom */}
//     <div className="flex items-center gap-1">
//       <IconButton onClick={onZoomOut} disabled={scale <= 0.5} title="Dézoomer">
//         <ZoomOutIcon />
//       </IconButton>
//       <button onClick={onResetZoom}
//         className="text-xs text-gray-500 hover:text-gray-900 font-medium tabular-nums px-2 py-1 rounded hover:bg-gray-100 transition-colors duration-150 min-w-[3.5rem] text-center">
//         {Math.round(scale * 100)}%
//       </button>
//       <IconButton onClick={onZoomIn} disabled={scale >= 3} title="Zoomer">
//         <ZoomInIcon />
//       </IconButton>
//     </div>

//     {/* Download */}
//     <a href={fileUrl} download target="_blank" rel="noopener noreferrer"
//       className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#006F95] hover:bg-[#005a7a] text-white text-xs font-semibold rounded-md transition-colors duration-150">
//       <DownloadIcon />
//       {downloadLabel}
//     </a>
//   </div>
// );

// // ─── Skeleton de chargement ────────────────────────────────────────────────────

// const PageSkeleton = ({ width = 680 }) => (
//   <div className="animate-pulse rounded-lg bg-gray-100 mx-auto"
//     style={{ width, height: width * 1.414 }} />
// );

// // ─── Viewer principal ──────────────────────────────────────────────────────────

// const PdfViewer = ({ url, title, downloadLabel }) => {
//   const [numPages, setNumPages] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [scale, setScale] = useState(1.0);
//   const [pageLoaded, setPageLoaded] = useState(false);

//   const onDocumentLoadSuccess = useCallback(({ numPages }) => {
//     setNumPages(numPages);
//     setCurrentPage(1);
//   }, []);

//   const goToPrev = () => { setCurrentPage(p => Math.max(1, p - 1)); setPageLoaded(false); };
//   const goToNext = () => { setCurrentPage(p => Math.min(numPages, p + 1)); setPageLoaded(false); };
//   const zoomIn = () => setScale(s => Math.min(3, parseFloat((s + 0.25).toFixed(2))));
//   const zoomOut = () => setScale(s => Math.max(0.5, parseFloat((s - 0.25).toFixed(2))));
//   const resetZoom = () => setScale(1.0);

//   return (
//     <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
//       <PdfToolbar
//         currentPage={currentPage} numPages={numPages}
//         onPrev={goToPrev} onNext={goToNext}
//         scale={scale} onZoomIn={zoomIn} onZoomOut={zoomOut} onResetZoom={resetZoom}
//         fileUrl={url} downloadLabel={downloadLabel}
//       />

//       {/* Zone de rendu */}
//       <div className="overflow-auto bg-[#f4f5f7]" style={{ minHeight: "72vh", maxHeight: "80vh" }}>
//         <div className="flex justify-center py-8 px-4">
//           <Document
//             file={url}
//             onLoadSuccess={onDocumentLoadSuccess}
//             loading={<PageSkeleton />}
//             error={
//               <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-400">
//                 <p className="text-sm">Impossible de charger le document.</p>
//                 <a href={url} download
//                   className="text-xs text-[#006F95] underline underline-offset-2 hover:text-[#005a7a]">
//                   Télécharger le fichier
//                 </a>
//               </div>
//             }
//           >
//             {!pageLoaded && <PageSkeleton />}
//             <Page
//               pageNumber={currentPage}
//               scale={scale}
//               onRenderSuccess={() => setPageLoaded(true)}
//               renderAnnotationLayer
//               renderTextLayer
//               className={`shadow-xl rounded-sm transition-opacity duration-300 ${pageLoaded ? "opacity-100" : "opacity-0 absolute"}`}
//             />
//           </Document>
//         </div>
//       </div>

//       {/* Footer barre de navigation rapide */}
//       <div className="flex items-center justify-center gap-3 px-4 py-2.5 border-t border-gray-100 bg-white/80">
//         <button onClick={goToPrev} disabled={currentPage <= 1}
//           className="text-xs text-gray-500 hover:text-[#006F95] disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors duration-150">
//           ← Précédent
//         </button>
//         <span className="text-xs text-gray-300">|</span>
//         <button onClick={goToNext} disabled={currentPage >= (numPages ?? 1)}
//           className="text-xs text-gray-500 hover:text-[#006F95] disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors duration-150">
//           Suivant →
//         </button>
//       </div>
//     </div>
//   );
// };

// // ─── États de chargement / erreur ──────────────────────────────────────────────

// const StatusView = ({ children }) => (
//   <div className="flex items-center justify-center min-h-[320px] text-gray-400">
//     <p className="text-sm">{children}</p>
//   </div>
// );

// // ─── Page principale ───────────────────────────────────────────────────────────

// const CataloguePage = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { catalogue, isLoading, error } = useCatalogue();

//   if (isLoading) return <StatusView>{t("catalogue.loading")}</StatusView>;
//   if (error)     return <StatusView><span className="text-red-500">{t("catalogue.error")}</span></StatusView>;
//   if (!catalogue) return <StatusView>{t("catalogue.empty")}</StatusView>;

//   return (
//     <main className="max-w-5xl mx-auto px-5 py-10">
//       {/* Breadcrumb / retour */}
//       <div className="mb-7">
//         <BackButton label={t("catalogue.back")} onClick={() => navigate(-1)} />
//       </div>

//       {/* En-tête */}
//       <div className="mb-6">
//         <p className="text-xs font-semibold tracking-widest text-[#006F95] uppercase mb-1.5">
//           Documentation
//         </p>
//         <h1 className="text-2xl font-bold text-gray-900 font-montserrat leading-snug">
//           {catalogue.title}
//         </h1>
//       </div>

//       {/* Viewer */}
//       <PdfViewer
//         url={catalogue.fileUrl}
//         title={catalogue.title}
//         downloadLabel={t("catalogue.download")}
//       />
//     </main>
//   );
// };

// export default CataloguePage;

import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCatalogue } from "../../hook/useCatalogue";

const BackButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#006F95] transition-colors duration-200 group"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-200 group-hover:-translate-x-1"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
    {label}
  </button>
);

const DownloadButton = ({ url, label }) => (
  <a
    href={url}
    download
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-5 py-2 bg-[#006F95] hover:bg-[#005a7a] text-white text-sm font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
    {label}
  </a>
);

const PdfViewer = ({ url, title, fallbackLabel, fallbackUrl }) => (
  <div
    className="w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm"
    style={{ height: "75vh", minHeight: 480 }}
  >
    <object
      data={`${url}#toolbar=1&navpanes=0&scrollbar=1`}
      type="application/pdf"
      width="100%"
      height="100%"
      aria-label={title}
    >
      <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center text-gray-500">
        <p className="text-sm">{fallbackLabel}</p>
        <DownloadButton url={fallbackUrl} label={fallbackLabel} />
      </div>
    </object>
  </div>
);

const CataloguePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { catalogue, isLoading, error } = useCatalogue();

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-[300px] text-gray-500"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm">{t("catalogue.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px]" role="alert">
        <p className="text-sm text-red-600">{t("catalogue.error")}</p>
      </div>
    );
  }

  if (!catalogue) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-gray-500">
        <p className="text-sm">{t("catalogue.empty")}</p>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-5 py-8">
      <div className="mb-6">
        <BackButton label={t("catalogue.back")} onClick={() => navigate(-1)} />
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <h1 className="text-2xl font-bold text-[#1a1a2e] font-montserrat">
          {catalogue.title}
        </h1>
        {/* <DownloadButton url={catalogue.fileUrl} label={t("catalogue.download")} /> */}
      </div>

      <PdfViewer
        url={catalogue.fileUrl}
        title={catalogue.title}
        fallbackLabel={t("catalogue.unavailable")}
        fallbackUrl={catalogue.fileUrl}
      />
    </main>
  );
};

export default CataloguePage;