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
    <nav className="top-0 flex h-14 w-full items-center gap-3 bg-amber-700 px-28 text-white shadow">
      <NavLink to="/" style={navLinkStyle}>
        Home
      </NavLink>
      {isAuthenticated && (
        <>
          <NavLink to="/albums" style={navLinkStyle}>
            Albums
          </NavLink>
          <NavLink to="/cars" style={navLinkStyle}>
            Cars
          </NavLink>
          <NavLink to="/media" style={navLinkStyle}>
            Media
          </NavLink>
          <NavLink to="/songs" style={navLinkStyle}>
            Songs
          </NavLink>
          <NavLink to="/users" style={navLinkStyle}>
            Users
          </NavLink>
          <NavLink to="/posts" style={navLinkStyle}>
            Posts
          </NavLink>
          <NavLink to="/table" style={navLinkStyle} className="w-44">
            Pagination
          </NavLink>
          <NavLink to="/components" style={navLinkStyle} className="w-44">
            Components
          </NavLink>
          <NavLink to="/form" style={navLinkStyle} className="w-44">
            Form
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
