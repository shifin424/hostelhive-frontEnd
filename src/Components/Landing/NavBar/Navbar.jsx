import React from 'react';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import image from '../../../assets/images/hostel-logo.png'

function Navbar() {
  const studentToken = JSON.parse(localStorage.getItem('StudentToken'))?.token;
  const hostelAdminToken = JSON.parse(localStorage.getItem('HostelAdminToken'))?.token;

  // const handleLogout = () => {
  //   // Implement your logout logic here
  // };

  const userMenu = (
    <Menu>
      {studentToken && (
        <Menu.Item key="1">
          <Link to="/student/profile">Student</Link>
        </Menu.Item>
      )}
      {hostelAdminToken && (
        <Menu.Item key="2">
          <Link to="/hostel/dashboard">Hostel</Link>
        </Menu.Item>
      )}
      {/* <Menu.Item key="3" onClick={handleLogout}>
        Logout
      </Menu.Item> */}
    </Menu>
  );

  const mainMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="">About</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="">Service</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="">Contact</Link>
      </Menu.Item>
    </Menu>
);
  return (
    <nav className="shadow-md bg-white h-16 sticky top-0 w-full" id="navbar">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <img
            src={image}
            className="h-12 w-28 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Kunjutty bite</span>
        </a>
        <div className="flex items-center md:order-2">
          {studentToken || hostelAdminToken ? (
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
                  alt="user photo"
                />
              </button>
            </Dropdown>
          ) : (
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
          )}
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800  dark:border-gray-700">
            <li>
              <Dropdown overlay={mainMenu} placement="bottomRight" arrow>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </Dropdown>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4  rounded text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
