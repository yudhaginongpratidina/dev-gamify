import { Metadata } from "next"
import AccessPermissionByRole from "@/components/AccessPermissionByRole"

export const metadata: Metadata = {
    title: 'Users',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AccessPermissionByRole roles={["admin"]}>
            {children}
        </AccessPermissionByRole>
    )
}