"use client"
import { useEffect, useState } from "react"

import ListUser from "@/components/ListUser"
import ModalFormUser from "@/components/ModalFormUser"

import api from "@/utils/api"
import { BiSolidMessageSquareError } from "react-icons/bi"
import { BsFillInfoSquareFill } from "react-icons/bs"

export default function Page() {

    const [user, setUser] = useState<any>(null)
    const [status, setStatus] = useState({ isError: false, isLoading: false, message: "" });

    const displayMessage = (isError: boolean, message: string) => {
        setStatus({ isError, isLoading: false, message });
        setTimeout(() => setStatus({ isError: false, isLoading: false, message: "" }), 3000);
    };

    const getAuthorization = async () => {
        try {
            const response = await api.get("/authorization");
            const { message, data } = response.data;
            displayMessage(false, message);
            setUser(data)
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    }

    useEffect(() => {
        getAuthorization()
    }, [])

    return (
        <>
            {status.message && (
                <div className={`w-full p-2.5 rounded-sm flex items-center gap-2 ${status.isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                    {status.isError ? <BiSolidMessageSquareError className="w-6 h-6" /> : <BsFillInfoSquareFill className="w-5 h-5" />}
                    <span className="text-sm font-medium">{status.message}</span>
                </div>
            )}
            <ListUser users={user} />
        </>
    )
}