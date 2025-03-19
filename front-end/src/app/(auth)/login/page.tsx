"use client";
import api from "@/utils/api";
import Link from "next/link";
import secureLocalStorage from "react-secure-storage";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginSuccess, loginFailed, clearMessage } from "@/store/slices/auth.slice";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";

export default function Page() {

    const dispatch = useAppDispatch();
    const { message, isError } = useAppSelector((state) => state.auth);
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { email, password });
            dispatch(loginSuccess(response.data.message));
            secureLocalStorage.setItem("access_token", response.data.token);
            setTimeout(() => { 
                dispatch(clearMessage());
                window.location.href = "/dashboard"; 
            }, 2000);
        } catch (error: any) {
            dispatch(loginFailed(error?.response.data.message));
            setTimeout(() => { dispatch(clearMessage()); }, 2000);
        }
    }

    useEffect(() => {
        dispatch(clearMessage());
    }, []);

    return (
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="w-full">
                <h1 className="text-2xl font-semibold">Wellcome back</h1>
                <p>Please enter your details to login</p>
            </div>
            {message && (
                <div className={`w-full p-2 rounded-sm ${isError ? "bg-red-500" : "bg-green-500"}  text-white`}>
                    <h2 className="text-sm font-semibold">{message}</h2>
                </div>
            )}
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
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
                <button className="w-full md:w-fit py-2 px-4 bg-slate-600 text-white rounded-sm">Login</button>
                <Link href={"/register"} className="text-md hover:underline hover:underline-offset-4 text-slate-600">I don't have an account</Link>
            </div>
        </form>
    )
}