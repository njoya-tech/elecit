import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

// IMPORTANT pour que ça marche
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-white shadow-sm border rounded-lg px-4 py-2">
        
        <div className="flex items-center gap-2">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(p => p - 1)}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            ◀
          </button>

          <span className="text-sm">
            {pageNumber} / {numPages}
          </span>

          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(p => p + 1)}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            ▶
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(s => s - 0.2)}
            className="px-2 py-1 bg-gray-100 rounded"
          >
            -
          </button>
          <button
            onClick={() => setScale(s => s + 0.2)}
            className="px-2 py-1 bg-gray-100 rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* Viewer */}
      <div className="flex justify-center bg-gray-50 p-4 rounded-xl border">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<p className="text-gray-500">Chargement du PDF...</p>}
          error={<p className="text-red-500">Erreur de chargement</p>}
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;