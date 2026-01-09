import {create} from "zustand";

interface PDFStore {
    file : File | null;
    setFile: (file: File) => void;
    clearFile: () => void;
}

const usePDFStore = create<PDFStore>((set) => ({
    file: null,
    setFile : (file) => set({ file : file}),
    clearFile : () => set({ file : null })
}))


export default usePDFStore;