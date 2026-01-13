'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import usePDFStore from '@/store/pdfStore';
import PDFDropzone from '@/components/pdf/PDFDropzone';

const PDFViewer = dynamic(() => import('@/components/pdf/PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
});

export default function WorkspacePage() {
  const file = usePDFStore((state) => state.file);
  const [showDropzone, setShowDropzone] = useState(false);

  useEffect(() => {
    setShowDropzone(!file);
  }, [file]);

  return (
    <div className="min-h-screen">
      {showDropzone && <PDFDropzone onClose={() => setShowDropzone(false)} />}
      {file && <PDFViewer />}
    </div>
  );
}