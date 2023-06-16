
import React, { useState } from 'react';
import { RxDashboard } from 'react-icons/rx';
import { FaBed } from 'react-icons/fa';
import { CgMenuRightAlt } from 'react-icons/cg';
import { RiMessage2Fill } from 'react-icons/ri';
import { SlEnvolopeLetter } from 'react-icons/sl';
import {GiScrollQuill}  from 'react-icons/gi'
import {IoFastFoodSharp} from  'react-icons/io5'
import { MdOutlineReportProblem } from 'react-icons/md';
import { Link } from 'react-router-dom';

function SingleHostelSideBar() {
    const menus = [
        { name: 'DASHBOARD', link: '/hostel/hostel-listing/dashboard', icon: RxDashboard },
        { name: 'ROOMS', link: '/hostel/hostel-listing/rooms', icon: FaBed },
        { name: 'STUDENT REQUESTS', link: '', icon:RiMessage2Fill  },
        { name: 'STUDENT MANAGMENTS', link: '', icon:FaBed},
        { name: 'FOOD SYSTEMS', link: '', icon: IoFastFoodSharp },
        { name: 'LEAVE LETTERS', link: '', icon: SlEnvolopeLetter },
        { name: 'VACATING LETTERS', link: '', icon: GiScrollQuill },
        { name: 'COMPLAINTS', link: '', icon: MdOutlineReportProblem },
      ];
    
      const [open, setOpen] = useState(true);
    
      return (
        <div className={`bg-[#002D7A] min-h-screen ${open ? 'w-64' : 'w-16'} duration-500 text-gray-100 px-4 fixed mt-[4.5rem]`}>
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
                  className={`${menu?.margin && 'mt-5'
                    } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                >
                  <div>{React.createElement(menu?.icon, { size: '20' })}</div>
                  <h2
                    style={{ transitionDelay: `${i + 3}00ms` }}
                    className={`whitespace-pre duration-500 ${!open ? 'opacity-0 translate-x-[-100%] overflow-hidden' : ''
                      }`}
                  >
                    {menu?.name}
                  </h2>
                </Link>
    
                <h2
                  className={`${open && 'hidden'
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
      );
}

export default SingleHostelSideBar
