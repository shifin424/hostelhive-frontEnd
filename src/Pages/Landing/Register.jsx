import React from 'react'
import Navbar from '../../Components/Landing/NavBar/Navbar'
// import Profile from '../../Components/HostelAdmin/Profile'

function Register() {
  return (

    <div className="bg-white w-full h-full pb-48">
      <Navbar />
      <div>
        <h1 className="text-[#002D7A] font-bold text-4xl mt-20 ml-6 sm:ml-24 ">Provide your Details</h1>
      </div>
      <div className="bg-[#4B76C2] w-11/12 mx-auto mt-10 rounded-lg sm:w-96 lg:w-[80rem] lg:h-[60rem] pt-10">
        <div className="grid grid-cols-1 gap-4 p-8 items-start md:grid-cols-2 lg:grid-cols-2 bg-red-400">
          <div className="flex flex-col items-start">
            <label className="text-white font-semibold mb-2">Full Name</label>
            <input type="text" className="bg-white w-10/12 h-12 p-4  rounded-md" placeholder="Enter your full name" />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-white font-semibold mb-2">Email</label>
            <input type="text" className="bg-white w-10/12 h-12 p-4 rounded-md" placeholder="Enter your email" />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-white font-semibold mb-2">Password</label>
            <input type="text" className="bg-white w-10/12 h-12 p-4 rounded-md" placeholder="Enter your Password" />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-white font-semibold mb-2 ">Confirm Password</label>
            <input type="text" className="bg-white w-10/12 h-12 p-4 rounded-md" placeholder="Confirm your Password" />
          </div>
          <div className="flex flex-col items-">
            <label className="text-white font-semibold mb-2">Mobile Number</label>
            <input type="text" className="bg-white w-10/12 h-12 p-4 rounded-md" placeholder="Enter your Mobile Number" />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-white font-semibold mb-2">Gender</label>
            <select className="bg-white w-10/12 h-12 p-4 rounded-md">
              <option value="">Select your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex flex-col items-start">
            <label className="text-white font-semibold mb-2">Qualificaion</label>
            <input type="text" className="bg-white w-10/12 h-12 p-4 rounded-md" placeholder="Enter your Qualificaion" />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-white font-semibold mb-2 ">Area</label>
            <input type="text" className="bg-white w-10/12 h-12 p-4 rounded-md" placeholder="Enter your area" />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-white font-semibold mb-2">Land Mark</label>
            <input type="text" className="bg-white w-10/12 h-12 p-4 rounded-md" placeholder="Enter your landMark" />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-white font-semibold mb-2 ">State</label>
            <input type="text" className="bg-white w-10/12 h-12 p-4 rounded-md" placeholder="Enter your State" />
          </div>
        </div>
        <div>
        </div>

        <div className='flex justify-center'>
        {/* <Profile /> */}
        </div>
      

      </div>
    </div>




  )
}

export default Register
