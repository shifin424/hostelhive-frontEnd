import React from 'react'


function Request() {
  return (
    
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-[#4874BF] ">
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
          <tr className='bg-gray-200  '>
            <td className="p-3 text-gray-500 font-semibold">1</td>
            <td className="p-3 text-gray-500 font-semibold">Comfort Hostel</td>
            <td className="p-3 text-gray-500 font-semibold">username@gmail.com</td>
            <td className="p-3 text-gray-500 font-semibold">Pending</td>
            <td className="p-3 font-semibold">Info</td>
            <td className="p-3 flex flex-col sm:flex-row">
              <button className="py-2 px-4 mb-2 sm:mb-0 sm:mr-2
               bg-green-400 text-white font-bold rounded-md
                border border-green-600 hover:bg-green-600
                 hover:border-green-700">
                Approve
              </button>
              <button className="py-2 px-4 bg-red-500 text-white
               font-bold rounded-md border border-red-600
                hover:bg-red-600 hover:border-red-700">
                Reject
              </button>
            </td>
          </tr>
          <tr className='bg-white '>
            <td className="p-3 text-gray-500 font-semibold">1</td>
            <td className="p-3 text-gray-500 font-semibold">Comfort Hostel</td>
            <td className="p-3 text-gray-500 font-semibold">username@gmail.com</td>
            <td className="p-3 text-gray-500 font-semibold">Pending</td>
            <td className="p-3 font-semibold">Info</td>
            <td className="p-3 flex flex-col sm:flex-row">
              <button className="py-2 px-4 mb-2 sm:mb-0 sm:mr-2
               bg-green-400 text-white font-bold rounded-md
                border border-green-600 hover:bg-green-600
                 hover:border-green-700">
                Approve
              </button>
              <button className="py-2 px-4 bg-red-500 text-white
               font-bold rounded-md border border-red-600
                hover:bg-red-600 hover:border-red-700">
                Reject
              </button>
            </td>
          </tr>
          <tr className='bg-gray-200  '>
            <td className="p-3 text-gray-500 font-semibold">1</td>
            <td className="p-3 text-gray-500 font-semibold">Comfort Hostel</td>
            <td className="p-3 text-gray-500 font-semibold">username@gmail.com</td>
            <td className="p-3 text-gray-500 font-semibold">Pending</td>
            <td className="p-3 font-semibold">Info</td>
            <td className="p-3 flex flex-col sm:flex-row">
              <button className="py-2 px-4 mb-2 sm:mb-0 sm:mr-2
               bg-green-400 text-white font-bold rounded-md
                border border-green-600 hover:bg-green-600
                 hover:border-green-700">
                Approve
              </button>
              <button className="py-2 px-4 bg-red-500 text-white
               font-bold rounded-md border border-red-600
                hover:bg-red-600 hover:border-red-700">
                Reject
              </button>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  )
}

export default Request
