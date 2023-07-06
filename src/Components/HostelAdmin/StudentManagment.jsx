import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StudentDataApi, studentBlockingApi, studentDeleteApi, studentUnBlockingApi } from '../../Services/hostelAdmin';
import { toast } from 'react-toastify';
import { message } from 'antd';
import swal from 'sweetalert';

function StudentManagement() {
    const [studentData, setStudentData] = useState([]);
    const [status, setStatus] = useState('');
    const hostelId = useSelector(state => state?.adminHostelData?.hostelId);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const headers = {
                    Authorization: JSON.parse(localStorage.getItem('HostelAdminToken')).token,
                };

                const response = await StudentDataApi(headers, hostelId);
                if (response) {
                    console.log(response);
                    setStudentData(response.data.hostelData);
                } else {
                    console.log(response);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchStudentData();
    }, []);

    const BlockStudent = async (id) => {
        try {
            const headers = {
                Authorization: JSON.parse(localStorage.getItem('HostelAdminToken')).token,
            };
            await studentBlockingApi(headers, id);
            message.success('Blocked Student Successfully');
            setStatus(!status);
        } catch (error) {
            console.log(error);
        }
    };

    const unBlockStudent = async (id) => {
        try {
            const headers = {
                Authorization: JSON.parse(localStorage.getItem('HostelAdminToken')).token,
            };
            await studentUnBlockingApi(headers, id);
            message.success('Unblocked Student Successfully');
            setStatus(!status);
        } catch (error) {
            console.log(error);
        }
    };

    const handleBlockToggle = async (id, index) => {
        const updatedStudentData = [...studentData];
        if (updatedStudentData[index].isBlocked) {
            await unBlockStudent(id);
        } else {
            await BlockStudent(id);
        }
        updatedStudentData[index].isBlocked = !updatedStudentData[index].isBlocked;
        setStudentData(updatedStudentData);
    };

    const handleDeleteConfirmation =  (id) => {
        const headers = {
            Authorization: JSON.parse(localStorage.getItem('HostelAdminToken')).token,
        };
        swal({
          title: 'Are you sure you want to delete?',
          icon: 'warning',
          buttons: ['Cancel', 'Yes'],
          dangerMode: true,
        }).then((yes) => {
          if (yes) {
             studentDeleteApi(headers,id).then(()=>{
                message.success("Deleted Successfully")
             })
          }
        });
      };

    return (
        <>
            <h1 className='text-[#002D7A] text-2xl font-bold'>Hostel Management</h1>

            <div className='container'>
                <table className='w-full bg-white rounded-lg mt-7 overflow-hidden'>
                    <thead className='bg-[#4874BF] text-white'>
                        <tr>
                            <th className='p-3 text-sm font-bold tracking-wide text-left'>NO</th>
                            <th className='p-3 text-sm font-bold tracking-wide text-left'>Student Name</th>
                            <th className='p-3 text-sm font-bold tracking-wide text-left'>Email</th>
                            <th className='p-3 text-sm font-bold tracking-wide text-left'>Phone</th>
                            <th className='p-3 text-sm font-bold tracking-wide text-left'>Role</th>
                            <th className='p-3 text-sm font-bold tracking-wide text-left'>Status</th>
                            <th className='p-3 text-sm font-bold tracking-wide text-left'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData.map((data, index) => (
                            <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'} key={index}>
                                <td className='p-3 text-gray-500 font-semibold'>{index + 1}</td>
                                <td className='p-3 text-gray-500 font-semibold'>{data?.fullName}</td>
                                <td className='p-3 text-gray-500 font-semibold'>{data?.email}</td>
                                <td className='p-3 text-gray-500 font-semibold'>{data?.phone}</td>
                                <td className='p-3 text-gray-500 font-semibold'>{data?.role}</td>
                                <td className='p-3'>
                                    <span
                                        className={
                                            data?.isBlocked
                                                ? 'bg-red-100 text-red-800 text-xs font-medium mr-2 px-3.5 py-1.5 rounded'
                                                : 'bg-green-100 text-green-800 text-xs font-medium mr-2 px-3.5 py-1.5 rounded'
                                        }
                                    >
                                        {data?.isBlocked ? 'Blocked' : 'Active'}
                                    </span>
                                </td>
                                <td className='p-3 flex flex-col sm:flex-row'>
                                    <button
                                        className={
                                            data?.isBlocked
                                                ? 'bg-green-400 px-5 text-black rounded-md py-2'
                                                : 'bg-orange-400 px-5 text-black rounded-md py-2'
                                        }
                                        onClick={() => handleBlockToggle(data?._id, index)}
                                    >
                                        {data?.isBlocked ? 'Unblock' : 'Block'}
                                    </button>
                                    <button
                                        className='btn btn-error ml-5'
                                        onClick={() => handleDeleteConfirmation(data?._id)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default StudentManagement;
