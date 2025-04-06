"use client"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import SidebarItemButton from "@/ui/SidebarItemButton";
import SidebarItemLink from "@/ui/SidebarItemLink";


import { FaHome, FaUserCog } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";
import { RiBookShelfFill } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";

import api from "@/utils/api";
import { removeCookieAuthenticated } from "@/utils/cookie-authenticated";
import { decodeStorageAuthenticated, removeStorageAuthenticated } from "@/utils/secure-storage-authenticated";


export default function SidebarDashboard() {

    const pathname = usePathname();
    const [role, setRole] = useState<string>("");

    const getDecodedStorageAuthenticated = async () => {
        const storageAuthenticated = await decodeStorageAuthenticated();
        setRole(storageAuthenticated.role);
    };

    const handleLogout = async () => {
        try {
            if (confirm("Are you sure you want to logout?")) {
                await api.get("/auth/logout");
                await removeCookieAuthenticated();
                await removeStorageAuthenticated();
                window.location.href = "/login";
            } else {
                return;
            }
        } catch (error: any) {
            console.error(error?.response?.data?.message);
        }
    };


    useEffect(() => {
        getDecodedStorageAuthenticated();
    }, []);

    return (
        <aside className="hidden lg:flex flex-col justify-between gap-4 h-[84vh] w-full max-w-xs p-4 rounded-sm bg-white">
            <div className="w-full flex flex-col gap-4">
                <SidebarItemLink href="/dashboard/overview" icon={FaHome} label="Overview" isActive={pathname === "/dashboard/overview"} />
                <SidebarItemLink href="/dashboard/learning" icon={RiBookShelfFill} label="Learning" isActive={pathname === "/dashboard/learning"} />
                
                {/* AUTHORIZATION - START */}
                {role === "instructor" && <SidebarItemLink href="/dashboard/class" icon={SiGoogleclassroom} label="Class" isActive={pathname === "/dashboard/class"} />}
                {role === "admin" && <SidebarItemLink href="/dashboard/users" icon={FaUsersGear} label="Users" isActive={pathname === "/dashboard/users"} /> }
                {/* AUTHORIZATION - END */}
                
                <SidebarItemLink href="/dashboard/account" icon={FaUserCog} label="Account" isActive={pathname === "/dashboard/account"} />
            </div>
            <SidebarItemButton icon={IoMdExit} label="Logout" onClick={handleLogout} />
        </aside>
    )
}