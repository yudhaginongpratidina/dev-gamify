"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import "../utils/disable-console.ts";

import Maintenance from "@/components/Maintenance";

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE === "true";

    return (
        <html lang="en">
            <body className={`${poppins.variable} antialiased select-none`}>
                {isMaintenanceMode ? <Maintenance /> : children}
            </body>
        </html>
    );
}