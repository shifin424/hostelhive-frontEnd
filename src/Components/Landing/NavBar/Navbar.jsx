import React from 'react'

function Navbar() {
  return (
    <div className='bg-white w-full h-14 flex border-b-4 shadow-lg '>
       <div className='w-36 h-14'> 
       <img className='w-32 h-14 absolute left-4'
          src={require('../../../assets/images/hostel-logo.png')} 
          alt="logo" 
        />
       </div>
    </div>
  )
}


export default Navbar
