"use client"

import { useState } from "react"

import Link from "next/link"
import Input from "@/ui/Input"
import Button from "@/ui/Button"
import LoadingSpinner from "@/ui/LoadingSpinner"

import { BiSolidMessageSquareError } from "react-icons/bi"
import { BsFillInfoSquareFill } from "react-icons/bs"

type FormDataType = {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
};

const initialFormData: FormDataType = {
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
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
            const { full_name, email, password, confirm_password } = formData;
            setStatus({ isError: false, isLoading: true, message: "" });
            console.log(full_name, email, password, confirm_password);
            displayMessage(false, "Login successful");
            setFormData(initialFormData);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    }

    return (
        <div className="w-full max-w-md p-4 flex flex-col gap-4">
            <div>
                <h1 className="text-3xl capitalize font-bold">create account</h1>
                <p className="text-md font-medium text-gray-600">Please fill in the form below to create an account</p>
            </div>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                {status.message && (
                    <div className={`w-full p-2.5 rounded-sm flex items-center gap-2 ${status.isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                        {status.isError ? <BiSolidMessageSquareError className="w-6 h-6" /> : <BsFillInfoSquareFill className="w-5 h-5" />}
                        <span className="text-sm font-medium">{status.message}</span>
                    </div>
                )}
                <Input value={formData.full_name} onChange={handleChange} name="full_name" type="text" autoFocus required />
                <Input value={formData.email} onChange={handleChange} name="email" type="email" required />
                <Input value={formData.password} onChange={handleChange} name="password" type="password" required />
                <Input value={formData.confirm_password} onChange={handleChange} name="confirm_password" type="password" required />
                <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
                    {status.isLoading ? <LoadingSpinner /> : "Sign up"}
                </Button>
            </form>
            <div>
                <Link href={"/login"} className="w-full flex justify-center items-center gap-1.5">
                    <span className="text-sm text-gray-600">I already have an account?</span>
                    <span className="text-sm font-bold hover:underline hover:underline-offset-4 text-blue-600 duration-200">Login</span>
                </Link>
            </div>
        </div>
    )
}