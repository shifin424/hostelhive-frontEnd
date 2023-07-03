import React, { useEffect, useState } from 'react';
import { hostelBlockingApi, hostelStatusApi, hostelUnlockApi } from '../../Services/superAdmin';
import { toast } from 'react-toastify';

function HostelManagement() {
    const [hostelData, setHostelData] = useState([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchHostelData = async () => {
            try {
                const headers = {
                    Authorization: localStorage.getItem('adminToken'),
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

    const BlockHostel = async (id) => {
        try {
            const headers = {
                Authorization: localStorage.getItem('adminToken'),
            };
            await hostelBlockingApi(id, headers);
            toast.success('Hostel Blocked Successfully');
            setStatus(!status);
        } catch (error) {
            console.log(error);
        }
    };

    const UnlockHostel = async (id) => {
        try {
            const headers = {
                Authorization: localStorage.getItem('adminToken'),
            };
            await hostelUnlockApi(id, headers);
            toast.success('Hostel Unlocked Successfully');
            setStatus(!status);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleBlockStatus = async (index) => {
        const updatedHostelData = [...hostelData];
        const hostelId = updatedHostelData[index]._id; 

        if (updatedHostelData[index].isBlocked) {
            await UnlockHostel(hostelId);
        } else {
            await BlockHostel(hostelId);
        }

        updatedHostelData[index].isBlocked = !updatedHostelData[index].isBlocked;
        setHostelData(updatedHostelData);
    };

    return (
        <>
            <h1 className='text-[#002D7A] text-2xl font-bold'>Hostel Management</h1>

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
                                    <td className={`p-3 font-semibold ${data.isBlocked ? 'text-red-500' : 'text-green-500'}`}>
                                        {data.isBlocked ? 'Blocked' : 'Active'}
                                    </td>
                                    <td className='p-3 flex flex-col sm:flex-row'>
                                        <button
                                            className={`btn ${data.isBlocked ? 'btn btn-success' : '  bg-orange-500 text-black hover:bg-orange-400'} `}
                                            onClick={() => toggleBlockStatus(index)}
                                        >
                                            {data.isBlocked ? 'Unlock' : 'Block'}
                                        </button>
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
