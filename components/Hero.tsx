'use client'
import Link from "next/link"
import { TypeAnimation } from "react-type-animation"

const Hero = () => {
  return (
    <section className='h-screen w-full text-center py-10'>
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-medium text-black leading-[1.1] mb-6 tracking-tighter">

            Read,{" "}
            <span className="italic font-instrument-serif font-normal tracking-normal">
                Doodle
            </span>
            , <br className="hidden sm:block" />
            & Write.
            </h1>

            <p className="text-sm md:text-base text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed font-ibm-plex-mono">
            A dual-view workspace designed for seamless PDF note-taking.
            Combine your reading and writing workflow in one place
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
                href="/workspace"
                className='inline-block bg-black text-white rounded-3xl px-5 py-3 hover:scale-95 font-ibm-plex-mono cursor-pointer'>
                Get Started
            </Link>
            </div>
        </div>
    </section>
  )
}

export default Hero