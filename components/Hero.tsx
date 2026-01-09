'use client'
import Link from "next/link"
import { TypeAnimation } from "react-type-animation"

const Hero = () => {
  return (
    <section className='h-screen w-full text-center py-10'>
        <div className='text-4xl font-extralight py-3 font-instrument-serif tracking-tight'>
            <h3>
                Dual-View Workspace for PDF note taking
            </h3>
        </div>

        <div className='text-6xl pt-0 py-6 font-sans  tracking-tighter'>
            <h1>
                Read<span className="font-instrument-serif">,</span> <span className="font-instrument-serif">Doodle</span><span className="font-instrument-serif">,</span> Write
            </h1>
        </div>

        <div className="py-6">
            <Link href={'/upload'} className='inline-block bg-black text-white rounded-3xl px-4 py-2 hover:scale-95 font-ibm-plex-mono cursor-pointer'>
                Get Started
            </Link>
        </div>
    </section>
  )
}

export default Hero