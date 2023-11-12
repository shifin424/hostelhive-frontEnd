import React from 'react';
import { useSelector } from 'react-redux';

function HostelDetails() {
  const hostelOverView = useSelector(state => state?.hostelView?.hostelData);

  return (
    <div className="min-h-screen p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h1 className="text-3xl text-[#002D7A] font-bold font-popins mb-4">Hostel Overview</h1>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img
              src={hostelOverView?.hostelImage?.url}
              alt="Hostel"
              className="w-full h-auto rounded-md object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 sm:mx-16">
            <h2 className="text-2xl text-[#002D7A] font-bold mb-2">Hostel Name: {hostelOverView?.hostelName}</h2>
            <div className="flex flex-col sm:flex-row mb-2">
              <p className="text-[#002D7A] font-semibold mb-2 sm:mb-0">Hostel Owner Name</p>
              <p className="text-[#4B76C2] font-semibold">: {hostelOverView?.adminData?.fullName}</p>
            </div>
            <div className="flex flex-col sm:flex-row mb-2">
              <p className="text-[#002D7A] font-semibold mb-2 sm:mb-0">Hostel Owner Number</p>
              <p className="text-[#4B76C2] font-semibold">: {hostelOverView?.adminData?.mobile}</p>
            </div>
            <div className="flex flex-col sm:flex-row mb-2">
              <p className="text-[#002D7A] font-semibold mb-2 sm:mb-0">Hostel Owner Email</p>
              <p className="text-[#4B76C2] font-semibold">: {hostelOverView?.adminData?.email}</p>
            </div>
            <div className="flex flex-col sm:flex-row mb-2">
              <p className="text-[#002D7A] font-semibold mb-2 sm:mb-0">Hostel Location</p>
              <p className="text-[#4B76C2] font-semibold">: {hostelOverView?.location}</p>
            </div>
            <div className="flex flex-col sm:flex-row mb-2">
              <p className="text-[#002D7A] font-semibold mb-2 sm:mb-0">Hostel Admission Fee</p>
              <p className="text-[#4B76C2] font-semibold">: {hostelOverView?.admissionFees}</p>
            </div>
            <div className="flex flex-col sm:flex-row mb-2">
              <p className="text-[#002D7A] font-semibold mb-2 sm:mb-0">Hostel Type</p>
              <p className="text-[#4B76C2] font-semibold">: {hostelOverView?.hostelType}</p>
            </div>
            <div className="flex flex-col sm:flex-row mb-2">
              <p className="text-[#002D7A] font-semibold mb-2 sm:mb-0">Hostel Fee</p>
              <p className="text-[#4B76C2] font-semibold">: {hostelOverView?.admissionFees}</p>
            </div>
          </div>
        </div>


        <div className="mt-4">
          <h3 className="text-lg font-bold text-[#002D7A] mb-2">Description</h3>
          <div className="bg-gray-200 p-4 rounded-md overflow-auto">
            <p className="text-lg text-black">{hostelOverView?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostelDetails;
