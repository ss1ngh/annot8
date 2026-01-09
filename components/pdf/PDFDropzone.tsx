'use client'
import { useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import { useRouter } from "next/router";
import { Upload } from "lucide-react";
import  usePDFStore from '@/store/pdfStore';

 function PDFDropzone() {
    const router = useRouter();
    const setFile = usePDFStore ((state) => state.setFile);

    const onDrop = useCallback(
        (acceptedFiles : File[]) => {
            if(acceptedFiles.length > 0){
                setFile(acceptedFiles[0]);
                router.push('/workspace');
            }
        },
        [setFile, router]
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
            h-64 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200
            ${isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-400"
            }
        `}
    >
        <input {...getInputProps} />
        <div className="text-center space-y-4">
            <Upload className="w-12 h-12 mx-auto text-gray-400"/>
            <p className="text-gray-600 text-lg">
                {isDragActive 
                ? "Drop your PDF here"
                : "Drag and Drop or Upload your PDF here"}
            </p>
        </div>
    </div>
  )
}

export default PDFDropzone