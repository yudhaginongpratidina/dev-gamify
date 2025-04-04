import { MdDarkMode } from "react-icons/md";

export default function DarkModeButton() {
    return (
        <button className="p-1.5 border border-gray-300 hover:bg-slate-800 hover:text-white rounded-sm flex items-center gap-1.5 hover:cursor-pointer duration-200">
            <MdDarkMode className="w-5 h-5" />
        </button>
    )
}