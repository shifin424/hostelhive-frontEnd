import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import  defaultImageUrl from '../../../assets/images/loginImage.jpg'
import { profileDataApi } from '../../../Services/hostelAdmin';
import { useSelector } from 'react-redux';



function Profile() {
  const [details,setDetails] = useState([])

  const headers = useMemo(() => ({
    Authorization: JSON?.parse(localStorage.getItem("HostelAdminToken"))?.token
    
  }), []);

  const hostelId = useSelector((state) => state?.adminHostelData?.hostelId);

  useEffect(() => {


    const ProfileData = async () => {
      try {
        const response = await profileDataApi(headers,hostelId);
        if (response) {
          console.log(response.data);
          setDetails(response?.data);
        } else {
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    ProfileData();
  }, [headers,hostelId]);
  
  return (
    <>
    <div className="flex justify-between p-3">
        <h1 className="flex text-2xl text-[#002D74] font-bold text-center">Profile</h1>
      </div>


      <div className="bg-[#4B76C2] rounded-md">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={details?.hostelImage || defaultImageUrl}
                    className="w-32 h-32 bg-[#ffffff] rounded-full mb-4 border border-[#002D74] p-2"
                    alt="Profile"
                  />
                  <h1 className="text-xl font-bold">{details.hostelName}</h1>
                  <p className="text-gray-600">{details.email}</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <Link
                      to="/hostel/hostel-listing/edit-profile"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Edit profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">About Me</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Owner Name</label>
                      <p className="text-gray-900">{details?.adminName}</p>
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Owner Mobile</label>
                      <p className="text-gray-900">{details?.adminMobile}</p>
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Owner Email</label>
                      <p className="text-gray-900">{details?.email}</p>
                    </div>


                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Hostel Admission Fee</label>
                      <p className="text-gray-900">{details?.hostelFee}</p>
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Hostel Type</label>
                      <p className="text-gray-900">{details?.hostelType}</p>
                    </div>
                  </div>
                  <div>

                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Hostel Location</label>
                      <p className="text-gray-900">{details?.location}</p>
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Description</label>
                      <p className="text-gray-900">{details.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Profile
