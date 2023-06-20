import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, message } from 'antd';
import { hostelDataApi } from '../../Services/hostelAdmin';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allHostel } from '../../Redux/Features/hostel/hostelSlice';

function AddHostelButton() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { hostels } = useSelector(state => state.hostel)
  useEffect(() => {
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("HostelAdminToken")).token
    };
    dispatch(allHostel(headers))
  }, []);

  const handleNavigate = (status) => {
    if (status === "Pending") {
      message.error("hostel is not approved")
    } else if (status === "Approved") {
      navigate('/hostel/hostel-listing/dashboard')
    }
  }
  return (
    <>
      <div>
        <div className='flex justify-end pt-16 pb-10'>
          <Link to='/hostel/add-hostel'>
            <button className='btn btn-info'>Add Hostel</button>
          </Link>
        </div>

        {hostels?.length < 1 ? (
          <div className="bg-white w-full h-[33rem] flex justify-start flex-col">
            <p className="text-center text-3xl text-black mt-10">Not added any hostels yet.</p>
          </div>


        ) : (
          <div className='flex flex-row flex-wrap justify-center'>
            {hostels?.map((hostel) => (
              <div
                key={hostel._id}
                className="max-w-xs sm:max-w-sm bg-[#2265da] border pb-16  border-gray-200 rounded-lg shadow dark:bg-[#002D7A] dark:border-gray-700 m-2"
              >
                <a href="#">
                  <img
                    className="rounded-t-lg w-full"
                    src={hostel.hostelImage.url}
                    alt=""
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-lg sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {hostel.hostelName}
                    </h5>
                  </a>
                  <p className="mb-3 text-sm sm:text-base font-normal text-white text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                  </p>
                  <div
                    onClick={() => handleNavigate(hostel.isApproved)}
                    className="inline-flex items-center px-3 py-2 text-sm cursor-pointer font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Enter
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );

}

export default AddHostelButton;
