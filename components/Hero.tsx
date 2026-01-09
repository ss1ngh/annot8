const Hero = () => {
  return (
    <section className='h-screen w-full text-center py-10'>
        <div className='text-3xl font-extralight my-3 font-instrument-serif tracking-tight'>
            <h3>
                Dual-View Workspace for PDF note taking
            </h3>
        </div>

        <div className='text-6xl my-4 font-dm-sans font-sans tracking-tighter'>
            <h1>
                Read, <span className="font-instrument-serif">Doodle</span>, Write
            </h1>
        </div>

        <div className="py-6">
            <button className='border-2 border-black bg-black text-white rounded-3xl px-4 py-2 hover:border-white font-ibm-plex-mono cursor-pointer'>
                Get Started
            </button>
        </div>
    </section>
  )
}

export default Hero