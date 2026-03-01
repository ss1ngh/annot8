import {
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    RotateCw,
    Download,
    Highlighter,
    Pencil,
    Type,
    Square,
    Circle,
    Eraser,
    FolderOpen,
    Save,
} from 'lucide-react';


interface ToolbarProps {
    pageNumber: number;
    numPages: number | null;
    scale: number;
    onPageChange: (offset: number) => void;
    onZoom: (delta: number) => void;
    onRotate: () => void;
    selectedTool?: string;
    onToolSelect?: (tool: string) => void;
    onDownload?: () => void;
    onSave?: () => void;
    onUploadNew?: () => void;
}


export default function Toolbar({
    pageNumber,
    numPages,
    scale,
    onPageChange,
    onZoom,
    onRotate,
    selectedTool,
    onToolSelect,
    onDownload,
    onSave,
    onUploadNew,
}: ToolbarProps) {

    const tools = [
        { id: 'highlight', icon: Highlighter, label: 'Highlight' },
        { id: 'draw', icon: Pencil, label: 'Draw' },
        { id: 'eraser', icon: Eraser, label: 'Eraser' },
        { id: 'text', icon: Type, label: 'Text' },
        { id: 'rectangle', icon: Square, label: 'Rectangle' },
        { id: 'circle', icon: Circle, label: 'Circle' },
    ];

    return (
        <div className='flex justify-between items-center px-4 py-2 m-4 rounded-2xl bg-white shadow-md'>

            {/* page navigation */}
            <div className='flex items-center gap-2'>

                <button
                    onClick={() => onPageChange(-1)}
                    disabled={pageNumber <= 1}
                    className='p-2 rounded hover:bg-gray-100 disabled:opacity-50'
                >
                    <ChevronLeft size={20} />
                </button>

                <span className='text-sm font-medium'>
                    {pageNumber} / {numPages || '-'}
                </span>

                <button
                    onClick={() => onPageChange(1)}
                    disabled={pageNumber >= (numPages || 1)}
                    className='p-2 rounded hover:bg-gray-100 disabled:opacity-50'
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* annotation tools */}
            <div>
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => onToolSelect?.(tool.id)}
                        className={`p-2 mx-1 rounded transition-colors ${selectedTool === tool.id
                            ? 'bg-orange-100 text-[#f08a6b]'
                            : 'hover:bg-gray-100'
                            }`}
                        title={tool.label}
                    >
                        <tool.icon size={18} />
                    </button>
                ))}
            </div>

            {/* zoom, rotate & actions */}
            <div className="flex items-center gap-1">
                <button onClick={() => onZoom(-0.1)} className="p-2 rounded hover:bg-gray-100" title="Zoom out">
                    <ZoomOut size={20} />
                </button>

                <span className="text-sm w-12 text-center">{Math.round(scale * 100)}%</span>

                <button onClick={() => onZoom(0.1)} className="p-2 rounded hover:bg-gray-100" title="Zoom in">
                    <ZoomIn size={20} />
                </button>

                <button onClick={onRotate} className="p-2 rounded hover:bg-gray-100" title="Rotate">
                    <RotateCw size={20} />
                </button>

                <div className="w-px h-5 bg-gray-200 mx-1" />

                {onSave && (
                    <button
                        onClick={onSave}
                        className="p-2 rounded hover:bg-green-50 hover:text-green-600 transition-colors"
                        title="Save to browser"
                    >
                        <Save size={20} />
                    </button>
                )}

                {onDownload && (
                    <button
                        onClick={onDownload}
                        className="p-2 rounded hover:bg-gray-100"
                        title="Download annotated PDF"
                    >
                        <Download size={20} />
                    </button>
                )}

                {onUploadNew && (
                    <button
                        onClick={onUploadNew}
                        className="p-2 rounded hover:bg-orange-50 hover:text-[#f08a6b] transition-colors"
                        title="Upload new PDF"
                    >
                        <FolderOpen size={20} />
                    </button>
                )}
            </div>
        </div>
    )
}