"use client";
import { useState, useEffect } from "react";
import { decodeStorageAuthenticated } from "@/utils/secure-storage-authenticated";

export default function AccessPermissionByRole({ roles, children }: { roles: string[], children: React.ReactNode }) {

    const [userRole, setUserRole] = useState<string>("");

    const getDecodedStorageAuthenticated = async () => {
        const storageAuthenticated = await decodeStorageAuthenticated();
        setUserRole(storageAuthenticated.role);
    };

    useEffect(() => {
        getDecodedStorageAuthenticated();
    }, []);

    return (
        <>
            {roles.includes(userRole) && children}
            {!roles.includes(userRole) && (
                <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                    <div className="bg-white shadow-md rounded-lg p-6 max-w-md text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 text-red-500 mx-auto mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                            />
                        </svg>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            Access Denied
                        </h1>
                        <p className="text-gray-600 mb-4">
                            You do not have permission to access this page.
                        </p>
                        <button
                            onClick={() => window.history.back()}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}