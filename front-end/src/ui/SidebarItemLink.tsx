import Link from "next/link";

export default function SidebarItemLink ({ href, icon: Icon, label, badge, isActive }: { href: string; icon: React.ElementType; label: string; badge?: string; isActive?: boolean }) {
    return (
        <Link href={href} className={`w-full flex justify-between items-center gap-4 p-1.5 py-2.5 rounded-sm hover:bg-gray-100 duration-200 ${isActive ? "bg-gray-100" : ""}`}> 
            <div className="flex items-center gap-4"> 
                <Icon className="w-6 h-6" /> 
                <span className="font-semibold">{label}</span> 
            </div> 
            {badge && <span className="bg-black text-white text-xs font-semibold px-2 py-0.5 rounded-sm">{badge}</span>} 
        </Link> 
    ); 
}