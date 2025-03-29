"use client"
import secureLocalStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";

export const setStorageAuthenticated = async (value: any) => {
    secureLocalStorage.setItem("access_token", value)
}

export const getStorageAuthenticated = async () => {
    return secureLocalStorage.getItem("access_token")
}

export const removeStorageAuthenticated = async () => {
    secureLocalStorage.removeItem("access_token")
}

export const decodeStorageAuthenticated = async () => {
    const token: any = secureLocalStorage.getItem("access_token");
    const decoded: any = await jwtDecode(token);
    return decoded;
}