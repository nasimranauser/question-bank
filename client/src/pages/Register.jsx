import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Registercontent from '../components/Registercontent'
import { useAuth } from '../context/auth'



function Register() {
  const {isAuth} = useAuth();
  console.log(isAuth)
  return (
    <>
            <Registercontent />
        <Footer />
    </>
  )
}

export default Register
