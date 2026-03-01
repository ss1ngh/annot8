import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
    return (
        <section className="py-20 px-4 text-center relative z-20">
            <h2 className="text-3xl md:text-4xl font-black font-dm-sans text-gray-900 mb-3 tracking-tight">
                Ready to take notes?
            </h2>
            <p className="text-gray-500 font-dm-sans mb-8 max-w-md mx-auto">
                Free to use. No account needed. Just open and annotate.
            </p>
            <Link
                href="/workspace"
                className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-full px-7 py-3 font-semibold font-dm-sans text-base hover:scale-95 hover:bg-black transition-transform"
            >
                Open Workspace
                <ArrowRight size={16} />
            </Link>
        </section>
    );
};

export default CtaSection;
