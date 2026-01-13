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
  

  return (
    <div>PDFCanvas</div>
  )
}

