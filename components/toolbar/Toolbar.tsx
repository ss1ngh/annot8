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
    Circle 
} from 'lucide-react';


interface ToolbarProps {
    pageNumber : number;
    numPages : number | null;
    scale: number;
    onPageChange: (offset: number) => void;
    onZoom: (delta: number) => void;
    onRotate: () => void;
    selectedTool?: string;
    onToolSelect?: (tool: string) => void;
    onDownload?: () => void;
}


export default function Toolbar( {
    pageNumber,
    numPages,
    scale,
    onPageChange,
    onZoom,
    onRotate,
    selectedTool,
    onToolSelect,
    onDownload
} : ToolbarProps) {

    const tools = [
        { id: 'highlight', icon: Highlighter, label: 'Highlight' },
        { id: 'draw', icon: Pencil, label: 'Draw' },
        { id: 'text', icon: Type, label: 'Text' },
        { id: 'rectangle', icon: Square, label: 'Rectangle' },
        { id: 'circle', icon: Circle, label: 'Circle' },
    ];

    return (
        <div className='flex justify-between items-center px-4 py-2 bg-white border-b shadow-sm'>

            //page navigation
            <div className='flex items-center gap-2'>

                <button
                    onClick={() => onPageChange(-1)}
                    disabled={pageNumber <= 1}
                    className='p-2 rounded hover:bg-gray-100 disabled:opacity-50'
                >
                    <ChevronLeft size={20}/>
                </button>

                <span className='text-sm font-medium'>
                    {pageNumber} / {numPages || '-'}
                </span>

                <button 
                    onClick={()=> onPageChange(1)}
                    disabled={pageNumber >= (numPages || 1)}
                    className='p-2 rounded hover:bg-gray-100 disabled:opacity-50'
                >
                    <ChevronRight size={20}/>
                </button>
            </div>

            //annotation tools
            <div>
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => onToolSelect?.(tool.id)}
                        className={`p-2 rounded transition-colors ${selectedTool === tool.id
                            ? 'bg-black text-white'
                            : 'hover:bg-gray-100'
                            }`}
                        title={tool.label}
                    >
                        <tool.icon size={18} />
                    </button>
                ))}
            </div>

            //zoom & rotate
            <div className="flex items-center gap-2">
                <button onClick={() => onZoom(-0.1)} className="p-2 rounded hover:bg-gray-100">
                    <ZoomOut size={20} />
                </button>

                <span className="text-sm w-12 text-center">{Math.round(scale * 100)}%</span>
                
                <button onClick={() => onZoom(0.1)} className="p-2 rounded hover:bg-gray-100">
                    <ZoomIn size={20} />
                </button>

                <button onClick={onRotate} className="p-2 rounded hover:bg-gray-100">
                    <RotateCw size={20} />
                </button>

                {onDownload && (
                <button onClick={onDownload} className="p-2 rounded hover:bg-gray-100">
                    <Download size={20} />
                </button>
                )}
            </div>
        </div>
    )
}