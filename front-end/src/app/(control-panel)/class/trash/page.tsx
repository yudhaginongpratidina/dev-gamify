"use client";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";
import api from "@/utils/api";

export default function Page() {

    const token: any = secureLocalStorage.getItem("access_token");
    const [isError, setIsError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [data, setData] = useState([]);

    const getDataTrash = async () => {
        try {
            const decodedToken: any = jwtDecode(token);
            const authorId: any = decodedToken.id;
            const response = await api.get(`/class/author/${authorId}/trash`);
            setData(response.data.data);
        } catch (error: any) {
            setIsError(true);
            setMessage(error?.response.data.message);
            setTimeout(() => {
                setMessage("");
            }, 2000);
        }
    }


    const handleRestore = async (classId: any) => {
        try {
            const decodedToken: any = jwtDecode(token);
            const authorId: any = decodedToken.id;
            const response = await api.patch(`/class/author/${authorId}/${classId}/restore`);
            if (response.status === 200) {
                setIsError(false);
                setMessage(response.data.message);
                setTimeout(() => {
                    setMessage("");
                    getDataTrash();
                }, 2000);
            }
        } catch (error: any) {
            setIsError(true);
            setMessage(error?.response.data.message);
            setTimeout(() => {
                setMessage("");
            }, 2000);
        }
    }

    useEffect(() => {
        getDataTrash();
    }, [])

    return (
        <>
            <h1 className="text-lg uppercase font-semibold">trash</h1>
            {message && (
                <div className={`w-full p-2 rounded-sm ${isError ? "bg-red-500" : "bg-green-500"}  text-white`}>
                    <h2 className="text-sm font-semibold">{message}</h2>
                </div>
            )}
            <div className="w-full overflow-auto">
                {data.length === 0 ? (
                    <table className="w-full">
                        <thead className="w-full">
                            <tr className="w-full">
                                <th className="min-w-[50px] max-w-[50px] p-1.5 border-y border-gray-300 font-semibold capitalize">no</th>
                                <th className="min-w-[250px] max-w-[250px] p-1.5 border-y border-gray-300 font-semibold capitalize">title</th>
                                <th className="min-w-[100px] max-w-[100px] p-1.5 border-y border-gray-300 font-semibold capitalize">level</th>
                                <th className="min-w-[100px] max-w-[100px] p-1.5 border-y border-gray-300 font-semibold capitalize">point unlock</th>
                                <th className="w-fit whitespace-nowrap p-1.5 border-y border-gray-300 font-semibold capitalize">total chapter</th>
                                <th className="w-fit whitespace-nowrap p-1.5 border-y border-gray-300 font-semibold capitalize">total student</th>
                                <th className="w-fit whitespace-nowrap p-1.5 border-y border-gray-300 font-semibold capitalize">action</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            <tr className="w-full">
                                <td colSpan={7} className="w-full p-1.5 text-center border-y border-gray-300">
                                    data not found
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <table className="w-full">
                        <thead className="w-full">
                            <tr className="w-full">
                                <th className="min-w-[50px] max-w-[50px] p-1.5 border-y border-gray-300 font-semibold capitalize">no</th>
                                <th className="text-start min-w-[250px] max-w-[250px] p-1.5 border-y border-gray-300 font-semibold capitalize">title</th>
                                <th className="min-w-[100px] max-w-[100px] p-1.5 border-y border-gray-300 font-semibold capitalize">level</th>
                                <th className="min-w-[100px] max-w-[100px] p-1.5 border-y border-gray-300 font-semibold capitalize">point unlock</th>
                                <th className="w-fit whitespace-nowrap p-1.5 border-y border-gray-300 font-semibold capitalize">total chapter</th>
                                <th className="w-fit whitespace-nowrap p-1.5 border-y border-gray-300 font-semibold capitalize">total student</th>
                                <th className="w-fit whitespace-nowrap p-1.5 border-y border-gray-300 font-semibold capitalize">action</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {data.map((item: any, index: number) => (
                                <tr key={index} className="w-full">
                                    <td className="text-center min-w-[50px] max-w-[50px] p-1.5 border-y border-gray-300">{index + 1}</td>
                                    <td className="min-w-[250px] max-w-[250px] p-1.5 border-y border-gray-300">{item.title}</td>
                                    <td className="text-center min-w-[100px] max-w-[100px] p-1.5 border-y border-gray-300">{item.level}</td>
                                    <td className="text-center min-w-[100px] max-w-[100px] p-1.5 border-y border-gray-300">{item.pointUnlock}</td>
                                    <td className="text-center w-fit whitespace-nowrap p-1.5 border-y border-gray-300">0</td>
                                    <td className="text-center w-fit whitespace-nowrap p-1.5 border-y border-gray-300">0</td>
                                    <td className="w-fit whitespace-nowrap p-1.5 border-y border-gray-300">
                                        <button onClick={() => handleRestore(item.id)} className="text-sm capitalize py-1.5 px-3 rounded-sm hover:cursor-pointer bg-red-500 text-white">
                                            restore
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}