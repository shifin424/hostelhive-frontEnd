import React from 'react'

function HostelManagement() {
    return (
        <>
            <h1 className='text-[#002D7A] text-2xl font-bold '>Hostel Managment</h1>

            <div>
                <table className="w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-[#4874BF]">
                        <tr>
                            <th className="p-3 text-white text-sm font-bold tracking-wide text-left">NO</th>
                            <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Hostel Name</th>
                            <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Email</th>
                            <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Status</th>
                            <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Details</th>
                            <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-200">
                            <td className="p-3 text-gray-500 font-semibold">1</td>
                            <td className="p-3 text-gray-500 font-semibold">Comfort hostel</td>
                            <td className="p-3 text-gray-500 font-semibold">derick@gmail.com</td>
                            <td className="p-3  font-semibold text-red-600">Active</td>
                            <td className="p-3 font-semibold border-black">
                                <button className="btn btn-outline btn-info">
                                    View
                                </button>
                            </td>
                            <td className="p-3 flex flex-col sm:flex-row">
                                <button className="btn btn-success">
                                    Approve
                                </button>
                                <button className="btn btn-error ml-5">
                                    Reject
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default HostelManagement
