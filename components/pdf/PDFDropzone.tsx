'use client'

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, FileText} from 'lucide-react';
import usePDFStore from '@/store/pdfStore';

interface PDFDropzoneProps { 
    onClose : () => void;
}

export default function PDFDropzone( {onClose} : PDFDropzoneProps) {
    const [uploadedFile, setUploadedFile] = useState<File | null> (null);
    const [error, setError] = useState<string | null> (null);

    const setFile = usePDFStore((state) => state.setFile);
    const clearFile = usePDFStore((state) => state.clearFile);

    const onDrop = useCallback((acceptedFiles : File[], rejectedFiles : any[]) => {

        //handle errors
        if(rejectedFiles.length > 0){
            const rejection = rejectedFiles[0];
            if(rejection.errors[0]?.code === 'file-too-large'){
                setError('File size exceeds 25MB limit');
            }
            else{
                setError('Invalid file type. Please upload a PDF')
            }
            return;
        }

        if(acceptedFiles.length > 0){
            setError(null);
            setUploadedFile(acceptedFiles[0]);
        }
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: { 'application/pdf' : ['.pdf'] },
        maxFiles : 1,
        maxSize : 25 * 1024 * 1024,
        onDrop,
    });

    const handleRemoveFile = () => {
        setUploadedFile(null);
        clearFile();
        setError(null);
    };

    const handleProceed= () => {
        if(uploadedFile) {
            setFile(uploadedFile);
            onClose();
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };


    return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-in fade-in zoom-in-95 duration-300">
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-black tracking-tight">Upload PDF</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black p-1 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer ${
            isDragActive ? 'border-black bg-gray-50 scale-[0.99]' 
            : uploadedFile ? 'border-black bg-gray-50' 
            : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          
          <div className="p-8 flex flex-col items-center justify-center text-center min-h-[220px]">
            {uploadedFile ? (
              <div className="w-full space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-black text-white">
                  <FileText size={28} />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-sm bg-gray-100 px-3 py-1.5 rounded-lg truncate max-w-[80%]">
                    {uploadedFile.name}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                    className="p-1.5 bg-gray-100 rounded-lg text-gray-500 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-xs text-gray-500">{formatFileSize(uploadedFile.size)}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className={`w-16 h-16 rounded-full bg-black text-white flex items-center justify-center ${isDragActive ? 'scale-110' : ''}`}>
                  <Upload size={32} />
                </div>
                <p className="text-gray-900 font-medium">
                  {isDragActive ? 'Drop PDF to upload' : 'Drag and drop PDF here'}
                </p>
                <p className="text-sm text-gray-500">or <span className="text-black font-semibold underline">browse</span></p>
              </div>
            )}
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-500 text-center">{error}</p>}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-gray-400">Supported: <span className="text-black font-semibold">PDF</span> (max 25MB)</p>
          {uploadedFile && (
            <button onClick={handleProceed} className="px-6 py-2.5 bg-black text-white font-semibold rounded-xl hover:bg-gray-800">
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
