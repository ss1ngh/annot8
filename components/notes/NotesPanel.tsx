'use client'

import { Edit3, Eye, FileCode, FileText, Upload } from "lucide-react";
import { useRef, useCallback, useMemo, useEffect, useState, JSX } from "react"

interface NotesPanelProps {
    onSave: (format: 'md' | 'txt') => void;
    onPageJump: (page: number) => void;
    currentPage: number;
    totalPages: number;
    isMobileView?: boolean;
    value: string;
    onChange?: (notes: string) => void;
}


export default function NotesPanel({
    onSave,
    onPageJump,
    currentPage,
    totalPages,
    isMobileView,
    value = '',
    onChange
}: NotesPanelProps) {
    const [mode, setMode] = useState<'edit' | 'preview'>('edit');
    const [localNotes, setLocalNotes] = useState(value);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);


    useEffect(() => {
        setLocalNotes(value);
    }, [value]);

    const handleNotesChange = useCallback((newNotes: string) => {
        setLocalNotes(newNotes);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            onChange?.(newNotes);
        }, 300);
    }, [onChange]);

    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    const parsePageTags = useCallback((text: string) => {
        const regex = /\[page:(\d+)\]/g;
        const parts: (string | JSX.Element)[] = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }
            const pageNum = parseInt(match[1], 10);
            const isCurrentPage = pageNum === currentPage;
            parts.push(
                <button
                    key={match.index}
                    onClick={() => onPageJump(pageNum)}
                    className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium transition-colors ${isCurrentPage
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                >
                    📄 Page {pageNum}
                </button>
            );
            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return parts;
    }, [currentPage, onPageJump]);

    // Memoized markdown preview (only re-computed when notes change)
    const renderedPreview = useMemo(() => {
        if (!localNotes.trim()) {
            return <p className="text-gray-400 italic">No notes yet. Switch to Edit mode to start writing.</p>;
        }

        const lines = localNotes.split('\n');
        return lines.map((line, i) => {
            // Headers
            if (line.startsWith('### ')) {
                return <h3 key={i} className="text-lg font-semibold mt-4 mb-2">{parsePageTags(line.slice(4))}</h3>;
            }
            if (line.startsWith('## ')) {
                return <h2 key={i} className="text-xl font-bold mt-4 mb-2">{parsePageTags(line.slice(3))}</h2>;
            }
            if (line.startsWith('# ')) {
                return <h1 key={i} className="text-2xl font-bold mt-4 mb-2">{parsePageTags(line.slice(2))}</h1>;
            }
            // Lists
            if (line.startsWith('- ')) {
                return <li key={i} className="ml-4 list-disc">{parsePageTags(line.slice(2))}</li>;
            }
            // Empty line
            if (!line.trim()) {
                return <br key={i} />;
            }
            // Regular paragraph with bold/italic
            let content = line;
            // Bold **text**
            content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // Italic *text*
            content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');

            return (
                <p key={i} className="my-1" dangerouslySetInnerHTML={{
                    __html: content.replace(/\[page:(\d+)\]/g, (_, num) =>
                        `<span class="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-sm font-medium cursor-pointer" data-page="${num}">📄 Page ${num}</span>`
                    )
                }} />
            );
        });
    }, [localNotes, parsePageTags]);

    //load notes from file
    const handleLoad = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return 0;

        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            const content = event.target?.result as string;
            handleNotesChange(content);
        });

        reader.readAsText(file);
        e.target.value = '';
    }, [handleNotesChange]);

    const insertPageTag = useCallback(() => {
        const tag = `[page:${currentPage}]`;
        handleNotesChange(localNotes + tag);
    }, [currentPage, localNotes, handleNotesChange]);

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 px-4 text-[12px] font-semibold bg-gray-50">
                <div className="flex gap-1">
                    <button
                        onClick={() => setMode('edit')}
                        className={`px-4 rounded transition-colors ${mode === 'edit' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
                        title="Edit"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setMode('preview')}
                        className={`p-2 rounded transition-colors ${mode === 'preview' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
                        title="Preview"
                    >
                        Preview
                    </button>
                </div>

                <div className="flex gap-1">
                    <button
                        onClick={insertPageTag}
                        className="px-2 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                        title="Insert current page tag"
                    >
                        + Page {currentPage}
                    </button>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 rounded hover:bg-gray-200"
                        title="Load Notes"
                    >
                        <Upload size={18} />
                    </button>
                    <button
                        onClick={() => onSave('md')}
                        className="p-2 rounded hover:bg-gray-200"
                        title="Save as Markdown"
                    >
                        <FileCode size={18} />
                    </button>
                    <button
                        onClick={() => onSave('txt')}
                        className="p-2 rounded hover:bg-gray-200"
                        title="Save as Text"
                    >
                        <FileText size={18} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4">
                {mode === 'edit' ? (
                    <textarea
                        value={localNotes}
                        onChange={(e) => handleNotesChange(e.target.value)}
                        placeholder={`Write your notes here...\n\nTip:  - Use [page:${currentPage}] to link to current page \n\n      - Use Markdown for formatting`}
                        className="w-full h-full resize-none focus:outline-none text-gray-800 font-mono text-sm"
                    />
                ) : (
                    <div
                        className="prose prose-sm max-w-none"
                        onClick={(e) => {
                            const target = e.target as HTMLElement;
                            const pageNum = target.getAttribute('data-page');
                            if (pageNum) {
                                onPageJump(parseInt(pageNum, 10));
                            }
                        }}
                    >
                        {renderedPreview}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-2 bg-gray-50 text-xs text-gray-500 text-center">
                Page {currentPage} / {totalPages} • {localNotes.length} chars
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept=".md,.txt"
                onChange={handleLoad}
                className="hidden"
            />
        </div>
    );


}