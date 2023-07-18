import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProfileData } from '../../../Services/studentsServices';

function Profile() {
  const [details, setDetails] = useState('');

  useEffect(() => {
    const headers = {
      Authorization: JSON?.parse(localStorage.getItem('StudentToken'))?.token,
    };

    const ProfileData = async () => {
      try {
        const response = await fetchProfileData(headers);
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
  }, []);

  // Define a default image URL
  const defaultImageUrl = 'https://randomuser.me/api/portraits/men/94.jpg';

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
                    src={details?.studentImage?.url || defaultImageUrl}
                    className="w-32 h-32 bg-[#ffffff] rounded-full mb-4 border border-[#002D74] p-2"
                    alt="Profile"
                  />
                  <h1 className="text-xl font-bold">{details.fullName}</h1>
                  <p className="text-gray-600">{details.email}</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <Link
                      to="/student/edit-profile"
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
                      <label className="text-gray-800 text-xl font-semibold">Full Name</label>
                      <p className="text-gray-900">{details?.fullName}</p>
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Mobile</label>
                      <p className="text-gray-900">{details?.phone}</p>
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Gender</label>
                      <p className="text-gray-900">{details?.gender}</p>
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Date of Birth</label>
                      <p className="text-gray-900">{details?.dateOfBirth}</p>
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Blood Group</label>
                      <p className="text-gray-900">{details?.bloodGroup}</p>
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Hostel Name</label>
                      <p className="text-gray-900">{details?.hostelName}</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Parent Name</label>
                      <p className="text-gray-900">{details?.parentName || 'Not updated'}</p>
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Parent Mobile Number</label>
                      <p className="text-gray-900">{details?.parentNumber || 'Not updated'}</p>
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Room No</label>
                      <p className="text-gray-900">{details.roomNumber}</p>
                    </div>
                    <div className="mb-4">
                      <label className="text-gray-800 text-xl font-semibold">Address</label>
                      <p className="text-gray-900">
                        House Name: {details?.address?.houseName}<br />
                        Landmark: {details?.address?.landMark}<br />
                        Area: {details?.address?.area}<br />
                        City:{details?.address?.city}<br />
                        Country: {details?.address?.country}<br />
                        Pincode: {details?.address?.pincode}
                      </p>
                    </div>
                  </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
