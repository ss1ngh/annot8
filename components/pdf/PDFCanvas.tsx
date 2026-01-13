'use client'

import { useEffect, useCallback, useRef, useReducer } from "react";
import  fabric  from 'fabric';

interface PDFCanvasProps {
  selectedTool : string;
  pageNumber : number;
  scale : number;
  rotation : number;
  onCanvasReady : (canvas : fabric.Canvas) => void;
  containerRef : React.RefObject<HTMLDivElement>;
  savedAnnotations? : string;
  onAnnotationsChange? : (json : string) => void
}


export default function PDFCanvas ({
  selectedTool,
  pageNumber,
  scale,
  rotation,
  onCanvasReady,
  containerRef,
  savedAnnotations,
  onAnnotationsChange
} : PDFCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawingShape = useRef(false);
  const shapeBeingDrawn = useRef<fabric.Object | null>(null);
  const startPoint = useRef<{x : number; y : number} | null>(null);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  //initializing fabric canvas
  useEffect(() => {
    if(!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode : false,
      selection : true
    });

    fabricRef.current = canvas;
    onCanvasReady(canvas);

    canvas.on('object:added', () => saveAnnotations());
    canvas.on('object:modified', () => saveAnnotations());
    canvas.on('object:removed', () => saveAnnotations());

    return() => {
      canvas.dispose();
      fabricRef.current = null;
    }
  }, []);

  //debounce before saving
  const saveAnnotations = useCallback(()=> {
    const canvas = fabricRef.current;

    if(!canvas || !onAnnotationsChange) return;

    //reset/clear timer
    if(saveTimeoutRef.current){
      clearTimeout(saveTimeoutRef.current);
    }

    //set new timer
    saveTimeoutRef.current = setTimeout(() => {
      const json = JSON.stringify(canvas.toJSON());
      onAnnotationsChange(json);
      saveTimeoutRef.current = null;
    }, 1000);
  }, [onAnnotationsChange]);

  //load up saved annotations on page change
  useEffect(() => {
    const canvas = fabricRef.current;

    if(!canvas) return;

    canvas.clear();

    if(savedAnnotations){
      canvas.loadFromJSON(savedAnnotations, () =>{
        canvas.renderAll();
      });
    }
  }, [pageNumber, savedAnnotations]);

  //sync pdf page size with canvas size
  //so the drawings are synced on scaling the pdf page 
  useEffect(() => {
    const canvas = fabricRef.current;
    if(!canvas || !containerRef.current) return;

    const syncDimensions = () => {
      const pdfPage = containerRef.current?.querySelector('.react-pdf__Page');
      if(pdfPage) {
        canvas.width = pdfPage.clientWidth;
        canvas.height = pdfPage.clientHeight;
        canvas.renderAll();
      } 
    };

    const timeout = setTimeout(syncDimensions, 100);

    //resize canvas on browser window resize
    window.addEventListener('resize', syncDimensions);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', syncDimensions);
    }
  }, [scale, rotation, pageNumber, containerRef]);


  //handle tool changes
  useEffect(() => {
        const canvas = fabricRef.current;
        if (!canvas) return;

        canvas.isDrawingMode = false;
        canvas.selection = true;
        canvas.off('mouse:down');
        canvas.off('mouse:move');
        canvas.off('mouse:up');
        isDrawingShape.current = false;

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
        else if (selectedTool === 'rectangle' || selectedTool === 'circle') {
            canvas.selection = false;

            canvas.on('mouse:down', (opt: any) => {
                const pointer = canvas.getScenePoint(opt.e);
                startPoint.current = { x: pointer.x, y: pointer.y };
                isDrawingShape.current = true;

                if (selectedTool === 'rectangle') {
                    shapeBeingDrawn.current = new fabric.Rect({
                        left: pointer.x,
                        top: pointer.y,
                        width: 0,
                        height: 0,
                        fill: 'transparent',
                        stroke: '#000000',
                        strokeWidth: 2,
                        selectable: true,
                    });
                } else {
                    shapeBeingDrawn.current = new fabric.Ellipse({
                        left: pointer.x,
                        top: pointer.y,
                        rx: 0,
                        ry: 0,
                        fill: 'transparent',
                        stroke: '#000000',
                        strokeWidth: 2,
                        selectable: true,
                    });
                }
                
                if (shapeBeingDrawn.current) {
                    canvas.add(shapeBeingDrawn.current);
                }
            });

            canvas.on('mouse:move', (opt: any) => {
                if (!isDrawingShape.current || !shapeBeingDrawn.current || !startPoint.current) return;

                const pointer = canvas.getScenePoint(opt.e);
                
                const width = Math.abs(pointer.x - startPoint.current.x);
                const height = Math.abs(pointer.y - startPoint.current.y);
                const newLeft = Math.min(pointer.x, startPoint.current.x);
                const newTop = Math.min(pointer.y, startPoint.current.y);

                if (selectedTool === 'rectangle') {
                    (shapeBeingDrawn.current as fabric.Rect).set({
                        left: newLeft,
                        top: newTop,
                        width: width,
                        height: height,
                    });
                } else {
                    (shapeBeingDrawn.current as fabric.Ellipse).set({
                        left: newLeft,
                        top: newTop,
                        rx: width / 2,
                        ry: height / 2,
                    });
                }
                canvas.renderAll();
            });

            canvas.on('mouse:up', () => {
                isDrawingShape.current = false;
                shapeBeingDrawn.current = null;
                startPoint.current = null;
                saveAnnotations();
            });
        } 
        else if (selectedTool === 'text') {
            canvas.selection = false;

            canvas.on('mouse:down', (opt: any) => {
                const pointer = canvas.getScenePoint(opt.e);
                const text = new fabric.IText('Type here', {
                    left: pointer.x,
                    top: pointer.y,
                    fontSize: 16,
                    fill: '#000000',
                    editable: true,
                });
                
                canvas.add(text);
                canvas.setActiveObject(text);
                text.enterEditing();
            });
        }

    }, [selectedTool, saveAnnotations]);

    
  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 pointer-events-auto"
      style={{ zIndex:10 }}
    />
  );
}

