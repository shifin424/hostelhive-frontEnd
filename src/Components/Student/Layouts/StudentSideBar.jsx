import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg'
import { SlEnvolopeLetter } from 'react-icons/sl';
import { CgMenuRightAlt } from 'react-icons/cg';
import { MdOutlineReviews } from 'react-icons/md';
import { CgTimer } from 'react-icons/cg';
import { GiScrollQuill } from 'react-icons/gi'
import { MdOutlinePayment } from 'react-icons/md'
import { IoFastFoodSharp } from 'react-icons/io5'
import { SiHomeadvisor } from 'react-icons/si'
import { MdOutlineReportProblem } from 'react-icons/md';
import { Link } from 'react-router-dom';

function StudentSideBar() {
  const menus = [
    { name: 'PROFILE', link: '/student/profile', icon: CgProfile },
    { name: 'FOOD MENU', link: '/student/menu', icon: IoFastFoodSharp },
    { name: 'HOSTEL RENT', link: '/student/rent-due', icon: MdOutlinePayment },
    { name: 'RENT HISTORY', link: '/student/rent-history', icon: CgTimer },
    { name: 'REVIEWS', link: '', icon: MdOutlineReviews },
    { name: 'LEAVE LETTER', link: '/student/leave-letter', icon: SlEnvolopeLetter },
    { name: 'COMPLAINTS', link: '/student/complaints', icon: MdOutlineReportProblem },
    { name: 'VACATING LETTER', link: '', icon: GiScrollQuill },
    { name: 'GO TO HOME', link: '/', icon: SiHomeadvisor },
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

export default StudentSideBar
