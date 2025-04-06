"use client";
import { useState, useEffect } from "react";

import Input from "@/ui/Input";
import Button from "@/ui/Button";

import { FaSave } from "react-icons/fa";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { BsFillInfoSquareFill } from "react-icons/bs";

import api from "@/utils/api";
import { decodeStorageAuthenticated } from "@/utils/secure-storage-authenticated";

type FormDataType = {
    full_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
};

const initialFormData: FormDataType = {
    full_name: "",
    email: "",
    password: "",
    confirm_password: ""
};

export default function Page() {

    const [formData, setFormData] = useState(initialFormData);
    const [status, setStatus] = useState({ isError: false, isLoading: false, message: "" });

    const getAccountById = async () => {
        try {
            const storageAuthenticated = await decodeStorageAuthenticated();
            const response = await api.get(`/account/${storageAuthenticated.id}`);
            const { data } = response.data;
            setFormData((prev) => ({ ...prev, full_name: data.fullname, email: data.email }));
            displayMessage(false, "Account data retrieved successfully");
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const displayMessage = (isError: boolean, message: string) => {
        setStatus({ isError, isLoading: false, message });
        setTimeout(() => setStatus({ isError: false, isLoading: false, message: "" }), 3000);
    };

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { full_name } = formData;
            setStatus({ isError: false, isLoading: true, message: "" });

            const storageAuthenticated = await decodeStorageAuthenticated();
            const response = await api.patch(`/account/${storageAuthenticated.id}`, { fullname: full_name });

            const { message } = response.data;
            displayMessage(false, message);
            setFormData(initialFormData);

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    }

    const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { password, confirm_password } = formData;
            setStatus({ isError: false, isLoading: true, message: "" });
            if (password !== confirm_password) {
                displayMessage(true, "Passwords do not match");
                return;
            }

            const storageAuthenticated = await decodeStorageAuthenticated();
            const response = await api.patch(`/account/${storageAuthenticated.id}`, { password: password, confirmPassword: confirm_password });

            const { message } = response.data;
            displayMessage(false, message);
            setFormData(initialFormData);

            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    }


    useEffect(() => {
        getAccountById();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-2xl font-semibold capitalize">Account</h1>
                <p>This is account page</p>
            </div>
            <div className="w-full xl:max-w-lg max-h-[84vh] flex flex-col gap-4">
                {status.message && (
                    <div className={`w-full p-2.5 rounded-sm flex items-center gap-2 ${status.isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                        {status.isError ? <BiSolidMessageSquareError className="w-6 h-6" /> : <BsFillInfoSquareFill className="w-5 h-5" />}
                        <span className="text-sm font-medium">{status.message}</span>
                    </div>
                )}
                <form onSubmit={handleUpdateProfile} className="w-full p-4 flex flex-col gap-4 rounded-sm bg-white">
                    <Input value={formData.full_name} onChange={handleChange} name="full_name" type="text" required />
                    <Input value={formData.email} onChange={handleChange} name="email" type="text" disabled required />
                    <Button className="flex items-center py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-white">
                        <FaSave className="w-5 h-5" />
                        <span className="text-md font-semibold">Save Change</span>
                    </Button>
                </form>
                <form onSubmit={handleUpdatePassword} className="w-full p-4 flex flex-col gap-4 rounded-sm bg-white">
                    <Input value={formData.password} onChange={handleChange} name="password" type="password" required />
                    <Input value={formData.confirm_password} onChange={handleChange} name="confirm_password" type="password" required />
                    <Button className="flex items-center py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-white">
                        <FaSave className="w-5 h-5" />
                        <span className="text-md font-semibold">Save Change</span>
                    </Button>
                </form>
            </div>
        </>
    )
}