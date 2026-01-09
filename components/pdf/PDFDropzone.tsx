'use client'
import { useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import { Upload } from "lucide-react";
import  usePDFStore from '@/store/pdfStore';

 function PDFDropzone() {
    const setFile = usePDFStore ((state) => state.setFile);

    const onDrop = useCallback(
        (acceptedFiles : File[]) => {
            if(acceptedFiles.length > 0){
                setFile(acceptedFiles[0]);
                }
        },
        [setFile]
    );

    const {getRootProps, getInputProps ,isDragActive} = useDropzone({
        accept: { "application/pdf" : [".pdf"] },
        maxFiles : 1,
        onDrop
    });

  return (
    <div
        {...getRootProps()}
        className={`
            h-64 border-3 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200`}
    >
        <input {...getInputProps()} />
        <div className="text-center space-y-4">
            <Upload className="w-12 h-12 mx-auto text-gray-400"/>
            <p className="text-gray-600 text-sm">
                {isDragActive 
                ? "Drop your PDF here"
                : "Drag and Drop or Upload your PDF here"}
            </p>
        </div>
    </div>
  )
}

export default PDFDropzone