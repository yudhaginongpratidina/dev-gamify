export default function NavBottomItemLink({ onClick, icon: Icon, label }: { onClick: () => void; icon: React.ElementType; label: string; }) {
    return (
        <button onClick={onClick} className={`p-1.5 px-4 flex flex-col justify-center items-center gap-0.5 rounded-sm hover:bg-black hover:text-white duration-200`}> 
            <Icon className="w-6 h-6" /> 
            <span className="text-xs font-semibold">{label}</span> 
        </button> 
    ); 
}