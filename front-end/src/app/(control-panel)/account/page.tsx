"use client";
import api from "@/utils/api";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import secureLocalStorage from "react-secure-storage";

import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";

export default function Page() {

    const [isError, setIsError] = useState<boolean>(false);

    const [fullname, setFullname] = useState<string>("");
    const [fullnameMessage, setFullnameMessage] = useState<string>("");

    const [passwordMessage, setPasswordMessage] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChangeFullname = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token: any = secureLocalStorage.getItem("access_token");
            const decodedToken: any = jwtDecode(token);
            const response = await api.patch(`/account/${decodedToken.id}`, { fullname });
            setIsError(false);
            setFullnameMessage(response.data.message);
            setTimeout(() => { setFullnameMessage(""); }, 2000);
        } catch (error: any) {
            setIsError(true);
            setFullnameMessage(error.response.data.message);
            setTimeout(() => { setFullnameMessage(""); }, 2000);
        }
    }

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                setIsError(true);
                setPasswordMessage("Password and confirm password must be the same");
                setTimeout(() => { setPasswordMessage(""); }, 2000);
                return;
            }
            const token: any = secureLocalStorage.getItem("access_token");
            const decodedToken: any = jwtDecode(token);
            const response = await api.patch(`/account/${decodedToken.id}`, { password, confirmPassword });
            setIsError(false);
            setPasswordMessage(response.data.message);
            setTimeout(() => { setPasswordMessage(""); }, 2000);
        } catch (error: any) {
            setIsError(true);
            setPasswordMessage(error.response.data.message);
            setTimeout(() => { setPasswordMessage(""); }, 2000);
        }
    }

    return (
        <>
            <h1 className="text-lg font-semibold capitalize">Edit Profile</h1>
            <form onSubmit={handleChangeFullname} className="w-full max-w-md p-2.5 flex flex-col gap-4 rounded-sm shadow-sm bg-white">
                {fullnameMessage && (
                    <div className={`w-full p-2 rounded-sm ${isError ? "bg-red-500" : "bg-green-500"}  text-white`}>
                        <h2 className="text-sm font-semibold">{fullnameMessage}</h2>
                    </div>
                )}
                <div className="w-full">
                    <label htmlFor="fullname" className="text-sm font-semibold capitalize">full name</label>
                    <input value={fullname} onChange={(e) => setFullname(e.target.value)} required id="fullname" type="text" className="w-full p-2 outline-none border border-slate-400 focus:border-slate-600 rounded-sm" />
                </div>
                <button className="w-full py-2 px-4 bg-slate-600 text-white rounded-sm">Change</button>
            </form>


            <h1 className="text-lg font-semibold capitalize">change password</h1>
            <form onSubmit={handleChangePassword} className="w-full max-w-md p-2.5 flex flex-col gap-4 rounded-sm shadow-sm bg-white">
                {passwordMessage && (
                    <div className={`w-full p-2 rounded-sm ${isError ? "bg-red-500" : "bg-green-500"}  text-white`}>
                        <h2 className="text-sm font-semibold">{passwordMessage}</h2>
                    </div>
                )}
                <div className="w-full">
                    <label htmlFor="new_password" className="text-sm font-semibold capitalize">new password</label>
                    <div className="w-full relative">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} required id="new_password" type={showPassword ? "text" : "password"} className="w-full p-2 outline-none border border-slate-400 focus:border-slate-600 rounded-sm" />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-4 hover:cursor-pointer">
                            {showPassword ? <FaRegEyeSlash className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <label htmlFor="confirmPassword" className="text-sm font-semibold capitalize">confirm password</label>
                    <div className="w-full relative">
                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required id="new_password" type={showPassword ? "text" : "password"} className="w-full p-2 outline-none border border-slate-400 focus:border-slate-600 rounded-sm" />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-4 hover:cursor-pointer">
                            {showPassword ? <FaRegEyeSlash className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                <button className="w-full py-2 px-4 bg-slate-600 text-white rounded-sm">Change</button>
            </form>
        </>
    )
}