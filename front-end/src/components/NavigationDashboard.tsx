import DarkModeButton from "@/ui/DarkModeButton";
import NotoficationButton from "@/ui/NotificationToogle";

export default function NavigationDashboard() {
    return (
        <nav className="w-full p-4 fixed top-0 left-0 right-0 z-10 flex justify-between items-center bg-white">
            <div className="flex items-center gap-2.5">
                <h1 className="text-lg font-bold">
                    {`${process.env.NEXT_PUBLIC_APP_NAME}`}
                </h1>
            </div>
            <div className="flex items-center gap-2.5">
                <NotoficationButton href="" count={0} />
                <DarkModeButton />
            </div>
        </nav>
    )
}