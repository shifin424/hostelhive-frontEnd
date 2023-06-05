import React, { useEffect, useState } from 'react';
import { hostelSingleViewApi } from '../../../Services/LandingService';

function HostelDetails() {
    const [details, setDetails] = useState([]);

    useEffect(() => {
        const fetchHostelInfo = async () => {
            try {
                const response = await hostelSingleViewApi();
                if (response) {
                    console.log(response.data);
                    setDetails(response.data);
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchHostelInfo();
    }, []);

    return (
        <div>
            <div className="bg-white w-full h-44 pt-28">
                <h1 className="ml-10 text-3xl text-[#002D7A] font-bold font-popins">
                    Hostel OverView
                </h1>
            </div>

            <div className='bg-white flex justify-center pb-10'>
                <div className='flex justify-center mt-10  p-12 w-[80rem] h-[40rem] bg-[#4B76C2] rounded-2xl'>
                    {details.map((item) => (
                        <div
                            key={item._id}
                            className="custom-modal"
                            style={{
                                // display: selectedRequestId === item._id ? 'block' : 'none',
                                width: '1000px',
                            }}
                        >
                            <div className="flex text-center">
                                <div className="w-1/2">
                                    <img
                                        src={item.hostelImage.url}
                                        alt="Hostel"
                                        className="w-full h-full rounded-md object-cover custom-image"
                                    />
                                </div>
                                <div className="w-1/2 p-4">
                                    <h2 className="text-2xl text-[#002D7A] font-bold mb-2">
                                        Hostel Name: {item.hostelName}
                                    </h2>
                                    <br />
                                    <p className="text-lg text-white mb-2 font-semibold">
                                        Hostel Owner Name: {item.adminData.fullName}
                                    </p>
                                    <p className="text-lg text-white font-semibold">
                                        Hostel Owner Number: {item.adminData.mobile}
                                    </p>
                                    <p className="text-lg text-white font-semibold">
                                        Hostel Owner Email: {item.adminData.email}
                                    </p>
                                    <p className="text-lg text-white mb-2 font-semibold">
                                        Hostel Location: {item.location}
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
                                    <p className="text-lg text-black">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HostelDetails;
