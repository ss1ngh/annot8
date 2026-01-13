'use client'

import Navbar from '@/components/landing/Navbar'
import {
  Pen,
  Highlighter,
  Type,
  Square,
  Circle,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  FileText,
  FileCode,
  Upload,
  Edit3,
  Eye,
  ArrowLeft,
  ArrowRight,
  Pencil
} from 'lucide-react'
import Link from 'next/link'

const FeatureCard = ({
  icon: Icon,
  title,
  description
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
    <div className="p-2 bg-gray-100 rounded-lg">
      <Icon size={20} className="text-gray-700" />
    </div>
    <div>
      <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
)

const GuidePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-instrument-serif font-extralight text-black tracking-tight mb-4">
          User Guide
        </h1>
        <p className="text-gray-600 text-lg font-ibm-plex-mono">
          Everything you need to know about using Annot8
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-16 space-y-12">

        {/* Getting Started */}
        <section>
          <h2 className="text-2xl font-medium text-black mb-6 tracking-tight">Getting Started</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <ol className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">1</span>
                <span>Click <strong>"Get Started"</strong> on the home page to open the workspace</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">2</span>
                <span>Drag & drop your PDF or click to browse and select a file</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">3</span>
                <span>Click <strong>"Continue"</strong> to load your PDF in the dual-view workspace</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Annotation Tools */}
        <section>
          <h2 className="text-2xl font-medium text-black mb-6 tracking-tight">Annotation Tools</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <FeatureCard
              icon={Highlighter}
              title="Highlighter"
              description="Draw semi-transparent yellow highlights over text. Great for marking important passages."
            />
            <FeatureCard
              icon={Pen}
              title="Pen / Draw"
              description="Freehand drawing tool for sketches, underlines, or handwritten notes on the PDF."
            />
            <FeatureCard
              icon={Type}
              title="Text"
              description="Add editable text boxes anywhere on the PDF. Click to edit the text content."
            />
            <FeatureCard
              icon={Square}
              title="Rectangle"
              description="Add rectangular shapes to highlight sections or create boxes around important areas."
            />
            <FeatureCard
              icon={Circle}
              title="Circle"
              description="Add circular/elliptical shapes to draw attention to specific content."
            />
          </div>
          <p className="mt-4 text-sm text-gray-500 bg-gray-100 rounded-lg p-3">
            💡 <strong>Tip:</strong> Shapes appear at the center of the canvas. Click and drag to move or resize them. Click anywhere else to deselect.
          </p>
        </section>

        {/* Navigation & View Controls */}
        <section>
          <h2 className="text-2xl font-medium text-black mb-6 tracking-tight">Navigation & View</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <FeatureCard
              icon={ArrowLeft}
              title="Page Navigation"
              description="Use the < and > arrows in the toolbar to move between pages. Page number shows in the center."
            />
            <FeatureCard
              icon={ZoomIn}
              title="Zoom In / Out"
              description="Increase or decrease the PDF zoom level. Annotations scale proportionally with the document."
            />
            <FeatureCard
              icon={RotateCw}
              title="Rotate"
              description="Rotate the PDF by 90 degrees. Useful for landscape documents or scanned pages."
            />
            <FeatureCard
              icon={Download}
              title="Download"
              description="Download the PDF with your annotations embedded in the document."
            />
          </div>
        </section>

        {/* Notes Panel */}
        <section>
          <h2 className="text-2xl font-medium text-black mb-6 tracking-tight">Notes Panel</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Writing Notes</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The notes panel on the right side supports Markdown formatting:
              </p>
              <ul className="mt-2 text-sm text-gray-600 space-y-1 ml-4">
                <li><code className="bg-gray-100 px-1 rounded"># Heading 1</code>, <code className="bg-gray-100 px-1 rounded">## Heading 2</code>, <code className="bg-gray-100 px-1 rounded">### Heading 3</code></li>
                <li><code className="bg-gray-100 px-1 rounded">**bold text**</code> and <code className="bg-gray-100 px-1 rounded">*italic text*</code></li>
                <li><code className="bg-gray-100 px-1 rounded">- List items</code></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Page Links</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Type <code className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">[page:X]</code> to create a clickable link to page X.
                In preview mode, clicking it will jump to that page. Use the <strong>"+ Page"</strong> button to quickly insert a link to the current page.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon={Edit3}
                title="Edit Mode"
                description="Write and edit your notes in plain text/Markdown format."
              />
              <FeatureCard
                icon={Eye}
                title="Preview Mode"
                description="See your notes rendered with formatting and clickable page links."
              />
              <FeatureCard
                icon={Upload}
                title="Load Notes"
                description="Import existing notes from a .md or .txt file."
              />
              <FeatureCard
                icon={FileCode}
                title="Save as Markdown"
                description="Download your notes as a .md file for use in other apps."
              />
            </div>
          </div>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-2xl font-medium text-black mb-6 tracking-tight">Pro Tips</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-2">
                <span>✨</span>
                <span>Your annotations and notes are saved per page — they'll persist when you navigate between pages</span>
              </li>
              <li className="flex gap-2">
                <span>🎯</span>
                <span>Click on any shape or drawing to select it, then drag to move or use handles to resize</span>
              </li>
              <li className="flex gap-2">
                <span>📝</span>
                <span>Use <strong>[page:1]</strong> syntax in notes to create quick navigation links to specific pages</span>
              </li>
              <li className="flex gap-2">
                <span>💾</span>
                <span>Export your notes as Markdown to use in Notion, Obsidian, or any other note-taking app</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 bg-black text-white rounded-3xl px-8 py-3 hover:scale-95 transition-transform font-ibm-plex-mono"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GuidePage