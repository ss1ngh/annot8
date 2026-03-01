import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/annot8-logo.svg";

const Footer = () => {
    return (
        <footer className="bg-gray-50 pt-20 pb-10 px-4 mt-12 border-t border-gray-100 relative z-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start">
                    <Link href={'/'} className="flex items-center gap-2 mb-2">
                        <Image src={Logo} alt="annot8 logo" className="h-10 w-auto opacity-80 grayscale" />
                    </Link>
                    <p className="text-sm text-gray-500 font-dm-sans">
                        © {new Date().getFullYear()} Annot8. All rights reserved.
                    </p>
                </div>

                <div className="flex gap-6 font-dm-sans text-sm text-gray-600">
                    <Link href="/guide" className="hover:text-gray-900 transition-colors">
                        How it works
                    </Link>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                        GitHub
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                        Twitter
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
