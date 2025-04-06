"use client"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import NavBottomItemLink from "@/ui/NavBottomItemLink";
import NavBottomItemButton from "@/ui/NavBottomItemButton";

import { FaHome, FaUserCog } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";
import { RiBookShelfFill } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";

import api from "@/utils/api";
import { removeCookieAuthenticated } from "@/utils/cookie-authenticated";
import { decodeStorageAuthenticated, removeStorageAuthenticated } from "@/utils/secure-storage-authenticated";

export default function NavBottomDashboard() {
    const pathname = usePathname();
    const [role, setRole] = useState<string>("");
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

    const getDecodedStorageAuthenticated = async () => {
        const storageAuthenticated = await decodeStorageAuthenticated();
        setRole(storageAuthenticated.role);
    };

    const handleLogout = async () => {
        try {
            await api.get("/auth/logout");
            await removeCookieAuthenticated();
            await removeStorageAuthenticated();
            window.location.href = "/login";
        } catch (error: any) {
            console.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        getDecodedStorageAuthenticated();
    }, [role]);

    return (
        <>
            <nav className="lg:hidden w-full max-w-md mx-auto p-4 fixed bottom-0 left-0 right-0 z-10">
                <div className="w-full h-16 rounded-sm shadow-sm flex justify-around items-center border border-gray-100 bg-white">
                    <NavBottomItemLink href="/dashboard/overview" icon={FaHome} label="Overview" isActive={pathname === "/dashboard/overview"} />
                    <NavBottomItemLink href="/dashboard/learning" icon={RiBookShelfFill} label="Learning" isActive={pathname === "/dashboard/learning"} />

                    {/* AUTHORIZATION - START */}
                    {role === "instructor" && <NavBottomItemLink href="/dashboard/class" icon={SiGoogleclassroom} label="Class" isActive={pathname === "/dashboard/class"} />}
                    {role === "admin" && <NavBottomItemLink href="/dashboard/users" icon={FaUsersGear} label="Users" isActive={pathname === "/dashboard/users"} />}
                    {/* AUTHORIZATION - END */}

                    <NavBottomItemLink href="/dashboard/account" icon={FaUserCog} label="Account" isActive={pathname === "/dashboard/account"} />
                    <NavBottomItemButton icon={IoMdExit} label="Logout" onClick={() => setIsLogoutModalOpen(true)} />
                </div>
            </nav>

            {isLogoutModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
                        <p className="mb-6">Are you sure you want to logout?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 hover:cursor-pointer"
                                onClick={() => setIsLogoutModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}