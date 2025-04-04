import NavigationDashboard from "@/components/NavigationDashboard";
import SidebarDashboard from "@/components/SidebarDashboard";
import NavBottomDashboard from "@/components/NavBottomDashboard";
import FooterDashboard from "@/components/FooterDashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="select-none">
            <NavigationDashboard />
            <div className="w-full min-h-screen px-4 flex items-center gap-4 bg-gray-100">
                <SidebarDashboard/>
                <div className="h-[84vh] w-full p-2.5 flex flex-col gap-4">{children}</div>
            </div>
            <NavBottomDashboard />
            <FooterDashboard />
        </div>
    )
}