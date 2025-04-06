"use client"

import { useState } from "react"

import Link from "next/link"
import Input from "@/ui/Input"
import Button from "@/ui/Button"
import LoadingSpinner from "@/ui/LoadingSpinner"

import { BiSolidMessageSquareError } from "react-icons/bi"
import { BsFillInfoSquareFill } from "react-icons/bs"

import api from "@/utils/api"
import { setCookieAuthenticated } from "@/utils/cookie-authenticated";
import { setStorageAuthenticated } from "@/utils/secure-storage-authenticated";

type FormDataType = {
    email: string;
    password: string;
};

const initialFormData: FormDataType = {
    email: "",
    password: "",
};

export default function Page() {
    const [formData, setFormData] = useState(initialFormData);
    const [status, setStatus] = useState({ isError: false, isLoading: false, message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const displayMessage = (isError: boolean, message: string) => {
        setStatus({ isError, isLoading: false, message });
        setTimeout(() => setStatus({ isError: false, isLoading: false, message: "" }), 3000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { email, password } = formData;
            setStatus({ isError: false, isLoading: true, message: "" });
            const response = await api.post("/auth/login", {
                email: email,
                password: password,
            });
            const { token, message } = response.data;
            setCookieAuthenticated(token);
            setStorageAuthenticated(token);
            displayMessage(false, message);
            setFormData(initialFormData);
            setTimeout(() => window.location.href = "/dashboard/overview", 2000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    }

    return (
        <div className="w-full max-w-md p-4 flex flex-col gap-4">
            <div>
                <h1 className="text-3xl capitalize font-bold">wellcome back!</h1>
                <p className="text-md font-medium text-gray-600">Please enter login details below</p>
            </div>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                {status.message && (
                    <div className={`w-full p-2.5 rounded-sm flex items-center gap-2 ${status.isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                        {status.isError ? <BiSolidMessageSquareError className="w-6 h-6" /> : <BsFillInfoSquareFill className="w-5 h-5" />}
                        <span className="text-sm font-medium">{status.message}</span>
                    </div>
                )}
                <Input value={formData.email} onChange={handleChange} name="email" type="email" autoFocus required />
                <Input value={formData.password} onChange={handleChange} name="password" type="password" required />
                <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
                    {status.isLoading ? <LoadingSpinner /> : "Login"}
                </Button>
            </form>
            <div>
                <Link href={"/register"} className="w-full flex justify-center items-center gap-1.5">
                    <span className="text-sm text-gray-600">Dont have an account?</span>
                    <span className="text-sm font-bold hover:underline hover:underline-offset-4 text-blue-600 duration-200">Sign up</span>
                </Link>
            </div>
        </div>
    )
}