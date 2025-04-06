"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DarkModeButton from "@/ui/DarkModeButton";
import { getStorageAuthenticated } from "@/utils/secure-storage-authenticated";

export default function NavigationClient() {

    const [authenticated, setAuthenticated] = useState(false);
    const getAuthenticated = async () => {
        const token = await getStorageAuthenticated();
        if (token) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }

    useEffect(() => {
        getAuthenticated();
    }, []);


    return (
        <nav className="w-full p-4 fixed top-0 left-0 right-0 z-10 flex justify-between items-center shadow-sm drop-shadow-sm bg-white">
            <div className="flex items-center gap-2.5">
                <h1 className="text-lg font-bold">
                    {`${process.env.NEXT_PUBLIC_APP_NAME}`}
                </h1>
            </div>
            <div className="flex items-center gap-2.5">
                <DarkModeButton />
                {authenticated ? (
                    <Link href={"/dashboard"} className="px-4 py-1.5 rounded-sm bg-black text-white border border-black hover:cursor-pointer transition duration-200">
                        Dashboard
                    </Link>
                ) : (
                    <Link href={"/login"} className="px-4 py-1.5 rounded-sm bg-black text-white border border-black hover:cursor-pointer transition duration-200">
                        Login
                    </Link>
                )
                }
            </div>
        </nav>
    )
}