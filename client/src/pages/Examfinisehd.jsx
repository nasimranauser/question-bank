import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { NavLink } from 'react-router-dom'

function Examfinisehd() {
  return (
    <div>
      <div style={{marginTop:70,}}>
       <div style={{border:'2px solid green',padding:12,textAlign:'center'}}>
       <h3>Exam Finisehd</h3>
       <NavLink to={'/'}>Go to home</NavLink>
       </div>
      </div>
      <Footer />
    </div>
  )
}

export default Examfinisehd
