import React, { useEffect, useState } from 'react';
import { FetchRequestData, StudentRejectedApi, studentApprovalApi } from '../../../Services/hostelAdmin';
import { useSelector } from 'react-redux';
import { Button, Modal, message } from 'antd';
import './Request.css'

function StudentRequests() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectDescription, setRejectDescription] = useState('');

  const { hostels } = useSelector(state => state?.adminHostelData);
  const hostelId = useSelector(state => state?.adminHostelData.hostelId);

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

  const handleRejectSubmit = () => {
    rejectHostel();
    setRejectModalVisible(false);
    setRejectDescription('');
  };

  const handleRejectCancel = () => {
    setRejectModalVisible(false);
    setRejectDescription('');
  };

  const handleRejectButton = (requestId) => {
    setSelectedRequestId(requestId);
    setRejectModalVisible(true);
  };
  
  const handleRejectDescriptionChange = (event) => {
    setRejectDescription(event.target.value);
  };

  const rejectHostel = async () => {
    try {
      const headers = {
        Authorization: JSON.parse(localStorage.getItem('HostelAdminToken')).token
      };
      await StudentRejectedApi(selectedRequestId, headers, rejectDescription);
      message.success('Hostel rejected successfully');
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
      <div className="container">
        <div>
          <h1 className='pb-5 text-[#002D7A] font-bold text-2xl'>Student Request</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden">
            {requests.length > 0 && (
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
            )}
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-3 text-gray-500 text-2xl font-bold text-center">
                    No requests available
                  </td>
                </tr>
              ) : (
                requests.map((request, index) => (
                  <tr className="bg-gray-200" key={request._id}>
                    <td className="p-3 text-gray-500 font-semibold">{index + 1}</td>
                    <td className="p-3 text-gray-500 font-semibold">{request?.hostelId?.hostelName}</td>
                    <td className="p-3 text-gray-500 font-semibold">{request?.email}</td>
                    <td className="p-3 font-semibold text-red-600">Pending</td>
                    <td className="p-3 font-semibold border-black">
                      <Button type="primary" className="btn btn-outline text-black" onClick={() => showModal(request)}>
                        View
                      </Button>
                    </td>
                    <td className="p-3 flex flex-col sm:flex-row">
                      <button className="btn btn-success" onClick={() => approveHostel(request._id)}>Approve</button>
                      <button className="btn btn-error ml-5" onClick={() => handleRejectButton(request._id)}>Reject</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal title="Student Info" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {selectedRequest && (
          <>
            <p className="text-md text-black font-popins">Full Name: {selectedRequest.fullName}</p>
            <p className="text-md text-black font-popins">Email: {selectedRequest.email}</p>
            <p className="text-md text-black font-popins">Gender: {selectedRequest.gender}</p>
            <p className="text-md text-black font-popins">Phone: {selectedRequest.phone}</p>
            <p className="text-md text-black font-popins">Address: {selectedRequest.address.houseName},
              {selectedRequest.address.area}, {selectedRequest.address.city},
              {selectedRequest.address.pincode}</p>
          </>
        )}
      </Modal>

      <Modal
        title="Reject Hostel"
        visible={rejectModalVisible}
        onOk={handleRejectSubmit}
        onCancel={handleRejectCancel}
        className="custom-modal"
      >
        <p className="mb-2 text-slate-600">Description</p>
        <textarea
          className="w-full h-40 border border-gray-700 rounded-lg p-2 bg-white"
          name="reject-reason"
          placeholder="Enter the reason for rejection..."
          value={rejectDescription}
          onChange={handleRejectDescriptionChange}
        />
      </Modal>
    </>
  );
}

export default StudentRequests;
