export default function FooterDashboard() {
    return (
        <footer className="hidden lg:block w-full h-14 p-4 fixed bottom-0 left-0 right-0 z-10 text-center bg-white">
            <span className="font-semibold text-gray-600">{new Date().getFullYear()} | Version 1.0</span>
        </footer>
    )
}