
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { BiMessageAltEdit } from 'react-icons/bi'
import { TbMessages } from 'react-icons/tb'
import { BiLogOutCircle } from 'react-icons/bi'
import { GiVerticalBanner } from 'react-icons/gi'
import SideBar from './SideBar';
import Navbar from '../Layouts/NavBar';

function SuperAdminLayout() {
  const menus = [
    { name: 'DASHBOARD', link: '/dashboard', icon: RxDashboard },
    { name: 'REQUEST', link: '/request', icon: TbMessages },
    { name: 'HOSTEL MANAGEMENT', link: '/request', icon: BiMessageAltEdit },
    { name: 'LOGOUT', link: '/lo', icon: BiLogOutCircle },

  ];

  const [open, setOpen] = useState(true);
  return (
    <>
      <Navbar />


      <section className="flex">
        <div className='grid grid-cols-[auto_1fr] h-full w-full'>
          <div className='col-start-1 col-end-2'>
            <SideBar />
          </div>

          <div className="bg-white p-4 sm:p-8 col-start-2 w-full col-end-3">
            <Outlet />
          </div>
        </div>
      </section>
    </>



  )
}

export default SuperAdminLayout





