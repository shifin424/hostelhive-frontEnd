import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminAuthDataReset } from '../../../Redux/Features/hostel/AuthSlice'
import { allHostelReset } from '../../../Redux/Features/hostel/hostelSlice'
import { AdminRoomReset } from '../../../Redux/Features/hostel/roomSlice'
import { useDispatch } from 'react-redux';
import Logo from '../../../assets/images/hostel-logo.png'
import { Menu, Dropdown } from 'antd';

function SingleHostelNavbar() {
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(allHostelReset())
    dispatch(adminAuthDataReset())
    dispatch(AdminRoomReset())
    localStorage.removeItem('HostelAdminToken')
    navigate('/hostel/login')
  }

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

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to='/hostel/profile'>Profile</Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={handleLogout}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  const mainMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/hostel/hostel-listing/food-menu">Food Menu</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/hostel/hostel-listing/rent-due">Hostel Rent</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/hostel/hostel-listing/rent-history">Rent History</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/hostel/hostel-listing/complaints">Complaints</Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link to="/hostel/hostel-listing/leave-letter">Leave Letter</Link>
      </Menu.Item>
      <Menu.Item key="7">
        <Link to="/hostel/hostel-listing/vacate-letters">Vacating Letter</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <nav className={`shadow-md bg-white h-16 sticky top-0 w-full ${isMobile ? " " : 'hidden'}`} id="navbar">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <img
            className="h-12 w-28 mr-3"
            src={Logo}
            alt="Hostel Logo"
          />
          <div className="flex items-center md:order-2">
            <Dropdown
              overlay={userMenu}
              placement="bottomRight"
              arrow
            >
              <button
                type="button"
                className="flex mr-3 text-sm  bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Hostel Logo"
                />
              </button>
            </Dropdown>
            <Dropdown
              overlay={mainMenu}
              placement="bottomRight"
              arrow
            >
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
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

  )
}

export default SingleHostelNavbar
