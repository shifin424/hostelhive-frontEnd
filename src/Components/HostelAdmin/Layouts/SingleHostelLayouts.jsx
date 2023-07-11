import React from 'react'
import SingleHostelNavbar from './SingleHostelNavbar'
import SingleHostelSideBar from './SingleHostelSideBar'
import { Outlet } from 'react-router-dom'

function SingleHostelLayouts() {
    return (
        <>
        <SingleHostelNavbar />
        <section className="flex  ">
          <SingleHostelSideBar />
    
          <div className="bg-white p-4 sm:p-8 flex-grow">
            <Outlet />
          </div>
        </section>
      </>
      )
}

export default SingleHostelLayouts
