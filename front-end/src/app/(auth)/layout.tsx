export default function Layout({ children }: { children: React.ReactNode }){
    return (
        <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="w-full h-full p-4 flex flex-col justify-center items-center bg-white">
                { children }
            </div>
            <div className="hidden lg:block w-full h-full bg-black"/>
        </div>
    )
}