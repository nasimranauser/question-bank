
import React from 'react'
import {Navigate, useNavigate} from 'react-router-dom'

function HomeRoute() {
  const navigate = useNavigate();
  return <Navigate to={'/'} />
}

export default HomeRoute
