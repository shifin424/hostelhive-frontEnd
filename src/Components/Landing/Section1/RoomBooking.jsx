import React from 'react';
import { useSelector } from 'react-redux';
import { FaRegUser } from 'react-icons/fa';
import { IoBedOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { Navigate } from 'react-router-dom';

function RoomBooking() {
    const roomDetails = useSelector(state => state.roomsDetils.roomDetails);
    console.log(roomDetails.StudentData);
   const  navigate = useNavigate()
    const token = localStorage.getItem('StudentToken');
 

    const handleBookNow = () => {
        if (token) {
            roomDetails.StudentData.isRequested === false
                ? navigate('/dummy-page') 
                : !roomDetails.StudentData.isVerified
                    ? message.info('Request is still processing') 
                    : message.success('Entering to payment page');
        } else {
            navigate('/login');
        }
    };
    

    return (
        <>
            <div className="bg-white w-full h-44 pt-14">
                <h1 className="ml-10 text-3xl text-[#002D7A] font-bold font-popins">
                    Room Details
                </h1>
            </div>
            <div className="bg-white pb-10">
                {roomDetails.roomData.map((room, index) => (
                    <li
                        key={index}
                        className="flex flex-col px-2 rounded-md shadow-2xl md:mx-16 lg:flex-row lg:mx-20 xl:mx-32 mt-5 mb-20"
                    >
                        <div className="overflow-hidden rounded-md lg:w-2/6">
                            <img className="w-full h-full" src={room.url} alt="room"></img>
                        </div>
                        <div className="p-5 grid lg:grid-cols-2 w-full">
                            <div className="grid gap-4">
                                <div className="text-2xl font-bold text-[#002D7A]">
                                    {room.title}
                                </div>
                                <div className="flex-wrap  text-gray-600 text-xl">
                                    {room.description}
                                </div>
                                <div className="flex flex-wrap items-center text-gray-900 text-xl gap-6 sm:gap-6">
                                    <div className="flex gap-2 items-center">
                                        <div>
                                            <FaRegUser />
                                        </div>
                                        <div>{room.occupants} Sleep</div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div>
                                            <IoBedOutline size={25} />
                                        </div>
                                        <div>{room.capacity}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-6 py-5 lg:py-0 lg:flex lg:flex-col lg:items-end lg:justify-between">
                                <div className="">
                                    <div className="text-3xl font-bold inline-block lg:text-4xl text-gray-800 lg:font-extrabold">
                                        ₹{room.rent}
                                    </div>
                                    <span className="px-1 text-gray-600 text-lg">/month</span>
                                </div>
                                <button
                                    className="text-white bg-blue-800 py-3 px-5 rounded-lg text-xl font-bold w-full sm:w-40 transform hover:scale-110 transition duration-300"
                                    onClick={handleBookNow}
                                >
                                    Book Now
                                </button>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <p className="text-green-500 font-bold">Available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </div>
        </>
    );
}

export default RoomBooking;
