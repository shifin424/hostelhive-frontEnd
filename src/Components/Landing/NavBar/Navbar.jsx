import React, { useEffect, useMemo, useState } from 'react';
import { Menu, Dropdown, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import image from '../../../assets/images/hostel-logo.png';
import { fetchProfileData } from '../../../Services/studentsServices';

function Navbar() {
  const [details, setDetails] = useState('');
  console.log(details.role, "this is the details")

  const studentToken = localStorage?.getItem('StudentToken');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('StudentToken');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  
  const headers = useMemo(() => ({
    Authorization: JSON?.parse(localStorage.getItem("StudentToken"))?.token
  }), []);

  useEffect(() => {
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
  }, [headers]);

  const menu = (
    <Menu>
      {studentToken ? (
        <Menu.Item key="1">
          {details.role === "resident" ? (
            <Link to="/student/profile">Profile</Link>
          ) : details.role === "guest" ? (
            <span onClick={() => message.info("Please complete payment")}>
             Go to Profile
            </span>
          ) : null}
        </Menu.Item>
      ) : (
        <Menu.Item key="2">
          <Link to="/login">Student Login</Link>
        </Menu.Item>
      )}
      {studentToken && (
        <Menu.Item key="3" onClick={handleLogout}>
          Sign Out
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <nav className="bg-white border-gray-200 shadow-md z-50 sticky top-0 w-full">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
      <a href="https://flowbite.com/" className="flex items-center">
        <img src={image} className="h-14 w-36" alt="Flowbite Logo" />
      </a>
      <div className="flex items-center md:order-2">
        <Dropdown overlay={menu} placement="bottomRight" arrow>
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
      </div>
    </div>
  </nav>
  );
}

export default Navbar;
