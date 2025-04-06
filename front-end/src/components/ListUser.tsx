"use client"
import { useState, useEffect } from "react";
import { FaRegWindowClose, FaSave, FaUserCog } from "react-icons/fa";

import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Button from "@/ui/Button";

import api from "@/utils/api";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { BsFillInfoSquareFill } from "react-icons/bs";

export default function ListUser({ users }: { users?: any[] }) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const handleOpenModal = (id: string) => {
        setSelectedUser(id);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedUser(null);
    };

    return (
        <>
            {/* Page title */}
            <div className="w-full flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold capitalize">List User</h1>
                    <p>This is user management</p>
                </div>
            </div>
            <div className="w-full p-4 max-h-[84vh] flex flex-col gap-4 bg-white">
                <div className="w-full h-full overflow-auto">
                    <table className="w-full">
                        <thead className="w-full sticky top-0 bg-black text-white z-10">
                            <tr className="w-full">
                                <td className="min-w-[80px] max-w-[80px] p-2 border border-gray-300 text-center">No</td>
                                <td className="w-full p-2 border border-gray-300 text-start">Name</td>
                                <td className="min-w-[130px] max-w-[130px] p-2 border border-gray-300 text-center">Role</td>
                                <td className="w-fit p-2 border border-gray-300 text-center">Action</td>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {users?.map((user: any, index: number) => (
                                <tr key={index} className="w-full">
                                    <td className="min-w-[80px] max-w-[80px] p-2 border border-gray-300 text-center">{index + 1}</td>
                                    <td className="w-full p-2 border border-gray-300 text-start">{user.fullname}</td>
                                    <td className="min-w-[130px] max-w-[130px] p-2 border border-gray-300 text-center">
                                        {user.role === "user" && <span className="px-4 py-1 rounded-sm text-sm bg-gray-300">{user.role}</span>}
                                        {user.role === "admin" && <span className="px-4 py-1 rounded-sm text-sm bg-rose-300">{user.role}</span>}
                                        {user.role === "instructor" && <span className="px-4 py-1 rounded-sm text-sm bg-blue-300">{user.role}</span>}
                                    </td>
                                    <td className="w-fit p-2 border border-gray-300 text-center">
                                        <button
                                            className="py-1 px-4 rounded-sm flex justify-center items-center gap-2 text-nowrap hover:cursor-pointer bg-black text-white"
                                            onClick={() => handleOpenModal(user.id)}
                                        >
                                            <FaUserCog className="w-5 h-5" />
                                            <span className="text-sm">Change Role</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <FormModalChangeRole isOpen={isOpen} id={selectedUser} onClose={handleCloseModal} />
        </>
    )
}

const FormModalChangeRole = ({ isOpen, id, onClose }: { isOpen: boolean, id: string | null, onClose: () => void }) => {

    type FormDataType = {
        user_id: number;
        user_role: string;
    };

    const [formData, setFormData] = useState<FormDataType>({ user_id: 0, user_role: "", });
    const [status, setStatus] = useState({ isError: false, isLoading: false, message: "" });

    const displayMessage = (isError: boolean, message: string) => {
        setStatus({ isError, isLoading: false, message });
        setTimeout(() => setStatus({ isError: false, isLoading: false, message: "" }), 6000);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const getDataUserById = async () => {
        try {
            const response = await api.get(`/authorization/${id}`);
            const { message, data } = response.data;
            displayMessage(false, message);
            setFormData({ user_id: data.id, user_role: data.role });
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    };

    const changeRoleUserById = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api.patch(`/authorization/${id}`, {
                role: formData.user_role
            });
            const { message } = response.data;
            displayMessage(false, message);
            setTimeout(() => window.location.reload(), 2000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    };

    useEffect(() => {
        if (id) {
            getDataUserById();
        }
    }, [id]);

    return (
        <div className={`overflow-auto p-4 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
            <div className="bg-white rounded-sm shadow-lg w-full max-w-md relative">
                <div className="w-full p-4">
                    <div className="w-full flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-semibold capitalize">Change Role</h1>
                        </div>
                        <button className="hover:cursor-pointer duration-200" onClick={onClose}>
                            <FaRegWindowClose className="min-w-8 min-h-8 max-w-8 max-h-8" />
                        </button>
                    </div>
                    <hr className="text-gray-300 mb-4" />
                    <form onSubmit={changeRoleUserById} className="w-full flex flex-col gap-4">
                        {status.message && (
                            <div className={`w-full p-2.5 rounded-sm flex items-center gap-2 ${status.isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                                {status.isError ? <BiSolidMessageSquareError className="w-6 h-6" /> : <BsFillInfoSquareFill className="w-5 h-5" />}
                                <span className="text-sm font-medium">{status.message}</span>
                            </div>
                        )}
                        <Input value={String(formData.user_id)} name="user_id" type="text" disabled required />
                        <Select
                            name="user_role"
                            value={formData.user_role}
                            options={[
                                { value: formData.user_role, label: formData.user_role },
                                ...["user", "instructor", "admin"]
                                    .filter((role) => role !== formData.user_role)
                                    .map((role) => ({ value: role, label: role })),
                            ]}
                            onChange={handleSelectChange}
                            disabled={false}
                            required
                        />
                        <Button className="flex items-center py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-white">
                            <FaSave className="w-5 h-5" />
                            <span className="text-md font-semibold">Save Change</span>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}