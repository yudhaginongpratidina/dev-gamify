import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Users',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}