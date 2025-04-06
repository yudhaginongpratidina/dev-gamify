import { IoAddCircle } from "react-icons/io5";

export default function ListClass({modalCreate}: {modalCreate: () => void}) {
    return (
        <>
            {/* Page title */}
            <div className="w-full flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold capitalize">List Class</h1>
                    <p>This is class management</p>
                </div>
                <button onClick={modalCreate} className="py-2 px-4 rounded-sm flex items-center gap-2 bg-black text-white hover:bg-gray-800 transition ease-in-out duration-200">
                    <IoAddCircle className="w-5 h-5"/>
                    <span>Create</span>
                </button>
            </div>
            <div className="w-full p-4 max-h-[84vh] flex flex-col gap-4 bg-white">
                <div className="w-full h-full overflow-auto">
                    <table className="w-full">
                        <thead className="w-full sticky top-0 bg-black text-white z-10">
                            <tr className="w-full">
                                <td className="min-w-[80px] max-w-[80px] p-2 border border-gray-300 text-center">No</td>
                                <td className="w-fit p-2 border border-gray-300 text-start">Author</td>
                                <td className="w-fit p-2 border border-gray-300 text-start">Title</td>
                                <td className="w-fit p-2 border border-gray-300 text-start">Level</td>
                                <td className="w-fit p-2 border border-gray-300 text-start">Point Unlock</td>
                                <td className="w-fit p-2 border border-gray-300 text-center">Action</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </>
    )
}