"use client"
import { useState } from "react";

import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Button from "@/ui/Button";

import { FaSave } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { BsFillInfoSquareFill } from "react-icons/bs";

type FormDataType = {
    id: number;
    author_id: string;
    title : string;
    level: string;
};

const initialFormData: FormDataType = {
    id: 0,
    author_id: "",
    title: "",
    level: "",
};

export default function ModalFormUser({ isOpen, closeModal, data }: { isOpen: boolean, closeModal: () => void, data?: any }) {

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

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { author_id, title, level } = formData;
            setStatus({ isError: false, isLoading: true, message: "" });
            console.log(author_id, title, level);
            displayMessage(false, "User created successfully");
            setFormData(initialFormData);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    }

    return (
        <div className={`overflow-auto p-4 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
            <div className="bg-white rounded-sm shadow-lg w-full max-w-md relative">
                <div className="w-full p-4">
                    <div className="w-full flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-semibold capitalize">form class</h1>
                            <p>This is form class</p>
                        </div>
                        <button onClick={closeModal} className="hover:cursor-pointer duration-200">
                            <FaRegWindowClose className="min-w-8 min-h-8 max-w-8 max-h-8" />
                        </button>
                    </div>
                    <hr className="text-gray-300" />
                </div>
                <form onSubmit={handleCreate} className="w-full p-4 flex flex-col gap-4">
                    {status.message && (
                        <div className={`w-full p-2.5 rounded-sm flex items-center gap-2 ${status.isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                            {status.isError ? <BiSolidMessageSquareError className="w-6 h-6" /> : <BsFillInfoSquareFill className="w-5 h-5" />}
                            <span className="text-sm font-medium">{status.message}</span>
                        </div>
                    )}
                    <Input value={formData.author_id} onChange={handleChange} name="full_name" type="text" autoFocus required />
                    <Input value={formData.title} onChange={handleChange} name="email" type="email" required />
                    <Select
                        name="role"
                        value={formData.level}
                        options={[
                            { value: "", label: "Select Level" },
                            { value: "beginner", label: "Beginner" },
                            { value: "intermediate", label: "Intermediate" },
                            { value: "advanced", label: "Advanced" },
                        ]}
                        onChange={handleSelectChange}
                        disabled={false}
                        required
                    />
                    <div className="w-full flex justify-start items-center gap-2.5">
                        <Button className="flex items-center py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-white">
                            <FaSave className="w-5 h-5" />
                            <span className="text-md font-semibold">Save</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}