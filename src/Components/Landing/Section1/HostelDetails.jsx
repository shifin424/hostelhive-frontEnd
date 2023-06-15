import React, { useEffect, useState } from 'react';
import { hostelSingleViewApi } from '../../../Services/LandingService';
import { useSelector } from 'react-redux';
import { MdLogin } from 'react-icons/md';

function HostelDetails() {

  const hostelOverView = useSelector(state => state.hostelView.hostelData);



    return (
        
        <div>
  <div className="bg-white w-full h-44 pt-28">
    <h1 className="ml-10 text-3xl text-[#002D7A] font-bold font-popins">Hostel OverView</h1>
  </div>

  <div className='bg-white flex justify-center pb-10'>
    <div className='flex justify-center mt-10 pt-10 w-[70rem] h-[40rem] bg-[#4B76C2] rounded-2xl'>
      
        <div
          className="custom-modal"
          style={{
            width: '1000px',
          }}
        >
          <div className="flex text-center">
            <div className="w-1/2">
              <img
                src={hostelOverView?.hostelImage.url}
                alt="Hostel"
                className="w-full h-full rounded-md object-cover custom-image"
              />
            </div>
            <div className=" w-1/2 p-4">
              <h2 className="text-2xl text-[#002D7A] font-bold mb-2">
                Hostel Name: {hostelOverView?.hostelName}
              </h2>
              <br />
              <p className="text-lg text-white mb-2 font-semibold">
                Hostel Owner Name: {hostelOverView?.adminData?.fullName}
              </p>
              <p className="text-lg text-white font-semibold">
                Hostel Owner Number: {hostelOverView?.adminData?.mobile}
              </p>
              <p className="text-lg text-white font-semibold">
                Hostel Owner Email: {hostelOverView?.adminData?.email}
              </p>
              <p className="text-lg text-white mb-2 font-semibold">
                Hostel Location: {hostelOverView?.location}
              </p>
              <p className="text-lg text-white mb-2 font-semibold">
                Hostel Admission Fee: 1000
              </p>
              <p className="text-lg text-white mb-2 font-semibold">
                Hostel Fee : 6000
              </p>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="text-lg font-bold mb-2 text-[#002D7A]">Description</h3>
            <div className="bg-gray-200 mt-2 p-4 rounded-md overflow-auto">
              <p className="text-lg text-black">{hostelOverView?.description}</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>
    )
}

export default HostelDetails;
