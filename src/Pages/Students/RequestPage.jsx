import React from 'react'
import Request from '../../Components/Student/Request'
import { useNavigate } from 'react-router-dom'

function RequestPage() {
 // const token = localStorage.getItem('StudentToken')
  return  (
    <>
    <div className='bg-white w-full h-screen'>
        <Request/>
    </div>
    </>
  )
}

export default RequestPage
