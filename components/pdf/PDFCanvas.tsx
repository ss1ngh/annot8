'use client'

import { useEffect, useCallback, useRef, useReducer } from "react";
import * as fabric from 'fabric';

interface PDFCanvasProps {
  selectedTool: string;
  pageNumber: number;
  scale: number;
  rotation: number;
  onCanvasReady: (canvas: fabric.Canvas) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  savedAnnotations?: string;
  onAnnotationsChange?: (json: string) => void;
  onToolSelect?: (tool: string) => void;
}


export default function PDFCanvas({
  selectedTool,
  pageNumber,
  scale,
  rotation,
  onCanvasReady,
  containerRef,
  savedAnnotations,
  onAnnotationsChange,
  onToolSelect
}: PDFCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevPageRef = useRef<number>(pageNumber);
  const prevScaleRef = useRef<number>(scale);
  const isLoadingRef = useRef<boolean>(false);

  //initializing fabric canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: false,
      selection: true
    });

    fabricRef.current = canvas;
    onCanvasReady(canvas);

    // Initial dimension sync - wait for PDF to render
    const timeoutId = setTimeout(() => {
      // Check if canvas is still valid (not disposed)
      if (!fabricRef.current) return;

      const pdfPage = containerRef.current?.querySelector('.react-pdf__Page');
      if (pdfPage) {
        canvas.setDimensions({
          width: pdfPage.clientWidth,
          height: pdfPage.clientHeight,
        });
        canvas.renderAll();
      }
    }, 200);

    canvas.on('object:added', () => saveAnnotations());
    canvas.on('object:modified', () => saveAnnotations());
    canvas.on('object:removed', () => saveAnnotations());

    return () => {
      clearTimeout(timeoutId);
      canvas.dispose();
      fabricRef.current = null;
    }
  }, []);

  //debounce before saving
  const saveAnnotations = useCallback(() => {
    const canvas = fabricRef.current;

    // Skip saving if we're in the middle of loading annotations
    if (!canvas || !onAnnotationsChange || isLoadingRef.current) return;

    //reset/clear timer
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    //set new timer
    saveTimeoutRef.current = setTimeout(() => {
      if (!isLoadingRef.current) {
        const json = JSON.stringify(canvas.toJSON());
        onAnnotationsChange(json);
      }
      saveTimeoutRef.current = null;
    }, 1000);
  }, [onAnnotationsChange]);

  //load up saved annotations on page change ONLY
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    // Only load annotations when page actually changes
    if (prevPageRef.current !== pageNumber) {
      prevPageRef.current = pageNumber;
      isLoadingRef.current = true;

      canvas.clear();

      if (savedAnnotations) {
        canvas.loadFromJSON(savedAnnotations, () => {
          canvas.renderAll();
          isLoadingRef.current = false;
        });
      } else {
        isLoadingRef.current = false;
      }
    }
  }, [pageNumber, savedAnnotations]);

  //sync pdf page size with canvas size AND scale objects when zoom changes
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas || !containerRef.current) return;

    const syncDimensions = () => {
      const pdfPage = containerRef.current?.querySelector('.react-pdf__Page');
      if (pdfPage) {
        const width = pdfPage.clientWidth;
        const height = pdfPage.clientHeight;
        if (width > 0 && height > 0) {
          canvas.setDimensions({ width, height });
          canvas.renderAll();
        }
      }
    };

    // Scale all objects when zoom level changes
    if (prevScaleRef.current !== scale) {
      const scaleRatio = scale / prevScaleRef.current;

      canvas.getObjects().forEach((obj) => {
        // Scale the object's position
        obj.set({
          left: (obj.left || 0) * scaleRatio,
          top: (obj.top || 0) * scaleRatio,
          scaleX: (obj.scaleX || 1) * scaleRatio,
          scaleY: (obj.scaleY || 1) * scaleRatio,
        });
        obj.setCoords();
      });

      prevScaleRef.current = scale;
      canvas.renderAll();
    }

    // Initial sync with a delay to wait for PDF rendering
    const timeout = setTimeout(syncDimensions, 300);

    // Use ResizeObserver for reliable size tracking
    const resizeObserver = new ResizeObserver(() => {
      syncDimensions();
    });

    // Observe the container for any size changes
    const pdfPage = containerRef.current?.querySelector('.react-pdf__Page');
    if (pdfPage) {
      resizeObserver.observe(pdfPage);
    } else {
      // If PDF page not ready yet, also observe container and try again
      resizeObserver.observe(containerRef.current);
    }

    // Also handle window resize
    window.addEventListener('resize', syncDimensions);

    return () => {
      clearTimeout(timeout);
      resizeObserver.disconnect();
      window.removeEventListener('resize', syncDimensions);
    }
  }, [scale, rotation, pageNumber, containerRef]);

  //handle tool changes
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    // Reset canvas state
    canvas.isDrawingMode = false;
    canvas.selection = true;
    canvas.defaultCursor = 'default';
    canvas.hoverCursor = 'move';

    // Handle drawing tools (pen and highlighter)
    if (selectedTool === 'draw') {
      canvas.isDrawingMode = true;
      const brush = new fabric.PencilBrush(canvas);
      brush.color = '#000000';
      brush.width = 2;
      canvas.freeDrawingBrush = brush;
    }
    else if (selectedTool === 'highlight') {
      canvas.isDrawingMode = true;
      const brush = new fabric.PencilBrush(canvas);
      brush.color = 'rgba(255, 255, 0, 0.4)';
      brush.width = 20;
      canvas.freeDrawingBrush = brush;
    }
    // Handle shape tools - add shape at center immediately when tool is selected
    else if (selectedTool === 'rectangle') {
      const center = canvas.getCenterPoint();
      const rect = new fabric.Rect({
        left: center.x,
        top: center.y,
        width: 100,
        height: 100,
        fill: 'transparent',
        stroke: '#000000',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center',
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
      canvas.renderAll();
      // Clear tool selection after adding shape
      onToolSelect?.('');
    }
    else if (selectedTool === 'circle') {
      const center = canvas.getCenterPoint();
      const circle = new fabric.Circle({
        left: center.x,
        top: center.y,
        radius: 50,
        fill: 'transparent',
        stroke: '#000000',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center',
      });
      canvas.add(circle);
      canvas.setActiveObject(circle);
      canvas.renderAll();
      // Clear tool selection after adding shape
      onToolSelect?.('');
    }
    else if (selectedTool === 'text') {
      const center = canvas.getCenterPoint();
      const text = new fabric.IText('Click to edit', {
        left: center.x,
        top: center.y,
        fontSize: 20,
        fill: '#000000',
        originX: 'center',
        originY: 'center',
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      text.enterEditing();
      canvas.renderAll();
      // Clear tool selection after adding text
      onToolSelect?.('');
    }

  }, [selectedTool, onToolSelect]);


  return (
    <div
      className="absolute top-0 left-0 w-full h-full"
      style={{ zIndex: 10, pointerEvents: 'auto' }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

