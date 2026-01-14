'use client'

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, FileText, Sparkles, ArrowRight } from 'lucide-react';
import usePDFStore from '@/store/pdfStore';
import Link from 'next/link';

interface PDFDropzoneProps {
  onClose: () => void;
}

export default function PDFDropzone({ onClose }: PDFDropzoneProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setFile = usePDFStore((state) => state.setFile);
  const clearFile = usePDFStore((state) => state.clearFile);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {

    //handle errors
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError('File size exceeds 25MB limit');
      }
      else {
        setError('Invalid file type. Please upload a PDF')
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      setError(null);
      setUploadedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: 25 * 1024 * 1024,
    onDrop,
  });

  const handleRemoveFile = () => {
    setUploadedFile(null);
    clearFile();
    setError(null);
  };

  const handleProceed = () => {
    if (uploadedFile) {
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
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
      {/* gradients */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-200/40 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-purple-200/40 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-xl px-4">
        {/* header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-bold tracking-tight">annot8</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-medium text-black tracking-tighter mb-3">
            Upload your{" "}
            <span className="italic font-instrument-serif font-normal">PDF</span>
          </h1>
        </div>


        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer ${isDragActive ? 'border-blue-400 bg-blue-50/50 scale-[0.99]'
              : uploadedFile ? 'border-blue-400 bg-blue-50/30'
                : 'border-blue-200 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
          >
            <input {...getInputProps()} />

            <div className="p-10 flex flex-col items-center justify-center text-center min-h-[200px]">
              {uploadedFile ? (
                <div className="w-full space-y-4 flex flex-col items-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600">
                    <FileText size={32} />
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-ibm-plex-mono text-sm bg-blue-50 px-4 py-2 rounded-xl truncate max-w-[80%]">
                      {uploadedFile.name}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                      className="p-2 bg-red-50 rounded-xl text-red-500 hover:scale-85 transition-transform transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 font-ibm-plex-mono">{formatFileSize(uploadedFile.size)}</p>
                </div>
              ) : (
                <div className="space-y-4 flex flex-col items-center">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center transition-transform ${isDragActive ? 'scale-110' : ''}`}>
                    <Upload size={36} className="text-gray-700" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-lg">
                      {isDragActive ? 'Drop to upload' : 'Drag and drop PDF'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      or <span className="text-blue-600 font-medium hover:underline">browse files</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs text-gray-400 font-ibm-plex-mono">
              PDF only • Max 25MB
            </p>
            {uploadedFile && (
              <button
                onClick={handleProceed}
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600  font-semibold rounded-2xl hover:scale-95 transition-transform font-ibm-plex-mono"
              >
                <span>Continue &rarr;</span>
              </button>
            )}
          </div>
        </div>


        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-block text-sm text-blue-500 hover:scale-95 transition-transform font-ibm-plex-mono transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
