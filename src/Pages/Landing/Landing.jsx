import React from 'react'
import NavBar from '../../Components/Landing/NavBar/Navbar'
import Section from '../../Components/Landing/Section1/section1'
import Section2 from '../../Components/Landing/Section1/Section2'
import Banner from '../../Components/Landing/Section1/Banner'



function Landing() {
  return (
    <div>
      <NavBar/>
      <Section/>
      <Section2/>
      <Banner/>
    </div>
  )
}

export default Landing
