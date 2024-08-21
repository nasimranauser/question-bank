import React from 'react'
import { NavLink } from 'react-router-dom'

function ErrorScreen() {
  return (
    <div>
      <h1>404 Not Found Page</h1>
     <NavLink to={'/'}> <button>Back to Home Page</button>
     </NavLink>
    </div>
  )
}

export default ErrorScreen
