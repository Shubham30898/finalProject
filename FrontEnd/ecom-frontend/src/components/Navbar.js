import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    navigate('/', { replace: true })
  }

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">SignUp</NavLink>
      <NavLink to="/cart">Cart</NavLink>
      {sessionStorage.getItem('token') ? (
        <button onClick={handleLogout}>Sign Out</button>
      ) : null}
    </nav>
  )
}

export default Navbar
