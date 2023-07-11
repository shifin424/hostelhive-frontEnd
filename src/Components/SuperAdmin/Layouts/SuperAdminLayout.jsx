
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
    { name: 'BANNER', link: '/cool', icon: GiVerticalBanner },
    { name: 'LOGOUT', link: '/lo', icon: BiLogOutCircle },

  ];

  const [open, setOpen] = useState(true);
  return (
    <>
      <Navbar />
      <section className="flex flex-col sm:flex-row ">
        <SideBar />

        <div className="bg-white p-4 sm:p-8 flex-grow">
          <Outlet />
        </div>
      </section>
    </>



  )
}

export default SuperAdminLayout





