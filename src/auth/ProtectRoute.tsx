import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'

interface ProtectRouteProps {
  children?: React.ReactNode
}

const ProtectRoute = ({ children }: ProtectRouteProps) => {
  const userContext = useAuth()
  const location = useLocation()
  if (!userContext?.user) {
    return <Navigate to="/login" state={{ path: location.pathname }} />
  }
  return <>{children}</>
}
export default ProtectRoute
