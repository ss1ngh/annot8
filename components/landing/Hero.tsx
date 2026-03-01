'use client'
import Link from "next/link"
import Image from "next/image"
import { Pencil, Highlighter, StickyNote, Type } from "lucide-react"

const Hero = () => {
  return (
    <section className='w-full text-center overflow-hidden flex flex-col relative z-10 pb-16 md:pb-24'>
      {/* background gradient*/}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-300/30 rounded-full blur-[100px]"></div>
      </div>
      <div className="max-w-4xl mx-auto text-center px-4 relative z-50 mb-0 mt-8 md:mt-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-dm-sans text-gray-900 leading-[1.1] mb-6 tracking-tight">
          Read,{" "}
          <span className="italic font-instrument-serif font-normal tracking-normal text-5xl md:text-6xl lg:text-7xl">
            Doodle
          </span>
          <span className="text-gray-900">,</span> <br className="hidden sm:block" />
          & Write.
        </h1>

        <p className="text-lg md:text-xl text-gray-700 font-dm-sans mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          <span className="text-gray-900 font-medium">A dual-view workspace designed for seamless PDF note-taking.</span><br className="hidden md:block" />
          Combine your reading and writing workflow in one place.
        </p>

        <div className="flex flex-col mb-10 sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <Link
            href="/workspace"
            className='inline-block bg-gray-900 text-white rounded-full px-8 py-3 font-bold font-dm-sans text-lg hover:scale-95 hover:bg-black transition-transform shadow-[0_10px_30px_rgba(0,0,0,0.15)] cursor-pointer'>
            Get Started
          </Link>
        </div>

        {/* Floating Elements from Showcase */}
        {/* pencil */}
        <div className="absolute top-10 left-0 md:-left-60 animate-bounce z-20 hidden md:block" style={{ animationDuration: '3s' }}>
          <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100 rotate-[-15deg]">
            <Pencil className="text-orange-500" size={24} />
          </div>
        </div>

        {/*  highlighter */}
        <div className="absolute top-0 right-0 md:-right-40 animate-bounce z-20 hidden md:block" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
          <div className="bg-yellow-50 rounded-xl shadow-lg p-3 border border-yellow-200 rotate-[12deg]">
            <Highlighter className="text-yellow-500" size={24} />
          </div>
        </div>

        {/* Note */}
        <div className="hidden lg:block absolute top-[60%] -left-96 animate-pulse z-20">
          <div className="bg-blue-50 rounded-xl shadow-lg p-4 border border-blue-100 rotate-[-8deg] max-w-[130px]">
            <StickyNote className="text-blue-500 mb-2" size={18} />
            <p className="text-xs text-blue-700 font-medium">Quick Notes</p>
            <p className="text-[10px] text-blue-500">Write as you read</p>
          </div>
        </div>

        {/* Text */}
        <div className="hidden lg:block absolute top-[50%] -right-96 animate-pulse z-20" style={{ animationDelay: '1s' }}>
          <div className="bg-purple-50 rounded-xl shadow-lg p-4 border border-purple-100 rotate-[6deg] max-w-[130px]">
            <Type className="text-purple-500 mb-2" size={18} />
            <p className="text-xs text-purple-700 font-medium">Add Text</p>
            <p className="text-[10px] text-purple-500">Annotate anywhere</p>
          </div>
        </div>
      </div>

      <div className="bg-[#f08a6b] rounded-3xl p-3 md:p-6 pb-0 overflow-hidden shadow-xl mx-auto w-full max-w-7xl relative z-20">
        <div className="w-full h-[400px] md:h-[600px] bg-white rounded-t-xl border border-gray-200 shadow-lg overflow-hidden relative">

          {/* Decorative Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

          {/* Screenshots Container - Stacked Overlapping */}
          <div className="absolute top-4 right-[-10%] md:right-10 w-[120%] md:w-[85%] h-full">

            {/* Back Screenshot (Highlighter) */}
            <div className="absolute top-0 right-[15%] md:right-[45%] w-[80%] md:w-[65%] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-200 z-10">
              {/* Traffic lights for mockup feel */}
              <div className="w-full h-8 bg-white border-b border-gray-100 flex items-center px-4 gap-1.5 absolute top-0 z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
              </div>
              <Image src="/highlighter.png" alt="Highlighter feature" width={1000} height={600} className="w-full h-auto object-cover pt-8 bg-white" />
            </div>

            {/* Front Screenshot (Precision) */}
            <div className="absolute top-[15%] md:top-[12%] right-0 lg:right-[-10%] w-[85%] md:w-[70%] rounded-2xl shadow-[-20px_0_50px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-200 z-20">
              {/* Traffic lights for mockup feel */}
              <div className="w-full h-8 bg-white border-b border-gray-100 flex items-center px-4 gap-1.5 absolute top-0 z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
              </div>
              <Image src="/precision.png" alt="Precision freehand drawing" width={1000} height={600} className="w-full h-auto object-cover pt-8 bg-white" />
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Hero