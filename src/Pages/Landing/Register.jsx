import React from 'react'
import Navbar from '../../Components/Landing/NavBar/Navbar'
import Profile from '../../Components/HostelAdmin/Profile'

function Register() {
    return (


        <div>
            <Navbar />
            <div>
                <h1 className="text-[#002D7A] bg-white font-bold text-4xl   sm:pl-56  sm:pt-5 md:pt-5 ">Provide your Details</h1>
            </div>
            <div className='h-max py-10 bg-white flex items-center justify-center'>
                <div className='w-[22rem] h-max py-10 bg-[#4B76C2] rounded-md shadow-sm md:w-[70rem] flex justify-center'>
                    <form action="" className='flex gap-y-10 flex-col items-center md:flex md:flex-row md:space-x-10'>
                        <div className='flex flex-col  gap-y-5'>
                            <div className='flex flex-col items-center'>
                                <label htmlFor="" className='text-white font-bold mr-48'>Full Name</label>
                                <input type="text" placeholder='Enter your fullname'
                                    className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md pl-2 shadow-sm ' />
                            </div>

                            <div className='flex flex-col items-center '>
                                <label htmlFor="" className='text-white font-bold mr-48'>Password</label>
                                <input type="password" placeholder='Enter your Password'
                                    className='w-72 h-10 bg-white font-sans mt-2
                                 text-black rounded-md pl-2 shadow-sm ' />
                            </div>

                            <div className='flex flex-col items-center'>
                                <label htmlFor="" className='text-white font-bold mr-48'>Mobile Number</label>
                                <input placeholder='Enter your Mobile Number'
                                    className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md pl-2 shadow-sm ' />
                            </div>

                            <div className='flex flex-col items-center'>
                                <label htmlFor="" className='text-white font-bold mr-48'>Qualificaion</label>
                                <input type="text" placeholder='Enter your Qualifiacion'
                                    className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md pl-2 shadow-sm ' />
                            </div>

                            <div className='flex flex-col items-center'>
                                <label htmlFor="" className='text-white font-bold mr-48'>Confirm Password</label>
                                <input type="password" placeholder='Enter your Confirm Password'
                                    className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md pl-2 shadow-sm ' />
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-5'>
                            <div className='flex flex-col items-center'>
                                <label htmlFor="" className='text-white font-bold mr-48'>Email</label>
                                <input type="email" placeholder='Enter your Email'
                                    className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md pl-2 shadow-sm ' />
                            </div>

                            <div className='flex flex-col items-center'>
                                <label htmlFor="" className='text-white font-bold mr-48'>Land Mark</label>
                                <input type="text" placeholder='Enter your Land Mark'
                                    className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md pl-2 shadow-sm ' />
                            </div>

                            <div className='flex flex-col items-center'>
                                <label htmlFor="" className='text-white font-bold mr-48'>Gender</label>
                                <input type="text" placeholder='Select your gender'
                                    className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md pl-2 shadow-sm ' />
                            </div>

                            <div className='flex flex-col items-center'>
                                <label htmlFor="" className='text-white font-bold mr-48'>Area</label>
                                <input type="text" placeholder='Enter your Area'
                                    className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md pl-2 shadow-sm ' />
                            </div>

                            <div className='flex flex-col items-center'>
                                <label htmlFor="" className='text-white font-bold mr-48'>State</label>
                                <input type="text" placeholder='Enter your State'
                                    className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md  pl-2 shadow-sm ' />
                            </div>

                        </div>

                        <div className='bg-white flex  flex-col  w-50 border-dashed border-black h-max rounded-md'>
                            <Profile />
                        </div>

                    </form>
                </div>



            </div>

            <div className='bg-white py-14 h-screen w-full flex justify-center'>
                <div className='bg-[#4B76C2] rounded-md h-[40rem] w-[71rem] pl-9 flex flex-wrap absolute'>
                    <div className='bg-white mt-8 w-[28rem] h-72 rounded-md '>
                    </div>

                    <div className='pt-12 pl-12 flex sm:flex-col gap-y-5 '>
                        <label htmlFor="" className='text-white font-bold mr-24'>Fullname</label>
                        <input type="text" className='w-[33rem] h-[4rem] rounded-md bg-white' name="Hostel Name" id="" />
                        <label htmlFor="" className='text-white font-bold mr-24'>Fullname</label>
                        <input type="text" className='w-[33rem] h-[4rem] rounded-md bg-white' name="Hostel Name" id="" />

                    </div>

                    <div className='bg-white w-[56rem] h-[13rem] mt-16 rounded-md relative mb-60 ml-16 flex flex-col'>

                    </div>
                </div>
            </div>







        </div>

    )
}

export default Register




