import React from 'react'
import NavBar from '../../Components/Landing/NavBar/Navbar'
import Section from '../../Components/Landing/Section1/section1'
import Section2 from '../../Components/Landing/Section1/Section2'
import Footer from '../../Components/Student/Layouts/Footer'
import Cards from '../../Components/Landing/Section1/Cards/Cards'



function Landing() {
  return (
    <div className='bg-white'>
      <NavBar/>
      <Section/>
      <Section2/>
      {/* <Cards className='hide-cards'/> */}
      <Footer/>
    </div>
  )
}

export default Landing
