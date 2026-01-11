import Image from "next/image";
import Logo from "../../public/annot8-logo.svg"
import { BookOpen, Download } from "lucide-react";
import Link from "next/link";
const Navbar = () => {


    return ( 
        <nav className="grid grid-cols-2 h-13 w-full bg-white/90 border-gray-800 px-4 items-center z-50 shadow-md">
            
            {/*Logo*/}
            <div className=" flex items-center gap-3">
                <div className="flex items-center cursor-pointer">
                    <div className="w-16 h-10 flex items-center justify-center transition-transform scale-120">
                        <Link href={'/'}>
                            <Image src={Logo} alt="annot8 logo" className="h-15 w-auto"/>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 font-dm-sans text-sm tracking-tighter transition-transform duration-300 hover:scale-105 origin-right">
                <Link 
                href={'/guide'}
                className="flex gap-2 cursor-pointer">
                    <div className="flex items-center ">
                        <BookOpen size={18}
                        className="relative top-px"/>
                    </div>
                    <span className=" inline-flex items-center">How it works</span>               
                </Link>
            </div>

        </nav>
    )
}

export default Navbar;