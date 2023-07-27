import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
       <footer className="text-center bg-[#002D7A] text-white mt-20">
      <div className="container py-6">
        <div className="flex items-center justify-center">
          <p className="flex items-center">
            <span className="mr-4">Register for free</span>
            <Link to={'/singup'}>
            <button
              type="button"
              className="inline-block rounded-full border-2 border-gray-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-gray-50 transition duration-150 ease-in-out hover:border-gray-100 hover:bg-gray-500 hover:bg-opacity-10 hover:text-gray-100 focus:border-gray-100 focus:text-gray-100 focus:outline-none focus:ring-0 active:border-gray-200 active:text-gray-200 dark:hover:bg-gray-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Sign up!
            </button>
            </Link>
          </p>
        </div>
      </div>

      <div className="p-4 text-center bg-opacity-20 bg-black">
        © 2023 Copyright:
          hostelhive
    
      </div>
 </footer>
    </div>
  )
}

export default Footer
