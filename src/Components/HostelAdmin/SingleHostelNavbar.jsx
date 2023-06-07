import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SingleHostelNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navigate= useNavigate()
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleLogout =()=>{
      localStorage.removeItem('HostelAdminToken')
      navigate('/hostelAdmin/login')
    }
  
  
  return (
    <div>
    <nav className="bg-white fixed w-full shadow-lg ">
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
            <li className="relative">
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-between w-full py-2 pl-3 pr-4 rounded text-black rounded"
              >
                Account
                <svg
                  className="w-5 h-5 ml-1"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div
                id="dropdownNavbar"
                className={`${isOpen ? 'block' : 'hidden'
                  } z-10 absolute right-0 mt-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownNavbarLink"
                >
                  <li>
                    <Link
                      to={"/hostelAdmin/register"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      HostelAdmin
                    </Link>
                  </li>
                  <li>
                    <Link
                     
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Student
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  
  )
}

export default SingleHostelNavbar
