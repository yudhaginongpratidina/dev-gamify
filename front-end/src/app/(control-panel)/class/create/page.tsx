"use client"
import { useState } from "react"
import secureLocalStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";
import api from "@/utils/api";

export default function Page() {

    const [title, setTitle] = useState<string>("");
    const [level, setLevel] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token: any = secureLocalStorage.getItem("access_token");
            const decodedToken: any = jwtDecode(token);
            const authorId: any = decodedToken.id;
            const response = await api.post("/class", {
                title: title,
                level: level,
                authorId: authorId
            });
            if (response.status === 201) {
                setIsError(false);
                setMessage(response.data.message);
                setTimeout(() => {
                    setMessage("");
                    window.location.href = "/class";
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

    return (
        <>
            <h1 className="text-lg uppercase font-semibold">create class</h1>
            <form onSubmit={handleSubmit} action="" className="w-full max-w-md p-2.5 flex flex-col gap-4">
                {message && (
                    <div className={`w-full p-2 rounded-sm ${isError ? "bg-red-500" : "bg-green-500"}  text-white`}>
                        <h2 className="text-sm font-semibold">{message}</h2>
                    </div>
                )}
                <div className="w-full flex flex-col gap-0.5">
                    <label htmlFor="title" className="text-sm font-semibold capitalize">title</label>
                    <input required value={title} onChange={(e) => setTitle(e.target.value)} id="title" type="text" className="w-full p-2 outline-none border border-slate-400 focus:border-slate-600 rounded-sm" />
                </div>
                <div className="w-full flex flex-col gap-0.5">
                    <label htmlFor="level" className="text-sm font-semibold capitalize">level</label>
                    <select required value={level} onChange={(e) => setLevel(e.target.value)} id="level" className="w-full p-2 outline-none border border-slate-400 focus:border-slate-600 rounded-sm">
                        <option value="">Select level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <button className="w-full md:w-fit py-2 px-4 bg-slate-600 text-white rounded-sm">Create</button>
            </form>
        </>
    )
}

// beginner        // Beginner level
// intermediate    // Intermediate level
// advanced        // Advanced level