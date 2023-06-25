import React from 'react'
import Payment from '../../Components/Student/Payment'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Components/Landing/NavBar/Navbar'

function PaymentPage() {
    // const token = localStorage.getItem('StudentToken')
    // const navigate = useNavigate()
    // return !token?navigate('/login'): (
      return (
    <div className='bg-white w-full '>
      <Navbar/>
      <Payment/>
    </div>
  )
}

export default PaymentPage
