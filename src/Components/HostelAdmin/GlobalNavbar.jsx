
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {adminAuthDataReset} from '../../Redux/Features/hostel/AuthSlice'
import {allHostelReset} from '../../Redux/Features/hostel/hostelSlice'
import {AdminRoomReset} from '../../Redux/Features/hostel/roomSlice'




function GlobalNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const navigate= useNavigate()
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleLogout =()=>{
      dispatch(allHostelReset())
      dispatch(adminAuthDataReset())
      dispatch(AdminRoomReset())
      localStorage.removeItem('HostelAdminToken')
      navigate('/hostel/login')
    }
  
  return (
    <div>
    <nav className="bg-white w-full  border-b ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <a href="#" className="flex items-center">
          <img className="w-32 h-14 absolute left-4" src={require('../../assets/images/hostel-logo.png')} alt="logo" />
        </a>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${isOpen ? 'block' : 'hidden'
            } w-full md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <ul
            className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:border-gray-700"
            onClick={toggleDropdown}
          >
            <li className="block py-2 pl-3 pr-4 text-black rounded" aria-current="page">
              Home
            </li>
            <li className="block py-2 pl-3 pr-4 text-black rounded">
              About
            </li>
            <li className="block py-2 pl-3 pr-4 text-black rounded">
              Contact
            </li>
            <li className="block py-2 pl-3 pr-4 text-black rounded cursor-pointer"  onClick={handleLogout}>
              Logout 
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  </div>

  
  
  )
}

export default GlobalNavbar
