const ShowcaseTitle = () => {
    return (
        <div className="w-full flex flex-col items-center text-center max-w-3xl mx-auto px-4 pt-16 pb-10 md:pb-14">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-dm-sans text-gray-900 mb-4 tracking-tight leading-[1.1]">
                Reading{" "}
                <span className="italic font-instrument-serif font-normal tracking-normal text-5xl md:text-6xl lg:text-7xl">
                    Reimagined
                </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-dm-sans leading-relaxed max-w-2xl mx-auto font-medium">
                Stop jumping between windows. Annot8 brings your documents and your
                thoughts into a single, unified view, so you can capture every insight
                exactly where it happens.
            </p>
        </div>
    );
};

export default ShowcaseTitle;
