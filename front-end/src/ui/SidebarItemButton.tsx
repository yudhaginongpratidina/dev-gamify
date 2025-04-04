export default function SidebarItemButton({ icon: Icon, label, onClick }: { icon: React.ElementType; label: string; onClick: () => void }) {
    return (
        <button className="w-full flex justify-between items-center gap-4 p-1.5 py-2.5 rounded-sm hover:bg-gray-100 duration-200" onClick={onClick}>
            <div className="flex items-center gap-4">
                <Icon className="w-6 h-6" />
                <span className="font-semibold">{label}</span>
            </div>
        </button>
    );
}