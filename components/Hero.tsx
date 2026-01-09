'use client'
import Link from "next/link"
import { TypeAnimation } from "react-type-animation"

const Hero = () => {
  return (
    <section className='h-screen w-full text-center py-10'>
        <div className='text-3xl font-extralight my-3 font-instrument-serif tracking-tight'>
            <h3>
                Dual-View Workspace for PDF note taking
            </h3>
        </div>

        <div className='text-6xl my-4 font-sans tracking-tighter'>
            <h1>
                Read,{' '}
                <TypeAnimation
                    sequence={[
                        'Doodle',
                        3000,
                        'Annotate',
                        3000
                    ]}
                    wrapper="span"
                    speed={20}
                    className="font-instrument-serif inline-block"
                    repeat={Infinity}
                    cursor={true} 
                />
                , Write
            </h1>
        </div>

        <div className="py-6">
            <Link href={'/upload'} className='border-2 border-black bg-black text-white rounded-3xl px-4 py-2 hover:border-white font-ibm-plex-mono cursor-pointer'>
                Get Started
            </Link>
        </div>
    </section>
  )
}

export default Hero