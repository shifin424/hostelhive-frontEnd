import React from 'react'
import NavBar from '../../Components/Landing/NavBar/Navbar'
import Section from '../../Components/Landing/Section1/section1'
import Section2 from '../../Components/Landing/Section1/Section2'
import Banner from '../../Components/Landing/Section1/Banner'
import Footer from '../../Components/Student/Layouts/Footer'



function Landing() {
  return (
    <div>
      <NavBar/>
      <Section/>
      <Section2/>
      <Banner/>
      <Footer/>
    </div>
  )
}

export default Landing
