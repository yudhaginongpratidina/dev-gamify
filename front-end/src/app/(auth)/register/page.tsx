"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerSuccess, registerFailed, clearMessage } from "@/store/slices/auth.slice";

import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";

export default function Page() {

    const dispatch = useAppDispatch();
    const { message, isError } = useAppSelector((state) => state.auth);

    const [fullname, setFullname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);


    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const url = process.env.NEXT_PUBLIC_API_BACKEND_URL;
            const response = await axios.post(`${url}/auth/register`, { fullname, email, password, confirmPassword });
            dispatch(registerSuccess(response.data.message));
            setTimeout(() => { dispatch(clearMessage()); }, 5000);
        } catch (error: any) {
            dispatch(registerFailed(error.response.data.message));
            setTimeout(() => { dispatch(clearMessage()); }, 5000);
        }
    }


    return (
        <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
            <div className="w-full">
                <h1 className="text-2xl font-semibold">Register</h1>
                <p>Wellcome to the app, let's create your account</p>
            </div>
            {message && (
                <div className={`w-full p-2 rounded-sm ${isError ? "bg-red-500" : "bg-green-500"}  text-white`}>
                    <h2 className="text-sm font-semibold">{message}</h2>
                </div>
            )}
            <div className="w-full">
                <label htmlFor="fullname" className="text-sm font-semibold capitalize">full name</label>
                <input value={fullname} onChange={(e) => setFullname(e.target.value)} required id="fullname" type="text" className="w-full p-2 outline-none border border-slate-400 focus:border-slate-600 rounded-sm" />
            </div>
            <div className="w-full">
                <label htmlFor="email" className="text-sm font-semibold capitalize">e-mail</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} required id="email" type="email" className="w-full p-2 outline-none border border-slate-400 focus:border-slate-600 rounded-sm" />
            </div>
            <div className="w-full">
                <label htmlFor="password" className="text-sm font-semibold capitalize">password</label>
                <div className="w-full relative">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} required id="password" type={showPassword ? "text" : "password"} className="w-full p-2 outline-none border border-slate-400 focus:border-slate-600 rounded-sm" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-4 hover:cursor-pointer">
                        {showPassword ? <FaRegEyeSlash className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
                    </button>
                </div>
            </div>
            <div className="w-full">
                <label htmlFor="confirmPassword" className="text-sm font-semibold capitalize">confirm password</label>
                <div className="w-full relative">
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required id="confirmPassword" type={showPassword ? "text" : "password"} className="w-full p-2 outline-none border border-slate-400 focus:border-slate-600 rounded-sm" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-4 hover:cursor-pointer">
                        {showPassword ? <FaRegEyeSlash className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
                    </button>
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
                <button className="w-full md:w-fit py-2 px-4 bg-slate-600 text-white rounded-sm">
                    Register
                </button>
                <Link href={"/login"} className="text-md hover:underline hover:underline-offset-4 text-slate-600">I already have an account</Link>
            </div>
        </form>
    )
}