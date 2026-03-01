'use client'

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, FileText, ArrowRight } from 'lucide-react';
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
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError('File size exceeds 25MB limit');
      } else {
        setError('Invalid file type. Please upload a PDF');
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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-300/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg px-4">

        {/* Logo + heading */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-5">
            <span className="text-2xl font-black font-dm-sans tracking-tight text-gray-900">annot8</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-black font-dm-sans text-gray-900 tracking-tight leading-[1.1] mb-2">
            Upload your{' '}
            <span className="italic font-instrument-serif font-normal tracking-normal text-5xl md:text-6xl">
              PDF
            </span>
          </h1>
          <p className="text-gray-500 font-dm-sans text-sm">PDF only · Max 25MB</p>
        </div>

        {/* Dropzone card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl transition-all duration-200 cursor-pointer ${isDragActive
                ? 'border-[#f08a6b] bg-orange-50/50 scale-[0.99]'
                : uploadedFile
                  ? 'border-[#f08a6b] bg-orange-50/30'
                  : 'border-gray-200 hover:border-[#f08a6b] hover:bg-orange-50/20'
              }`}
          >
            <input {...getInputProps()} />

            <div className="p-10 flex flex-col items-center justify-center text-center min-h-[200px]">
              {uploadedFile ? (
                <div className="w-full space-y-4 flex flex-col items-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 text-[#f08a6b]">
                    <FileText size={30} />
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-dm-sans text-sm bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl truncate max-w-[80%] text-gray-700">
                      {uploadedFile.name}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                      className="p-2 bg-red-50 rounded-xl text-red-400 hover:scale-90 transition-transform"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 font-dm-sans">{formatFileSize(uploadedFile.size)}</p>
                </div>
              ) : (
                <div className="space-y-4 flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center transition-transform ${isDragActive ? 'scale-110' : ''}`}>
                    <Upload size={28} className="text-[#f08a6b]" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold font-dm-sans text-base">
                      {isDragActive ? 'Drop to upload' : 'Drag & drop your PDF'}
                    </p>
                    <p className="text-sm text-gray-400 font-dm-sans mt-1">
                      or <span className="text-[#f08a6b] font-medium hover:underline">browse files</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-2xl">
              <p className="text-sm text-red-500 text-center font-dm-sans">{error}</p>
            </div>
          )}

          {uploadedFile && (
            <div className="mt-5">
              <button
                onClick={handleProceed}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gray-900 text-white font-bold font-dm-sans rounded-full hover:scale-95 hover:bg-black transition-transform"
              >
                Open in Workspace
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-gray-400 font-dm-sans hover:text-gray-600 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
