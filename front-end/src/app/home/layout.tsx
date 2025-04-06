import { Metadata } from "next"
import NavigationClient from "@/components/NavigationClient"

export const metadata: Metadata = {
    title: 'Home',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavigationClient />
            { children }
        </>
    )
}