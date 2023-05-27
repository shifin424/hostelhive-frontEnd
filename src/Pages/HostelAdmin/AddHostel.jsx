import React from 'react'
import NavBar from '../../Components/SuperAdmin/NavBar'
import AddHostels from '../../Components/HostelAdmin/AddHostels'



function AddHostel() {
  return (
    <div>
        <NavBar/>
        <div>
          <AddHostels/>
        </div>
    </div>
  )
}

export default AddHostel
