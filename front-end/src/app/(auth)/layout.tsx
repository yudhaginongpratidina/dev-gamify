"use client";
export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="w-full h-full p-6 grid place-items-center">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
            <div className="hidden lg:block w-full h-full bg-black"></div>
        </main>
    )
}