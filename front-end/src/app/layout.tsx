"use client"
import { Poppins } from "next/font/google";
import { Provider } from 'react-redux';
import { store, persistor } from "@/store/index"
import { PersistGate } from 'redux-persist/integration/react'
import "@/styles/global.css";

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className='scroll-smooth'>
            <body className={`${poppins.variable} antialiased select-none`}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        {children}
                    </PersistGate>
                </Provider>
            </body>
        </html>
    );
}