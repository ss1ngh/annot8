'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';
import * as fabric from 'fabric';
import usePDFStore from '@/store/pdfStore';
import Toolbar from '@/components/toolbar/Toolbar';
import PDFCanvas from '@/components/pdf/PDFCanvas';
import NotesPanel from '@/components/notes/NotesPanel';
import '@/lib/pdf-worker';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export default function PDFViewer() {
  const file = usePDFStore((state) => state.file);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [selectedTool, setSelectedTool] = useState('');
  const [annotations, setAnnotations] = useState<Record<number, string>>({});
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [notes, setNotes] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!file) return;
    const newUrl = URL.createObjectURL(file);
    setPdfUrl(newUrl);
    return () => {
      URL.revokeObjectURL(newUrl);
      setPdfUrl(null);
    };
  }, [file]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (!mobile) setShowNotes(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const changePage = (offset: number) => {
    if (!canvas) return;

    // Save current page annotations before switching
    const currentAnnotation = JSON.stringify(canvas.toJSON());
    setAnnotations((prev) => ({
      ...prev,
      [pageNumber]: currentAnnotation
    }));

    // Change to new page
    const newPage = Math.min(Math.max(1, pageNumber + offset), numPages || 1);
    setPageNumber(newPage);
  };

  const jumpToPage = (page: number) => {
    if (page >= 1 && page <= (numPages || 1) && page !== pageNumber) {
      if (canvas) {
        // Save current page annotations before switching
        const currentAnnotation = JSON.stringify(canvas.toJSON());
        setAnnotations((prev) => ({
          ...prev,
          [pageNumber]: currentAnnotation
        }));
      }
      setPageNumber(page);
    }
  };

  const adjustZoom = (delta: number) => {
    setScale((prev) => Math.max(0.5, Math.min(2.5, prev + delta)));
  };

  const rotate = () => setRotation((prev) => (prev + 90) % 360);

  const handleCanvasReady = useCallback((fabricCanvas: fabric.Canvas) => {
    setCanvas(fabricCanvas);
  }, []);

  const handleAnnotationsChange = useCallback((json: string) => {
    setAnnotations((prev) => ({ ...prev, [pageNumber]: json }));
  }, [pageNumber]);

  const handleDownload = async () => {
    if (!pdfUrl || !canvas) return;
    try {
      const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const currentAnnotation = canvas.toDataURL();
      const allAnnotations = { ...annotations, [pageNumber]: currentAnnotation };

      for (let i = 1; i <= (numPages || 1); i++) {
        const page = pdfDoc.getPage(i - 1);
        const annotationData = allAnnotations[i];
        if (annotationData?.startsWith('data:image')) {
          const pngImage = await pdfDoc.embedPng(annotationData);
          const { width, height } = page.getSize();
          page.drawImage(pngImage, { x: 0, y: 0, width, height });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'annotated-document.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error saving PDF:', error);
    }
  };

  const handleSaveNotes = (format: 'md' | 'txt') => {
    const blob = new Blob([notes], {
      type: format === 'md' ? 'text/markdown' : 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `notes.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!pdfUrl) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Toolbar
        pageNumber={pageNumber}
        numPages={numPages}
        scale={scale}
        onPageChange={changePage}
        onZoom={adjustZoom}
        onRotate={rotate}
        selectedTool={selectedTool}
        onToolSelect={setSelectedTool}
        onDownload={handleDownload}
      />

      <div className={`flex flex-1 overflow-hidden ${isMobileView ? 'flex-col' : ''}`}>
        <div ref={pageRef} className={`${isMobileView ? 'h-1/2' : 'w-[60%]'} overflow-auto p-2 bg-gray-50 flex justify-center`}>
          <div className="relative inline-block">
            <Document file={pdfUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
              <Page pageNumber={pageNumber} scale={scale} rotate={rotation} renderTextLayer={false} renderAnnotationLayer={false} />
            </Document>
            <PDFCanvas
              selectedTool={selectedTool}
              pageNumber={pageNumber}
              scale={scale}
              rotation={rotation}
              onCanvasReady={handleCanvasReady}
              containerRef={pageRef}
              savedAnnotations={annotations[pageNumber]}
              onAnnotationsChange={handleAnnotationsChange}
              onToolSelect={setSelectedTool}
            />
          </div>
        </div>

        {(!isMobileView || showNotes) && (
          <div className={`${isMobileView ? 'h-1/2' : 'w-[40%]'}`}>
            <NotesPanel
              onSave={handleSaveNotes}
              onPageJump={jumpToPage}
              currentPage={pageNumber}
              totalPages={numPages || 1}
              isMobileView={isMobileView}
              value={notes}
              onChange={setNotes}
            />
          </div>
        )}
      </div>
    </div>
  );
}