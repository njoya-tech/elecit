// PdfViewer.jsx — PDF.js standalone, aucune dépendance externe à installer
import React, { useEffect, useRef, useState } from "react";

const PDF_JS_VERSION = "3.11.174";
const PDFJS_CDN = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDF_JS_VERSION}/pdf.min.js`;
const WORKER_CDN = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDF_JS_VERSION}/pdf.worker.min.js`;

const loadPdfJs = () =>
  new Promise((resolve, reject) => {
    if (window.pdfjsLib) return resolve(window.pdfjsLib);
    const script = document.createElement("script");
    script.src = PDFJS_CDN;
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_CDN;
      resolve(window.pdfjsLib);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });

export const PdfViewer = ({ url, title, fallbackLabel, fallbackUrl }) => {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [totalPages, setTotalPages] = useState(0);
  const renderTasksRef = useRef([]);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;

    const render = async () => {
      setStatus("loading");
      try {
        const pdfjsLib = await loadPdfJs();
        const pdf = await pdfjsLib.getDocument(url).promise;
        if (cancelled) return;

        setTotalPages(pdf.numPages);
        setStatus("idle");

        const container = containerRef.current;
        container.innerHTML = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) break;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.cssText =
            "display:block;width:100%;margin-bottom:8px;border-radius:4px;";

          container.appendChild(canvas);

          const task = page.render({
            canvasContext: canvas.getContext("2d"),
            viewport,
          });
          renderTasksRef.current.push(task);
          await task.promise;
        }
      } catch (err) {
        if (!cancelled) setStatus("error");
      }
    };

    render();
    return () => {
      cancelled = true;
      renderTasksRef.current.forEach((t) => t.cancel?.());
      renderTasksRef.current = [];
    };
  }, [url]);

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-gray-500">
        <p className="text-sm">{fallbackLabel}</p>
        <a href=""
          href={fallbackUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 bg-[#006F95] hover:bg-[#005a7a] text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {fallbackLabel}
        </a>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-xl overflow-auto border border-gray-200 bg-gray-50 shadow-sm px-4 py-4"
      style={{ height: "75vh", minHeight: 480 }}
    >
      {status === "loading" && (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          Chargement du PDF…
        </div>
      )}
      <div ref={containerRef} />
      {totalPages > 0 && (
        <p className="text-center text-xs text-gray-400 mt-2">
          {totalPages} page{totalPages > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};