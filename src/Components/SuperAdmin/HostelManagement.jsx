import React, { useEffect, useState } from 'react';
import { hostelStatusApi } from '../../Services/superAdmin';

function HostelManagement() {
  const [hostelData, setHostelData] = useState([]);

  useEffect(() => {
    const fetchHostelData = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem('adminToken')
        };

        const response = await hostelStatusApi(headers);
        if (response) {
          console.log(response);
          setHostelData(response.data);
        } else {
          console.log(response);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchHostelData();
  }, []);

  return (
    <>
      <h1 className='text-[#002D7A] text-2xl font-bold '>Hostel Managment</h1>

      <div>
        {hostelData.length > 0 ? (
          <table className='w-full bg-white rounded-lg mt-7 overflow-hidden'>
            <thead className='bg-[#4874BF]'>
              <tr>
                <th className='p-3 text-white text-sm font-bold tracking-wide text-left'>NO</th>
                <th className='p-3 text-white text-sm font-bold tracking-wide text-left'>Hostel Name</th>
                <th className='p-3 text-white text-sm font-bold tracking-wide text-left'>Email</th>
                <th className='p-3 text-white text-sm font-bold tracking-wide text-left'>Status</th>
                <th className='p-3 text-white text-sm font-bold tracking-wide text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hostelData.map((data, index) => (
                <tr key={data._id} className='bg-gray-200'>
                  <td className='p-3 text-gray-500 font-semibold'>{index + 1}</td>
                  <td className='p-3 text-gray-500 font-semibold'>{data.hostelName}</td>
                  <td className='p-3 text-gray-500 font-semibold'>{data.adminData.email}</td>
                  <td className='p-3 font-semibold text-green-500'>Active</td>
                  <td className='p-3 flex flex-col sm:flex-row'>
                    <button className='btn bg-orange-500 text-black hover:bg-orange-400'>Block</button>
                    <button className='btn btn-error ml-5'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
}

export default HostelManagement;
