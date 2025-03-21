"use client";
import api from "@/utils/api";
import secureLocalStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";

export default function Page(){
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    
    const getDetails = async () => {
        try {
            const token: any = secureLocalStorage.getItem("access_token");
            const decodedToken: any = jwtDecode(token);
            console.log(decodedToken);
            const response = await api.get(`/account/${decodedToken.id}`);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="w-full h-[200px] px-1.5 py-2 flex flex-col justify-center items-start gap-1.5 rounded-sm bg-black text-white">
                <h1 className="text-3xl">Hi, User</h1>
                <h2 className="text-2xl">Today, {today}</h2>
                <button  onClick={getDetails} className="text-sm capitalize py-1.5 px-3 rounded-sm bg-white text-black">refresh token</button>
            </div>
        </>
    )
}