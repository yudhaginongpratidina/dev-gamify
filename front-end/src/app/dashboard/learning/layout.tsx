import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Learning',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}