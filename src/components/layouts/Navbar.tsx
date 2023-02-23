import React from 'react'
import { NavLink } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
import { useAuth0 } from '@auth0/auth0-react'

const Navbar = () => {
  // const userContext = useAuth()
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'underline',
    }
  }
  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        // eslint-disable-next-line no-undef
        returnTo: window.location.origin,
      },
    })
  return (
    <nav className="top-0 flex items-center w-full px-28 h-14 shadow bg-amber-700 text-white">
      <NavLink to="/" style={navLinkStyle}>
        Home
      </NavLink>
      {isAuthenticated && (
        <>
          <NavLink to="/about" style={navLinkStyle}>
            About
          </NavLink>
          <NavLink to="/users" style={navLinkStyle}>
            Users
          </NavLink>
          <NavLink to="/profile" style={navLinkStyle}>
            Profile
          </NavLink>
          <NavLink to="/products" style={navLinkStyle}>
            Products
          </NavLink>
        </>
      )}
      <div className="w-full">
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()} className="float-right">
            Login
          </button>
        ) : (
          <button onClick={() => logoutWithRedirect()} className="float-right">
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}
export default Navbar
