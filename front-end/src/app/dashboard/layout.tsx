"use client"
import { usePathname } from "next/navigation";

import NavBottomItem from "@/components/NavButtomItem"
import SidebarItemLink from "@/components/SidebarItemLink"

import { FaHome, FaRegBell, FaUserCog } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { RiBookShelfFill } from "react-icons/ri";
import { FaUsersGear } from "react-icons/fa6";
import { MdDarkMode } from "react-icons/md";
import { IoMdExit } from "react-icons/io";

export default function Layout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();

    return (
        <div className="select-none">
            {/* Top Navigation (Mobile + Desktop) */}
            <nav className="w-full p-4 fixed top-0 left-0 right-0 z-10 flex justify-between items-center bg-white">
                <div className="flex items-center gap-2.5">
                    <h1 className="text-lg font-bold">
                        {`${process.env.NEXT_PUBLIC_APP_NAME}`}
                    </h1>
                </div>
                <div className="flex items-center gap-2.5">
                    <button className="p-1.5 border border-gray-300 rounded-sm flex items-center gap-1.5 hover:cursor-pointer">
                        <FaRegBell className="w-4 h-4" />
                        <span className="text-sm font-semibold">0</span>
                    </button>
                    <button className="p-1.5 border border-gray-300 rounded-sm flex items-center gap-1.5 hover:cursor-pointer">
                        <MdDarkMode className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            {/* Main */}
            <div className="w-full min-h-screen px-4 flex items-center gap-4 bg-gray-100">
                <aside className="hidden lg:flex flex-col justify-between gap-4 h-[84vh] w-full max-w-xs p-4 rounded-sm bg-white">
                    <div className="w-full flex flex-col gap-4">
                        <SidebarItemLink href="/dashboard/overview" icon={FaHome} label="Overview" isActive={pathname === "/dashboard/overview"} />
                        <SidebarItemLink href="/dashboard/learning" icon={RiBookShelfFill} label="Learning" isActive={pathname === "/dashboard/learning"} />
                        <SidebarItemLink href="/dashboard/class" icon={SiGoogleclassroom} label="Class" isActive={pathname === "/dashboard/class"} />
                        <SidebarItemLink href="/dashboard/users" icon={FaUsersGear} label="Users" isActive={pathname === "/dashboard/users"} />
                        <SidebarItemLink href="/dashboard/account" icon={FaUserCog} label="Account" isActive={pathname === "/dashboard/account"} />
                    </div>
                    {/* Logout Button */}
                    <button className="w-full flex items-center gap-4 p-1.5 py-2.5 rounded-sm hover:bg-rose-500 hover:text-white duration-200">
                        <IoMdExit className="w-6 h-6" />
                        <span className="text-sm font-semibold">Logout</span>
                    </button>
                </aside>
                <div className="h-[84vh] w-full p-2.5 flex flex-col gap-4">{children}</div>
            </div>

            {/* Buttom Navigation (Mobile) */}
            <nav className="lg:hidden w-full max-w-md mx-auto p-4 fixed bottom-0 left-0 right-0 z-10">
                <div className="w-full h-16 rounded-sm shadow-sm flex justify-around items-center border border-gray-100 bg-white">
                    <NavBottomItem href="/dashboard/overview" icon={FaHome} label="Overview" isActive={pathname === "/dashboard/overview"} />
                    <NavBottomItem href="/dashboard/learning" icon={RiBookShelfFill} label="Learning" isActive={pathname === "/dashboard/learning"} />
                    <NavBottomItem href="/dashboard/class" icon={SiGoogleclassroom} label="Class" isActive={pathname === "/dashboard/class"} />
                    <NavBottomItem href="/dashboard/users" icon={FaUsersGear} label="Users" isActive={pathname === "/dashboard/users"} />
                    <NavBottomItem href="/dashboard/account" icon={FaUserCog} label="Account" isActive={pathname === "/dashboard/account"} />
                </div>
            </nav>

            {/* Footer (only Desktop) */}
            <footer className="hidden lg:block w-full h-14 p-4 fixed bottom-0 left-0 right-0 z-10 text-center bg-white">
                <span className="font-semibold text-gray-600">{new Date().getFullYear()} | Version 1.0</span>
            </footer>
        </div>
    )
}