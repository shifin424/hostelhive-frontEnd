import React from 'react'
import Rooms from '../../Components/HostelAdmin/Rooms/Rooms'
import RoomList from '../../Components/HostelAdmin/Rooms/RoomList'

function RoomsListing() {
  return (
    <div className='bg-white w-full h-screen'>
      <Rooms/>
      <RoomList/>
    </div>
  )
}

export default RoomsListing
