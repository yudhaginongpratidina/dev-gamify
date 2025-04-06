import { Metadata } from "next"
import AccessPermissionByRole from "@/components/AccessPermissionByRole"

export const metadata: Metadata = {
    title: 'Class',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AccessPermissionByRole roles={["instructor"]}>
            {children}
        </AccessPermissionByRole>
    )
}