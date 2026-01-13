'use client'
import Link from "next/link"
import Image from "next/image"
import { Pencil, Highlighter, StickyNote, Type } from "lucide-react"

const Hero = () => {
  return (
    <section className='h-screen w-full text-center pt-4 overflow-hidden flex flex-col relative z-10'>
      {/* background gradient*/}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-300/30 rounded-full blur-[100px]"></div>
        {/* <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-orange-200/20 rounded-full blur-[120px]"></div> */}
      </div>


      <div className="max-w-4xl mx-auto text-center px-4 flex-shrink-0 relative z-50">
        <h1 className="text-4xl md:text-6xl font-medium text-black leading-[1.1] mb-4 tracking-tighter">

          Read,{" "}
          <span className="italic font-instrument-serif font-normal tracking-normal">
            Doodle
          </span>
          , <br className="hidden sm:block" />
          & Write.
        </h1>

        <p className="text-xs md:text-sm text-gray-600 mb-6 max-w-xl mx-auto leading-relaxed font-ibm-plex-mono">
          A dual-view workspace designed for seamless PDF note-taking.
          Combine your reading and writing workflow in one place
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-6">
          <Link
            href="/workspace"
            className='inline-block bg-black text-white rounded-3xl px-6 py-3 hover:scale-95 transition-transform font-ibm-plex-mono cursor-pointer'>
            Get Started
          </Link>
        </div>
      </div>


      <div className="flex-1 max-w-7xl mx-auto px-2 relative w-full min-h-0 z-20">

        {/* pencil */}
        <div className="absolute -top-4 left-4 md:left-12 animate-bounce z-20" style={{ animationDuration: '3s' }}>
          <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100 rotate-[-15deg]">
            <Pencil className="text-orange-500" size={24} />
          </div>
        </div>

        {/*  highlighter */}
        <div className="absolute -top-2 right-8 md:right-20 animate-bounce z-20" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
          <div className="bg-yellow-50 rounded-xl shadow-lg p-3 border border-yellow-200 rotate-[12deg]">
            <Highlighter className="text-yellow-500" size={24} />
          </div>
        </div>

        {/* Note */}
        <div className="hidden lg:block absolute top-1/4 -left-8 animate-pulse z-20">
          <div className="bg-blue-50 rounded-xl shadow-lg p-4 border border-blue-100 rotate-[-8deg] max-w-[130px]">
            <StickyNote className="text-blue-500 mb-2" size={18} />
            <p className="text-xs text-blue-700 font-medium">Quick Notes</p>
            <p className="text-[10px] text-blue-500">Write as you read</p>
          </div>
        </div>

        {/* Text */}
        <div className="hidden lg:block absolute top-1/3 -right-8 animate-pulse z-20" style={{ animationDelay: '1s' }}>
          <div className="bg-purple-50 rounded-xl shadow-lg p-4 border border-purple-100 rotate-[6deg] max-w-[130px]">
            <Type className="text-purple-500 mb-2" size={18} />
            <p className="text-xs text-purple-700 font-medium">Add Text</p>
            <p className="text-[10px] text-purple-500">Annotate anywhere</p>
          </div>
        </div>

        {/* laptopframe */}
        <div className="relative h-full flex flex-col items-center">
          {/* bezel */}
          <div className="bg-gray-900 rounded-t-2xl p-2 pt-4 shadow-2xl w-full max-w-5xl">
            {/* Camera */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full"></div>

            {/* Screen */}
            <div className="bg-white rounded-lg overflow-hidden">
              <Image
                src="/annot8-banner.png"
                alt="Annot8 - PDF Annotation Workspace"
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          <div className="w-[110%] max-w-[900px] h-4 bg-gradient-to-b from-gray-800 to-gray-700 rounded-b-xl"></div>
          <div className="w-[120%] max-w-[950px] h-2 bg-gradient-to-b from-gray-600 to-gray-500 rounded-b-lg"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero