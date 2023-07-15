import React, { useEffect, useState } from 'react';
import image from '../../../assets/images/student-profile.jpg';
import { Link } from 'react-router-dom';
import { fetchProfileData } from '../../../Services/studentsServices';

function EditProfile() {
  const [details,setDetails] = useState('')
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [mobile, setMobile] = useState('123-456-7890');
  const [gender, setGender] = useState('Male');
  const [dateOfBirth, setDateOfBirth] = useState('January 1, 1990');
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [hostelName, setHostelName] = useState('XYZ Hostel');


  

  useEffect(() => {
    const headers = {
        Authorization: JSON?.parse(localStorage.getItem("StudentToken"))?.token
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', {
      fullName,
      email,
      mobile,
      gender,
      dateOfBirth,
      bloodGroup,
      hostelName,
    });
  };

  return (
    <>
      <div className="flex justify-between p-3">
        <h1 className="flex text-2xl text-[#002D74] font-bold text-center">Edit Profile</h1>
      </div>
      <div className="bg-[#4B76C2] rounded-md">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                <img src="https://randomuser.me/api/portraits/men/94.jpg" class="w-32 h-32 bg-[#ffffff] rounded-full mb-4 border border-[#002D74] p-2" alt="Profile" />
                  <h1 className="text-xl font-bold">{fullName}</h1>
                  <p className="text-gray-600">Software Developer</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <Link  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Change image</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">About Me</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <label className="text-gray-600">Full Name</label>
                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="border border-gray-300 text-gray-500 bg-gray-100 px-3 py-2 rounded w-full" />
                      </div>
                      <div className="mb-4">
                        <label className="text-gray-600">Email</label>
                        <input type="email" value={email} disabled onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 text-gray-500 px-3 py-2 bg-gray-100 rounded w-full" />
                      </div>
                      <div className="mb-4">
                        <label className="text-gray-600">Mobile</label>
                        <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="border border-gray-300 text-gray-500 px-3 py-2 bg-gray-100 rounded w-full" />
                      </div>
                      <div className="mb-4">
                        <label className="text-gray-600">Gender</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} className="border border-gray-300 text-gray-500 px-3 py-2 bg-gray-100 rounded w-full">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="text-gray-600">Date of Birth</label>
                        <input type="text" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="border border-gray-300 text-gray-500 bg-gray-100 px-3 py-2 rounded w-full" />
                      </div>
                      <div className="mb-4">
                        <label className="text-gray-600">Blood Group</label>
                        <input type="text" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="border border-gray-300 text-gray-500 bg-gray-100 px-3 py-2 rounded w-full" />
                      </div>
                      <div className="mb-4">
                        <label className="text-gray-600">Hostel Name</label>
                        <input type="text" value={hostelName} onChange={(e) => setHostelName(e.target.value)} className="border border-gray-300 text-gray-500 bg-gray-100 px-3 py-2 rounded w-full" />
                      </div>
                    </div>
                    <div>
                      <div className="mb-4">
                        <label className="text-gray-600">Parent Name</label>
                        <input type="text" value="Jane Doe"  className="border border-gray-300 text-gray-500 px-3 py-2 rounded w-full bg-gray-100" />
                      </div>
                      <div className="mb-4">
                        <label className="text-gray-600">Parent Mobile Number</label>
                        <input type="text" value="987-654-3210"  className="border border-gray-300 text-gray-500 px-3 py-2 rounded w-full bg-gray-100" />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
