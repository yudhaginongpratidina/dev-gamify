export default function Loading() {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center gap-6">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-gray-300 animate-spin"></div>
                </div>
                <p className="text-gray-600 text-lg font-medium animate-pulse">
                    Loading, please wait...
                </p>
                <div className="flex gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                </div>
            </div>
        </div>
    );
}