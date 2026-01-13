'use client'

import usePDFStore from "@/store/pdfStore"
import { useEffect, useMemo, useState } from "react";
import { Document, Page } from "react-pdf";
import Toolbar from "../toolbar/Toolbar";


const PDFViewer = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const file = usePDFStore((state) => state.file);

  useEffect(() => {
    if(!file) return;

    const newUrl = URL.createObjectURL(file);
    setPdfUrl(newUrl);

    return () => {
      URL.revokeObjectURL(newUrl);
      setPdfUrl(null);
    }
  }, [file]);

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const changePage = (offset: number) => {
        setPageNumber((prev) => Math.min(Math.max(1, prev + offset), numPages || 1));
    };

  const adjustZoom = (delta: number) => {
        setScale((prev) => Math.max(0.5, Math.min(2, prev + delta)));
  };

  const rotate = () => {
        setRotation((prev) => (prev + 90) % 360);
  };

  if (!pdfUrl) return null;

  return (
    <div className="flex flex-col h-screen">
      <Toolbar
        pageNumber={pageNumber}
        numPages={numPages}
        scale={scale}
        onPageChange={changePage}
        onZoom={adjustZoom}
        onRotate={rotate}
      />
      
      <div className="flex-1 overflow-auto p-4 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </div>
    </div>
  )
}

export default PDFViewer