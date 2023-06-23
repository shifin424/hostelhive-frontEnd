import React, { useEffect, useState } from 'react';
import { FetchRequestData } from '../../Services/hostelAdmin';
import { useSelector } from 'react-redux';

function StudentRequests() {
  const {hostels} = useSelector(state => state.adminHostelData)
  console.log(hostels,"hostel datas");
  const hostelId = hostels[0]._id
  console.log(hostelId,"here hostel id");

  const [Requests,setRequests] = useState([])
  

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const headers = {
          Authorization: JSON.parse(localStorage.getItem("HostelAdminToken")).token
        };
        const response = await FetchRequestData(headers);
        if (response) {
          console.log(response.data);
          setRequests(response.data);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestData();
  }, []);


  return (
    // <div>
    //   <div className="flex justify-center">
    //     <div className="w-4/5 mt-16">
    //       <h1 className="text-3xl font-bold text-[#002D7A] mb-4">Student Requests</h1>
    //       <div className="overflow-x-auto">


    //         <table className="w-full bg-white rounded-lg overflow-hidden ">
    //           <thead className="bg-[#4874BF]">
    //             <tr >
    //               <th className="p-3 text-white text-sm font-bold tracking-wide text-left">NO</th>
    //               <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Student Name</th>
    //               <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Email</th>
    //               <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Status</th>
    //               <th className="p-3 text-white text-sm font-bold tracking-wide text-left">View</th>
    //               <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Approve</th>
    //               <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Reject</th>
    //               {/* <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Status</th>
    //               <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Image</th>
    //               <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Action</th> */}
    //             </tr>
    //           </thead>
    //           <tbody>
    //             <tr className='bg-gray-200' >
    //               <td className="p-3 text-gray-500 font-semibold">1</td>
    //               <td className="p-3 text-gray-500 font-semibold">muhammed shifin</td>
    //               <td className="p-3 text-gray-500 font-semibold">shifin@gmail.com</td>
    //               <td className="p-3 text-gray-500 font-semibold">Pending</td>
    //               <td className="p-3 font-semibold">
    //                 <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View</button>
    //               </td>
    //               <td>
    //                 <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Approve</button>
    //               </td>
    //               <td>
    //                 <button className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reject</button>
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  <div className='container mt-20'>
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg overflow-hidden ">
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
        <tr  className="bg-gray-200">
              <td className="p-3 text-gray-500 font-semibold">1</td>
              <td className="p-3 text-gray-500 font-semibold">comfort hostel</td>
              <td className="p-3 text-gray-500 font-semibold">shifin@gmail.com</td>
              <td className="p-3  font-semibold text-red-600">Pending</td>
              <td className="p-3 font-semibold border-black">
                <button className="btn btn-outline btn-info">
                  View
                </button>
              </td>
              <td className="p-3 flex flex-col sm:flex-row">
                <button className="btn btn-success" >
                  Approve
                </button>
                <button className="btn btn-error ml-5" >
                  Reject
                </button>
              </td>
            </tr>
        </tbody>
        </table>
        </div>
        </div>
  );
}

export default StudentRequests;
