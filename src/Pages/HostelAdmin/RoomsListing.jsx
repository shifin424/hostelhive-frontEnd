import React from 'react'
import Rooms from '../../Components/HostelAdmin/Rooms'
import RoomList from '../../Components/HostelAdmin/RoomList'

function RoomsListing() {
  return (
    <div className='bg-white w-full h-screen'>
      <Rooms/>
      <RoomList/>
    </div>
  )
}

export default RoomsListing
