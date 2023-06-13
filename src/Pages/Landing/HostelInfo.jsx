import React from 'react'
import HostelDetails from '../../Components/Landing/Section1/HostelDetails'
import GlobalNavbar from '../../Components/Landing/NavBar/Navbar'
import RoomListing from '../../Components/Landing/Section1/RoomListing'

function HostelInfo() {
  return (
    <div className='bg-white w-full h-full '>
        <GlobalNavbar/>
      <HostelDetails/>
      <RoomListing/>
    </div>
  )
}

export default HostelInfo
