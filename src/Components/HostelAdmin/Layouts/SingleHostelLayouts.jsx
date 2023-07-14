import React from 'react'
import SingleHostelNavbar from './SingleHostelNavbar'
import SingleHostelSideBar from './SingleHostelSideBar'
import { Outlet } from 'react-router-dom'

function SingleHostelLayouts() {
  return (
    <>
      <SingleHostelNavbar />


      <section className="flex">
        <div className='grid grid-cols-[auto_1fr] h-full w-full'>
          <div className='col-start-1 col-end-2'>
            <SingleHostelSideBar />
          </div>

          <div className="bg-white p-4 sm:p-8 col-start-2 w-full col-end-3">
            <Outlet />
          </div>
        </div>


      </section>
    </>
  )
}

export default SingleHostelLayouts
