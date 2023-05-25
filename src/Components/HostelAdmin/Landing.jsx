import React from 'react'

function Landing() {
  return (
  
    <div className="bg-white w-screen h-screen card-body">
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-[#002D7A] animate-none ">
        Welcome to Hostel Hive
      </h1>
      <div className="my-8 text-center">
        <p className="text-3xl text-gray-600 font-serif ">
        First Step, add your hostel, and after verifying it from Hostel Hive, you can proceed to make a payment for the monthly charge of rupees 3000.Discover the perfect hostel for your stay! Hostel Hive offers a wide range of comfortable and affordable accommodations. Browse through our extensive listings, read reviews from fellow travelers, and find your ideal hostel.
        </p>
        <p className="mt-4 text-2xl text-gray-600">
          Planning your next adventure? Hostel Hive has got you covered! Whether you're traveling solo, with friends, or looking for group accommodations, we provide options tailored to your needs.
        </p>
      </div>
      <div className="flex justify-center mt-12 animate-pulse">
        <a href="#" className="bg-[#002D7A] hover:bg-[#002D7A] text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out">
          Add Your Hostel
        </a>
      </div>
      
    </div>
  </div>

  )
}

export default Landing
