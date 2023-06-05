import React from 'react'
import HostelDetails from '../../Components/Landing/Section1/HostelDetails'
import GlobalNavbar from '../../Components/HostelAdmin/GlobalNavbar'

function HostelInfo() {
  return (
    <div className='bg-white w-full h-full '>
        <GlobalNavbar/>
      <HostelDetails/>
    </div>
  )
}

export default HostelInfo
