import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Editcontent from '../components/Editprofile'
import '../assets/styles/Overview.css'

function Editprofile() {
  return (
    <div>
        <Navbar />
        <Editcontent />
        <Footer />
    </div>
  )
}

export default Editprofile
