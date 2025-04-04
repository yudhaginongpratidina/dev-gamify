"use client"
import { usePathname } from "next/navigation";

import NavBottomItemLink from "@/ui/NavBottomItemLink";
import { FaHome, FaUserCog } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { RiBookShelfFill } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";

export default function NavBottomDashboard() {
    const pathname = usePathname();

    return (
        <nav className="lg:hidden w-full max-w-md mx-auto p-4 fixed bottom-0 left-0 right-0 z-10">
            <div className="w-full h-16 rounded-sm shadow-sm flex justify-around items-center border border-gray-100 bg-white">
                <NavBottomItemLink href="/dashboard/overview" icon={FaHome} label="Overview" isActive={pathname === "/dashboard/overview"} />
                <NavBottomItemLink href="/dashboard/learning" icon={RiBookShelfFill} label="Learning" isActive={pathname === "/dashboard/learning"} />
                <NavBottomItemLink href="/dashboard/class" icon={SiGoogleclassroom} label="Class" isActive={pathname === "/dashboard/class"} />
                <NavBottomItemLink href="/dashboard/users" icon={FaUsersGear} label="Users" isActive={pathname === "/dashboard/users"} />
                <NavBottomItemLink href="/dashboard/account" icon={FaUserCog} label="Account" isActive={pathname === "/dashboard/account"} />
            </div>
        </nav>
    )
}