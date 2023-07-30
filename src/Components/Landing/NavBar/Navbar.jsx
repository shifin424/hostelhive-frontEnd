import React from 'react';
import { Menu, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import image from '../../../assets/images/hostel-logo.png';

function Navbar() {

  const studentToken = localStorage?.getItem('StudentToken');
  const navigate = useNavigate()


  const handleLogout = async() => {
    try{
      localStorage.removeItem('StudentToken');
      navigate('/login');
    }catch(error){
      console.log(error);
    }
    
  };

 
  const userMenu = (
    <Menu>
      {studentToken ? (
        <Menu.Item key="1">
          <Link to="/student/profile">Profile</Link>
        </Menu.Item>
      ) : (
        <Menu.Item key="2">
          <Link to="/login">Student Login</Link>
        </Menu.Item>
      )}
      <Menu.Item key="3" onClick={handleLogout}>
        Sign Out
      </Menu.Item>
    </Menu>
  );
  



  return (
    <nav className="bg-white border-gray-200 shadow-md z-50 sticky top-0 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <a href="https://flowbite.com/" className="flex items-center">
          <img src={image} className="h-14 w-36" alt="Flowbite Logo" />
        </a>
        <div className="flex items-center md:order-2">
          <Dropdown overlay={userMenu} placement="bottomRight" arrow>
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full border-2 border-gray-600"
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="user logo"
              />
            </button>
          </Dropdown>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
         >
          <ul
            className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0   text-gray-800  md:dark:hover:bg-transparent "
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="block py-2 pl-3 pr-4 t rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0  text-gray-800    md:dark:hover:bg-transparent "
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0  text-gray-800   md:dark:hover:bg-transparent "
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 pl-3 pr-4 t rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0  text-gray-800   md:dark:hover:bg-transparent "
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
