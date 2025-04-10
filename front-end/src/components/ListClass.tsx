"use client";
import { useState, useEffect } from "react";

import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Button from "@/ui/Button";

import { BiSolidMessageSquareError } from "react-icons/bi";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaRegWindowClose, FaSave } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

// ACTIONS ICON
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

import api from "@/utils/api";
import { decodeStorageAuthenticated } from "@/utils/secure-storage-authenticated";

// Utility function for displaying messages
const useStatusMessage = () => {
    const [status, setStatus] = useState({ isError: false, isLoading: false, message: "" });

    const displayMessage = (isError: boolean, message: string) => {
        setStatus({ isError, isLoading: false, message });
        setTimeout(() => setStatus({ isError: false, isLoading: false, message: "" }), 3000);
    };

    return { status, setStatus, displayMessage };
};

// Reusable Modal Component
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => (
    <div
        className={`overflow-auto p-4 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
        <div className="bg-white rounded-sm shadow-lg w-full max-w-md relative">
            <div className="w-full p-4 flex justify-between items-center">
                <h1 className="text-2xl font-semibold capitalize">Form</h1>
                <button onClick={onClose} className="hover:cursor-pointer duration-200">
                    <FaRegWindowClose className="min-w-8 min-h-8 max-w-8 max-h-8" />
                </button>
            </div>
            <hr className="text-gray-300" />
            {children}
        </div>
    </div>
);

// Reusable Form Component
const Form = ({
    onSubmit,
    status,
    children,
}: {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    status: { isError: boolean; isLoading: boolean; message: string };
    children: React.ReactNode;
}) => (
    <form onSubmit={onSubmit} className="w-full p-4 flex flex-col gap-4">
        {status.message && (
            <div
                className={`w-full p-2.5 rounded-sm flex items-center gap-2 ${
                    status.isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                }`}
            >
                {status.isError ? <BiSolidMessageSquareError className="w-6 h-6" /> : <BsFillInfoSquareFill className="w-5 h-5" />}
                <span className="text-sm font-medium">{status.message}</span>
            </div>
        )}
        {children}
        <Button className="flex items-center py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-white">
            <FaSave className="w-5 h-5" />
            <span className="text-md font-semibold">Save</span>
        </Button>
    </form>
);

export default function ListClass({ data }: { data?: any }) {
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [classId, setClassId] = useState<number>(0);

    const handleEditClass = (id: number) => {
        setClassId(id);
        setIsModalEditOpen(true);
    };

    const handleDeleteClass = (id: number) => {
        setClassId(id);
        setConfirmDelete(true);
    };

    return (
        <>
            {/* Page title */}
            <div className="w-full flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold capitalize">List Class</h1>
                    <p>This is class management</p>
                </div>
                <div>
                    <button
                        onClick={() => setIsModalCreateOpen(true)}
                        className="py-2 px-4 rounded-sm flex items-center gap-2 bg-black text-white hover:bg-gray-800 hover:cursor-pointer transition ease-in-out duration-200"
                    >
                        <IoAddCircle className="w-5 h-5" />
                        <span>Create</span>
                    </button>
                </div>
            </div>
            <div className="w-full p-4 max-h-[84vh] flex flex-col gap-4 bg-white">
                <div className="w-full h-full overflow-auto">
                    <table className="w-full">
                        <thead className="w-full sticky top-0 bg-black text-white z-10">
                            <tr className="w-full">
                                <td className="min-w-[80px] max-w-[80px] p-2 border border-gray-300 text-center">No</td>
                                <td className="w-fit p-2 border border-gray-300 text-start">Author</td>
                                <td className="w-fit p-2 border border-gray-300 text-start">Title</td>
                                <td className="w-fit p-2 border border-gray-300 text-start">Level</td>
                                <td className="w-fit p-2 border border-gray-300 text-start">Point Unlock</td>
                                <td className="w-fit p-2 border border-gray-300 text-center">Action</td>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {data?.length === 0 ? (
                                <tr className="w-full">
                                    <td className="w-full p-4 border border-gray-300 text-center bg-gray-100" colSpan={6}>
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-lg font-semibold text-gray-700">No classes available</p>
                                            <p className="text-sm text-gray-500">
                                                It seems like you haven't created any classes yet. Click the "Create" button above to get started!
                                            </p>
                                            <button onClick={() => setIsModalCreateOpen(true)} className="hover:cursor-pointer">
                                                <IoAddCircle className="w-10 h-10 text-gray-400" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                data?.map((item: any, index: number) => (
                                    <tr className="w-full" key={index}>
                                        <td className="min-w-[80px] max-w-[80px] p-2 border border-gray-300 text-center">{index + 1}</td>
                                        <td className="w-fit p-2 border border-gray-300 text-start">{item.author}</td>
                                        <td className="w-fit p-2 border border-gray-300 text-start">{item.title}</td>
                                        <td className="w-fit p-2 border border-gray-300 text-start">{item.level}</td>
                                        <td className="w-fit p-2 border border-gray-300 text-start">{item.pointUnlock}</td>
                                        <td className="w-fit p-2 border border-gray-300 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={() => handleEditClass(item.id)}>
                                                    <FaEdit className="w-5 h-5 hover:cursor-pointer text-orange-500 hover:text-orange-700" />
                                                </button>
                                                <button onClick={() => handleDeleteClass(item.id)}>
                                                    <FaTrash className="w-5 h-5 hover:cursor-pointer text-red-500 hover:text-red-700" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <FormCreateClass isOpen={isModalCreateOpen} onClose={() => setIsModalCreateOpen(false)} />
            <FormEditClass classId={classId} isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} />
            <FormDeleteClass classId={classId} isOpen={confirmDelete} onClose={() => setConfirmDelete(false)} />
        </>
    );
}

const FormCreateClass = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    type FormDataType = {
        author_id: number;
        title: string;
        level: "beginner" | "intermediate" | "advanced";
    };

    const [formData, setFormData] = useState<FormDataType>({ author_id: 0, title: "", level: "beginner" });
    const { status, displayMessage } = useStatusMessage();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { author_id, title, level } = formData;
            displayMessage(false, "");

            const response = await api.post("/class", {
                authorId: Number(author_id),
                title: title,
                level: level,
            });

            const { message } = response.data;
            displayMessage(false, message);
            setFormData({ author_id: 0, title: "", level: "beginner" });
            onClose();
            setTimeout(() => window.location.reload(), 2000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    };

    useEffect(() => {
        const getAuthorId = async () => {
            try {
                const storageAuthenticated = await decodeStorageAuthenticated();
                setFormData((prev) => ({ ...prev, author_id: storageAuthenticated.id }));
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
                displayMessage(true, errorMessage);
            }
        };

        getAuthorId();
    }, []);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Form formData={formData} setFormData={setFormData} onSubmit={handleSubmit} status={status}>
                <Input value={String(formData.author_id)} onChange={handleChange} name="author_id" type="text" autoFocus required />
                <Input value={formData.title} onChange={handleChange} name="title" type="text" autoFocus required />
                <Select
                    name="level"
                    value={formData.level}
                    options={[
                        { value: "beginner", label: "Beginner" },
                        { value: "intermediate", label: "Intermediate" },
                        { value: "advanced", label: "Advanced" },
                    ]}
                    onChange={handleSelectChange}
                />
            </Form>
        </Modal>
    );
};

const FormEditClass = ({ classId, isOpen, onClose }: { classId: number; isOpen: boolean; onClose: () => void }) => {
    type FormDataType = {
        author_id: number;
        title: string;
        level: "beginner" | "intermediate" | "advanced";
    };

    const [formData, setFormData] = useState<FormDataType>({ author_id: 0, title: "", level: "beginner" });
    const { status, displayMessage } = useStatusMessage();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { author_id, title, level } = formData;
            displayMessage(false, "");
            const response = await api.patch(`/class/author/${author_id}/${classId}`, {
                authorId: Number(author_id),
                title: title,
                level: level,
            });
            const { message } = response.data;
            displayMessage(false, message);
            setFormData({ author_id: 0, title: "", level: "beginner" });
            onClose();
            setTimeout(() => window.location.reload(), 2000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    };

    const getClassById = async () => {
        if (!classId) {
            displayMessage(true, "Invalid class ID");
            return;
        }
        try {
            const response = await api.get(`/class/${classId}`);
            const { data } = response.data;
            setFormData({
                author_id: data.authorId,
                title: data.title,
                level: data.level,
            });
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "Class not found";
            displayMessage(true, errorMessage);
        }
    };

    useEffect(() => {
        if (isOpen) getClassById();
    }, [classId, isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Form formData={formData} setFormData={setFormData} onSubmit={handleSubmit} status={status}>
                <Input value={String(formData.author_id)} onChange={handleChange} name="author_id" type="text" autoFocus required />
                <Input value={formData.title} onChange={handleChange} name="title" type="text" autoFocus required />
                <Select
                    name="level"
                    value={formData.level}
                    options={[
                        { value: "beginner", label: "Beginner" },
                        { value: "intermediate", label: "Intermediate" },
                        { value: "advanced", label: "Advanced" },
                    ]}
                    onChange={handleSelectChange}
                />
            </Form>
        </Modal>
    );
};

const FormDeleteClass = ({ classId, isOpen, onClose }: { classId: number; isOpen: boolean; onClose: () => void }) => {
    type FormDataType = {
        author_id: number;
        title: string;
        level: "beginner" | "intermediate" | "advanced";
    };

    const [formData, setFormData] = useState<FormDataType>({ author_id: 0, title: "", level: "beginner" });
    const { status, displayMessage } = useStatusMessage();

    const getClassById = async () => {
        if (!classId) {
            displayMessage(true, "Invalid class ID");
            return;
        }
        try {
            const response = await api.get(`/class/${classId}`);
            const { data } = response.data;
            setFormData({
                author_id: data.authorId,
                title: data.title,
                level: data.level,
            });
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "Class not found";
            displayMessage(true, errorMessage);
        }
    };

    const handleDeleteClassById = async () => {
        if (!classId) {
            displayMessage(true, "Invalid class ID");
            return;
        }
        try {
            const { author_id } = formData;
            const response = await api.delete(`class/author/${author_id}/${classId}`);
            const { message } = response.data;
            displayMessage(false, message);
            setFormData({ author_id: 0, title: "", level: "beginner" });
            onClose();
            setTimeout(() => window.location.reload(), 2000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "Class not found";
            displayMessage(true, errorMessage);
        }
    };

    useEffect(() => {
        if (isOpen) getClassById();
    }, [classId, isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-full p-4">
                <div className="w-full flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold capitalize">Confirm Delete</h1>
                        <p>Please select an option</p>
                    </div>
                    <button onClick={onClose} className="hover:cursor-pointer duration-200">
                        <FaRegWindowClose className="min-w-8 min-h-8 max-w-8 max-h-8" />
                    </button>
                </div>
                <hr className="text-gray-300" />
                <div className="w-full p-4">
                    {status.message && (
                        <div
                            className={`w-full p-2.5 rounded-sm flex items-center gap-2 ${
                                status.isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                            }`}
                        >
                            {status.isError ? <BiSolidMessageSquareError className="w-6 h-6" /> : <BsFillInfoSquareFill className="w-5 h-5" />}
                            <span className="text-sm font-medium">{status.message}</span>
                        </div>
                    )}
                </div>
                <div className="w-full p-4 flex items-center gap-4">
                    <button
                        onClick={handleDeleteClassById}
                        className="py-2 px-4 rounded-sm flex items-center gap-2 bg-red-500 text-white hover:bg-red-700 hover:cursor-pointer transition ease-in-out duration-200"
                    >
                        Yes
                    </button>
                    <button
                        className="py-2 px-4 rounded-sm flex items-center gap-2 bg-gray-500 text-white hover:bg-gray-700 hover:cursor-pointer transition ease-in-out duration-200"
                        onClick={onClose}
                    >
                        No
                    </button>
                </div>
            </div>
        </Modal>
    );
};