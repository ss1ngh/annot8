import Image from "next/image";
import Logo from "../public/annot8-logo.svg"
import { BookOpen, Download } from "lucide-react";
const Navbar = () => {


    return ( 
        <nav className="grid grid-cols-2 h-12 w-full bg-white/90 border-gray-800 px-4 items-center z-50 shadow-sm">
            
            {/*Logo*/}
            <div className=" flex items-center gap-3">
                <div className="flex items-center cursor-pointer">
                    <div className="w-16 h-10 flex items-center justify-center transition-transform group-hover:scale-150">
                        <Image src={Logo} alt="annot8 logo" className="h-20 w-auto"/>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 font-dm-sans text-sm tracking-tighter">
                <button /* onClick={onDownload} */ className=" flex gap-2"
                >
                    <div className="flex items-center ">
                        <BookOpen size={18}
                        className="relative top-px"/>
                    </div>
                    <span className=" inline-flex items-center">How it works</span>               
                </button>
            </div>

        </nav>
    )
}

export default Navbar;