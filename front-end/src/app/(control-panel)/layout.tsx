"use client";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import secureLocalStorage from "react-secure-storage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setRole, logout as logoutAction } from "@/store/slices/auth.slice";
import { usePathname } from "next/navigation";

import { TiThMenu } from "react-icons/ti";
import { RiAccountBoxLine } from "react-icons/ri";
import { BiInfoSquare, BiExit } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";
import { RxDashboard } from "react-icons/rx";
import { TbInfoHexagonFilled } from "react-icons/tb";
import { MdOutlineClass } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const dispatch = useAppDispatch();
    const { isAuthenticated, role } = useAppSelector((state) => state.auth);

    const [aside, setAside] = useState<boolean>(false);
    const [avatarMenu, setAvatarMenu] = useState<boolean>(false);
    const [logout, setLogout] = useState<boolean>(false);

    const asideRef = useRef<HTMLDivElement>(null);
    const avatarMenuRef = useRef<HTMLDivElement>(null);
    const logoutRef = useRef<HTMLDivElement>(null);

    const handleAside = useCallback(() => setAside((prev) => !prev), []);
    const handleAvatarMenu = useCallback(() => setAvatarMenu((prev) => !prev), []);
    const handleLogout = useCallback(() => {
        setAvatarMenu(false);
        setLogout((prev) => !prev);
    }, []);

    const confirmLogout = useCallback(() => {
        dispatch(logoutAction());
        secureLocalStorage.removeItem("access_token");
        window.location.href = "/login";
    }, [dispatch]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
            setAside(false);
        }
        if (avatarMenuRef.current && !avatarMenuRef.current.contains(event.target as Node)) {
            setAvatarMenu(false);
        }
        if (logoutRef.current && !logoutRef.current.contains(event.target as Node)) {
            setLogout(false);
        }
    }, []);

    const pathname = usePathname();

    useEffect(() => {
        const token: any = secureLocalStorage.getItem("access_token");
        if (!token) {
            console.error("Token is missing");
            window.location.href = "/login";
            return;
        }

        try {
            const decodedToken = jwtDecode<{ [key: string]: any }>(token);
            dispatch(setRole(decodedToken.role));
        } catch (error) {
            console.error(error);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dispatch, handleClickOutside]);

    return (
        <>
            <div className="fixed top-0 z-10 w-full py-2 px-6">
                <nav className="w-full h-14 px-2.5 flex justify-between items-center rounded-sm shadow-sm drop-shadow-sm bg-white">
                    <button onClick={handleAside}><TiThMenu className="w-6 h-6" /></button>
                    <button onClick={handleAvatarMenu} className="w-9 h-9 min-w-9 min-h-9 rounded-sm shadow-sm drop-shadow-sm" style={{ background: "url('/images/programmer.svg')", backgroundSize: "cover" }} />
                </nav>
            </div>
            {aside && (
                <div ref={asideRef} className="fixed top-16 z-10 w-full max-w-xs py-2 px-6">
                    <aside className="w-full min-h-screen px-2.5 py-4 flex flex-col gap-2 rounded-sm shadow-sm drop-shadow-sm bg-white">
                        <Link href="/dashboard" className={`w-full p-1.5 flex items-center gap-2.5 rounded-sm ${pathname === "/dashboard" ? "bg-slate-500 text-white" : "hover:bg-slate-100"}`}>
                            <RxDashboard className="w-6 h-6" />
                            <span className="capitalize">dashboard</span>
                        </Link>
                        <Link href="" className={`w-full p-1.5 flex items-center gap-2.5 rounded-sm ${pathname === "/" ? "bg-slate-500 text-white" : "hover:bg-slate-100"}`}>
                            <SiGoogleclassroom className="w-6 h-6" />
                            <span className="capitalize">my lessons</span>
                        </Link>
                        {role === "admin" && (
                            <Link href="" className={`w-full p-1.5 flex items-center gap-2.5 rounded-sm ${pathname === "" ? "bg-slate-500 text-white" : "hover:bg-slate-100"}`}>
                                <MdOutlineClass className="w-6 h-6" />
                                <span className="capitalize">my module</span>
                            </Link>
                        )}
                        {role === "superadmin" && (
                            <Link href="" className={`w-full p-1.5 flex items-center gap-2.5 rounded-sm ${pathname === "" ? "bg-slate-500 text-white" : "hover:bg-slate-100"}`}>
                                <FaUserFriends className="w-6 h-6" />
                                <span className="capitalize">user management</span>
                            </Link>
                        )}
                    </aside>
                </div>
            )}
            {avatarMenu && (
                <div ref={avatarMenuRef} className="w-full relative">
                    <div className="w-[280px] h-fit box-border p-2.5 absolute top-20 right-2.5 z-10 flex flex-col gap-2 rounded-sm shadow-sm drop-shadow-sm bg-white">
                        <div className="w-full h-20 box-border rounded-sm flex flex-col justify-center items-center bg-black">
                            <span className="text-white">USER TESTING</span>
                            <span className="text-sm font-semibold text-white">user@test.com</span>
                        </div>
                        <Link href="/account" className="w-full p-1.5 flex items-center gap-2.5 hover:bg-slate-100">
                            <RiAccountBoxLine className="w-6 h-6" />
                            <span>Account</span>
                        </Link>
                        {role === "admin" && (
                            <Link href="" className="w-full p-1.5 flex items-center gap-2.5 hover:bg-slate-100">
                                <BiInfoSquare className="w-6 h-6" />
                                <span>Info</span>
                            </Link>
                        )}
                        <hr className="w-full border-slate-200" />
                        <button onClick={handleLogout} className="w-full p-1.5 flex items-center gap-2.5 hover:bg-slate-100">
                            <BiExit className="w-6 h-6" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
            {logout && (
                <div ref={logoutRef} className="fixed top-0 bottom-0 left-0 right-0 z-20 flex justify-center items-center bg-transparent" style={{ backdropFilter: "blur(4px)" }}>
                    <div className="w-full p-2.5 max-w-md rounded-sm shadow-sm drop-shadow-sm bg-white">
                        <div className="w-full h-[250px] box-border flex flex-col justify-center items-center gap-4">
                            <TbInfoHexagonFilled className="w-32 h-32" />
                            <span className="font-semibold text-lg uppercase">Are you sure you want to logout?</span>
                        </div>
                        <div className="w-full flex items-center gap-2.5">
                            <button onClick={confirmLogout} className="w-full py-2.5 text-center rounded-sm bg-black text-white hover:cursor-pointer">Yes, I want to logout</button>
                            <button onClick={handleLogout} className="w-full py-2.5 rounded-sm shadow-sm bg-rose-500 text-white text-center hover:cursor-pointer">No, cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <main className={`${aside ? "w-full pt-20 px-6 md:pl-[310px] md:pr-6" : "w-full pt-20 px-6"} flex flex-col gap-4`}>
                {children}
            </main>
        </>
    );
}