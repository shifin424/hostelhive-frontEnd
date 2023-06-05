import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { hostelInfoApi } from '../../../Services/LandingService';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

function Section2() {
    const [details, setDetails] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchHostelInfo = async () => {
            try {
                const response = await hostelInfoApi();
                if (response && response.data && Array.isArray(response.data)) {
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
        <div className="bg-white w-full min-h-screen">
            <div className="bg-white text-[#002D7A] p-8 font-bold text-3xl">
                Hostels with Rooms Available
            </div>
            <div className="bg-white w-full mt-5 px-10 flex flex-wrap">
                {details.map((hostel) => (
                    <div
                        key={hostel._id}
                        className="card w-[19rem] h-[25rem] bg-base-100 rounded-lg shadow-2xl m-5"
                    >
                        <figure>
                            <img src={hostel.hostelImage.url} alt="Card" className="w-full h-60 object-cover" />
                        </figure>
                        <div className="card-body bg-white rounded-b-lg p-3 flex flex-col justify-between">
                            <div>
                                <h2 className="card-title text-xl font-popins text-[#002D7A]">
                                    {hostel.hostelName}
                                </h2>
                                <div className="flex items-center ">
                                    <AiFillStar className="text-yellow-500" />
                                    <p className="rounded-lg px-2 py-1 text-gray-600 font-sans">4.5 rating</p>
                                </div>
                                <div className="flex items-center ">
                                    <p className="rounded-lg text-green-500">Rooms Available: 24</p>
                                </div>
                            </div>
                            <div className="card-actions justify-center  flex items-center">
                                <Link to={"/hostel-details/over-view"} className="mr-1 font-bold text-[#002D7A]">Book Rooms</Link>
                                <MdOutlineDoubleArrow className="text-[#002D7A]" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Section2;
