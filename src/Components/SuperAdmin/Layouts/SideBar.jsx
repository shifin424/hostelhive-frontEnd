
import React, { useState } from 'react';
import { CgMenuRightAlt } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { BiMessageAltEdit } from 'react-icons/bi'
import { TbMessages } from 'react-icons/tb'
import { BiLogOutCircle } from 'react-icons/bi'


const SideBar = () => {
    const menus = [
        { name: 'DASHBOARD', link: '/admin/dashboard', icon: RxDashboard },
        { name: 'REQUEST', link: '/admin/request', icon: TbMessages },
        { name: 'HOSTEL MANAGEMENT', link: '/admin/hostel-managment', icon: BiMessageAltEdit },//margin true
        { name: 'LOGOUT', link: '/admin/logout', icon: BiLogOutCircle },

    ];

    const [open, setOpen] = useState(true);

  return (
    <div className={`bg-[#002D7A] h-[100vh] ${open ? 'w-64' : 'w-16'} duration-500 text-gray-100 px-4 sticky top-0 left-0 `}>
    <div className="py-3 flex justify-end">
      <CgMenuRightAlt
        size={26}
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </div>
    <div className="mt-4 flex flex-col gap-4 relative">
      {menus.map((menu, i) => (
        <div key={i} className="group">
          <Link
            to={menu?.link}
            className={`${
              menu?.margin && 'mt-5'
            } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
          >
            <div>{React.createElement(menu?.icon, { size: '20' })}</div>
            <h2
              style={{ transitionDelay: `${i + 3}00ms` }}
              className={`whitespace-pre duration-500 ${
                !open ? 'opacity-0 translate-x-[-100%] overflow-hidden' : ''
              }`}
            >
              {menu?.name}
            </h2>
          </Link>

          <h2
            className={`${
              open && 'hidden'
            } absolute left-[-48px] bg-white text-black font-semibold whitespace-pre text-grey-900 rounded-md drop-shadow-lg px-2 py-1 group-hover:left-14 w-0 overflow-hidden group-hover:duration-300 group-hover:w-fit`}
          >
            {menu?.name}
          </h2>
        </div>
      ))}
    </div>
    <style>
        {`
           @media (max-width: 768px) {
                .w-64 {
                  display: none;
                }
            }
        `}
      </style>
  </div>
  )
}

export default SideBar
