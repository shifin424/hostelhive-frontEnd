import React, { useEffect, useState } from 'react';
import { FetchRequestData, studentApprovalApi } from '../../Services/hostelAdmin';
import { useSelector } from 'react-redux';
import { Button, Modal ,message} from 'antd';

function StudentRequests() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Requests, setRequests] = useState([])
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { hostels } = useSelector(state => state.adminHostelData)
  const hostelId = useSelector(state => state?.adminHostelData.hostelId)

console.log(Requests,"front end request data");
  const showModal = (requestData) => {
    setSelectedRequest(requestData);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const approveHostel = async (id) => {
    try {
      const headers = {
        Authorization: JSON.parse(localStorage.getItem("HostelAdminToken")).token
      };
      await studentApprovalApi(id, headers);
      message.success('Hostel approved successfully');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const headers = {
          Authorization: JSON.parse(localStorage.getItem("HostelAdminToken")).token
        };
        const response = await FetchRequestData(headers, hostelId);
        if (response) {
          console.log(response.data);
          setRequests(response.data.StudentRequestData);
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
    <>

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
  {Requests?.map((request, index) => (
    <tr className="bg-gray-200" key={request._id}>
      <td className="p-3 text-gray-500 font-semibold">{index + 1}</td>
      <td className="p-3 text-gray-500 font-semibold">{/* Populate hostel name */}</td>
      <td className="p-3 text-gray-500 font-semibold">{request?.email}</td>
      <td className="p-3  font-semibold text-red-600"></td>
      <td className="p-3 font-semibold border-black">
        <Button type="primary" className="btn btn-outline text-black" onClick={() => showModal(request)}>
          View
        </Button>
      </td>
      <td className="p-3 flex flex-col sm:flex-row">
        <button className="btn btn-success" onClick={() => approveHostel(request._id)}>Approve</button>
        <button className="btn btn-error ml-5">Reject</button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>
      <Modal title="Student Info" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
  {selectedRequest && (
    <>
      <p className='text-md text-black font-popins'>Full Name : {selectedRequest.fullName}</p>
      <p className='text-md text-black font-popins'>Email : {selectedRequest.email}</p>
      <p className='text-md text-black font-popins'>Gender : {selectedRequest.gender}</p>
      <p className='text-md text-black font-popins'>Phone : {selectedRequest.phone}</p>
      <p className='text-md text-black font-popins'>Address : {selectedRequest.address.houseName}, {selectedRequest.address.area}, {selectedRequest.address.city}, {selectedRequest.address.pincode}</p>
    </>
  )}
</Modal>
    </>
  );
}

export default StudentRequests;
