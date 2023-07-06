import React, { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { RoomDetialsReset } from '../../../Redux/Features/student/RoomBooking';
import { StudentAuthReset } from '../../../Redux/Features/student/AuthSlice';
import { StudentRoomReset } from '../../../Redux/Features/student/RoomSlice'
import {StudentHostelReset} from '../../../Redux/Features/student/hostelSlice'





function Navbar() {
  // const [isOpen, setIsOpen] = useState(false);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const token = localStorage.getItem('StudentToken');

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem('StudentToken');
  //   dispatch(StudentRoomReset())
  //   dispatch(RoomDetialsReset())
  //   dispatch(StudentAuthReset())
  //   dispatch(StudentHostelReset())
  //   navigate('/login');
  // };

  // return (
  //   <div>
  //     <nav className="bg-white border-b-4 shadow-lg ">
  //       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  //         <a href="#" className="flex items-center">
  //           <img className="w-32 h-14 absolute left-4" src={require('../../../assets/images/hostel-logo.png')} alt="logo" />
  //         </a>
  //         <button
  //           data-collapse-toggle="navbar-dropdown"
  //           type="button"
  //           className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  //           aria-controls="navbar-dropdown"
  //           aria-expanded="false"
  //           onClick={toggleDropdown}
  //         >
  //           <span className="sr-only">Open main menu</span>
  //           <svg
  //             className="w-6 h-6"
  //             aria-hidden="true"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <path
  //               fillRule="evenodd"
  //               d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
  //               clipRule="evenodd"
  //             ></path>
  //           </svg>
  //         </button>
  //         <div
  //           className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
  //           id="navbar-dropdown"
  //         >
  //           <ul
  //             className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:border-gray-700"
  //             onClick={toggleDropdown}
  //           >
  //             <li className="block py-2 pl-3 pr-4 text-black rounded" aria-current="page">
  //               Home
  //             </li>
  //             <li className="block py-2 pl-3 pr-4 text-black rounded">
  //               About
  //             </li>
  //             <li className="block py-2 pl-3 pr-4 text-black rounded">
  //               Contact
  //             </li>
  //             {token ? (
  //               <li className="block py-2 pl-3 pr-4 text-black rounded cursor-pointer" onClick={handleLogout}>
  //                 Logout
  //               </li>
  //             ) : (
  //               <li className="relative">
  //                 <button
  //                   id="dropdownNavbarLink"
  //                   data-dropdown-toggle="dropdownNavbar"
  //                   className="flex items-center justify-between w-full py-2 pl-3 pr-4  text-black rounded"
  //                 >
  //                   Account
  //                   <svg
  //                     className="w-5 h-5 ml-1"
  //                     aria-hidden="true"
  //                     fill="currentColor"
  //                     viewBox="0 0 20 20"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                   >
  //                     <path
  //                       fillRule="evenodd"
  //                       d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
  //                       clipRule="evenodd"
  //                     ></path>
  //                   </svg>
  //                 </button>
  //                 <div
  //                   id="dropdownNavbar"
  //                   className={`${isOpen ? 'block' : 'hidden'
  //                     } z-10 absolute right-0 mt-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:white dark:bg-white`}
  //                 >
  //                   <ul
  //                     className="py-2 text-sm text-gray-700 dark:text-gray-400"
  //                     aria-labelledby="dropdownNavbarLink"
  //                   >
  //                     <li>
  //                       <Link
  //                         to={"/hostel/login"}
  //                         className="block px-4 py-2  text-black hover:bg-[#0e53ca] dark:hover:text-white"
  //                       >
  //                         HostelAdmin
  //                       </Link>
  //                     </li>
  //                     <li>
  //                       <Link to={'/login'}
  //                         className="block px-4 py-2  text-black dark:hover:bg-[#0e53ca] dark:hover:text-white"
  //                       >
  //                         Student
  //                       </Link>
  //                     </li>
  //                   </ul>
  //                 </div>
  //               </li>
  //             )}
  //           </ul>
  //         </div>
  //       </div>
  //     </nav>
  //   </div>
  // );
return(
<nav className="  bg-white border border-black h-16 sticky top-0 w-full">
  <div className="max-w-screen-md flex flex-wrap items-center  justify-between mx-auto ">
      <img src={require('../../../assets/images/hostel-logo.png')}  className="h-10 w-40 mr-3" alt="Flowbite Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">Flowbite</span>
  <div class="flex items-center  md:order-2">
      <button type="button" className="flex mr-3 text-sm bg-blue-600 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span class="sr-only">Open user menu</span>
        <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"/>
      </button>
      <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <ul class="py-2" aria-labelledby="user-menu-button">
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </li>
        </ul>
      </div>
      <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  
  </div>
</nav>
)
}

export default Navbar;
