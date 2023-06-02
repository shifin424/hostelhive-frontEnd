import React, { useEffect, useState } from 'react';
import { hostelRequestApi } from '../../Services/superAdmin';
import { message,Button, Modal } from 'antd';

function Request() {
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const fetchHostelRequests = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem("adminToken")
        };
        const response = await hostelRequestApi(headers);
        if (response) {
          console.log(response.data)
          setRequests(response.data);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchHostelRequests();
  }, []);


  return (
    <div className="overflow-x-auto">
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
          {requests?.map((data, index) => (
            <tr key={data._id} className="bg-gray-200">
              <td className="p-3 text-gray-500 font-semibold">{index + 1}</td>
              <td className="p-3 text-gray-500 font-semibold">{data.hostelName}</td>
              <td className="p-3 text-gray-500 font-semibold">{data.adminData.email}</td>
              <td className="p-3  font-semibold text-red-600">Pending</td>
              <td className="p-3 font-semibold border-black"> <button
                className="btn btn-outline btn-info "
                onClick={() => setOpen(true)}
              >
                View
              </button></td>
              <td className="p-3 flex flex-col sm:flex-row">
                <button className="btn btn-success ">
                  Approve
                </button>
                <button className="btn btn-error ml-5">
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      {requests.map((item) => (
  <Modal
    key={item._id}
    title="Hostel Info"
    centered
    visible={open}
    onOk={() => setOpen(false)}
    onCancel={() => setOpen(false)}
    width={1000}
    className="custom-modal"
  >
    <div className="flex text-center">
      <div className="w-1/2">
        <img src={item.hostelImage.url} alt="Hostel" className="w-full h-full rounded-md object-cover custom-image" />
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-2xl text-[#002D7A] font-bold mb-2">Hostel Name: {item.hostelName}</h2>
        <br />  
        <p className="text-lg mb-2 font-semibold">Hostel Owner Name   : {item.adminData.fullName}</p>
        <p className="text-lg font-semibold">Hostel Owner Number   : {item.adminData.mobile}</p>
        <p className="text-lg font-semibold">Hostel Owner Number   : {item.adminData.email}</p>
        <p className="text-lg mb-2 font-semibold">Hostel Location  : {item.location}</p>
      </div>
    </div>
    <div className="flex flex-col mt-4">
      <h3 className="text-lg font-bold mb-2 text-[#002D7A]  ">Description</h3>
      <div className="bg-gray-200  mt-2 p-4 rounded-md">
        <p className="text-lg">{item.description}</p>
      </div>
    </div>
  </Modal>
))}




    </div>

  );
}

export default Request;
