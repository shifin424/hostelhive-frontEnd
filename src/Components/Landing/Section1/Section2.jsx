import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { hostelInfoApi } from '../../../Services/LandingService';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hostelView } from '../../../Redux/Features/student/hostelSlice';

function Section2() {
  const [details, setDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationEntered, setLocationEntered] = useState(true);
  console.log(locationEntered); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHostelInfo = async () => {
      try {
        const response = await hostelInfoApi();
        if (response && response.data && Array.isArray(response.data)) {
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

  const viewHostelData = async (id) => {
    try {
      await dispatch(hostelView(id));
      navigate('/over-view');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setLocationEntered(true); // Reset the location entered state when searching again
  };

  const filteredHostels = details.filter((hostel) =>
    hostel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setLocationEntered(filteredHostels.length > 0);
  }, [filteredHostels]);

  return (
    <div className="bg-white w-full min-h-screen">
      <div className="bg-white text-[#002D7A] p-8 font-bold text-3xl">Hostels with Rooms Available</div>
      <div className="bg-white flex justify-center w-full mt-5 px-10">
        <input
          type="text"
          placeholder="    Search by location ..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-96 p-2 border bg-white  text-black h-14 border-[#002D7A] rounded-full"
        />
      </div>
      <div className="bg-white w-full mt-5 px-10 flex flex-wrap">
        {filteredHostels.length > 0 ? (
          filteredHostels.map((hostel) => (
            <div
              key={hostel._id}
              className="card w-[19rem] h-[25rem] bg-base-100 rounded-lg shadow-2xl m-5 transform hover:scale-105 transition duration-300"
            >
              <figure>
                <img src={hostel.hostelImage.url} alt="Card" className="w-full h-60 object-cover" />
              </figure>
              <div className="card-body bg-white rounded-b-lg p-3 flex flex-col justify-between">
                <div>
                  <h2 className="card-title text-xl font-popins text-[#002D7A]">{hostel.hostelName}</h2>
                  <div className="flex items-center">
                    <AiFillStar className="text-yellow-500" />
                    <p className="rounded-lg px-2 py-1 text-gray-600 font-sans">4.5 rating</p>
                  </div>
                  <div className="flex items-center">
                    <p className="rounded-lg text-green-500">Rooms Available: 24</p>
                  </div>
                </div>
                <div className="card-actions justify-center flex items-center">
                  <Link onClick={() => viewHostelData(hostel._id)} className="mr-1 font-bold text-[#002D7A]">
                    Book Rooms
                  </Link>
                  <MdOutlineDoubleArrow className="text-[#002D7A]" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-[#002D7A]  flex items-center mt-10">
            <h1 className='font-semibold'>No hostels available for your enterd location</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Section2;
