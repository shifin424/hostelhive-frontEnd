import React from 'react'
import NavBar from '../../Components/Landing/NavBar/Navbar'
import Section from '../../Components/Landing/Section1/section1'
import Section2 from '../../Components/Landing/Section1/Section2'
import Footer from '../../Components/Student/Layouts/Footer'
import Banner from '../../Components/Landing/Section1/Banner/Banner'
import Serives from '../../Components/Landing/Section1/Services/Serives'



function Landing() {
  return (
    <div>
      <NavBar/>
      <Section/>
      <Section2/>
      <Banner/>
      <Serives/>
      <Footer/>
    </div>
  )
}

export default Landing
