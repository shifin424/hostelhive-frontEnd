import React from 'react'
import GlobalNavbar from './GlobalNavbar'
import GlobalSideBar from './GlobalSideBar'
import { Outlet } from 'react-router-dom'

function GlobalHostelLayout() {
  return (
    <>
    <GlobalNavbar />
    <section className="flex">
      <GlobalSideBar />

      <div className="bg-white p-4 sm:p-8 flex-grow">
        <Outlet />
      </div>
    </section>
  </>
  )
}

export default GlobalHostelLayout
