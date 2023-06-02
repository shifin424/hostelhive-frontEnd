import React from 'react'
import Message from '../../Components/HostelAdmin/Notify'
import NavBar from '../../Components/SuperAdmin/NavBar'

function Notification() {
  return (
    <div className='bg-white'>
        <NavBar/>
      <Message/>
    </div>
  )
}

export default Notification
