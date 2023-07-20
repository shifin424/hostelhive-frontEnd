import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adminAuthDataReset } from '../../../Redux/Features/hostel/AuthSlice';
import { allHostelReset } from '../../../Redux/Features/hostel/hostelSlice';
import { AdminRoomReset } from '../../../Redux/Features/hostel/roomSlice';
import image from '../../../assets/images/hostel-logo.png';
import { Dropdown, Menu } from 'antd';

function GlobalNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) {
    return null;
  }

  const handleLogout = () => {
    dispatch(allHostelReset());
    dispatch(adminAuthDataReset());
    dispatch(AdminRoomReset());
    localStorage.removeItem('HostelAdminToken');
    navigate('/hostel/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/hostel/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  const mainMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/">Dash Board</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/hostel/hostel-listing">Hostels</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/hostel/student-request">Student Requests</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/hostel/">Vacating Letters</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/hostel/">Complaints</Link>
      </Menu.Item>
    </Menu>
  );



  return (
    <nav className={`shadow-md bg-white h-16 sticky top-0 w-full ${isMobile ? " " : 'hidden'}`} id="navbar">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link className="flex items-center">
          <img className="w-32 h-14 absolute left-4" src={image} alt="logo" />
        </Link>
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
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="user pic"
              />
            </button>
          </Dropdown>
          <Dropdown overlay={mainMenu} placement="bottomRight" arrow>
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
          </Dropdown>
        </div>
        <div
          className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <ul
            className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:border-gray-700"
            onClick={toggleDropdown}
          >
            <li className="block py-2 pl-3 pr-4 text-black rounded" aria-current="page">
              Home
            </li>
            <li className="block py-2 pl-3 pr-4 text-black rounded">About</li>
            <li className="block py-2 pl-3 pr-4 text-black rounded">Contact</li>
            <li className="block py-2 pl-3 pr-4 text-black rounded cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default GlobalNavbar;
