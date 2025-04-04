import Link from "next/link";
import { FaRegBell } from "react-icons/fa6";

export default function NotoficationButton({href, count}: {href: string, count: number}) {
    return (
        <Link href={href} className="p-1.5 border border-gray-300 hover:bg-slate-800 hover:text-white rounded-sm flex items-center gap-1.5 hover:cursor-pointer duration-200">
            <FaRegBell className="w-4 h-4" />
            <span className="text-sm font-semibold">{count}</span>
        </Link>
    )
}