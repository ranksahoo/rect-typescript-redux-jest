import React, { useState, createContext, useContext } from 'react'

interface UserContextType {
  user: string | null
  login: (user: string) => void
  logout: () => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<UserContextType | null>(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null)

  const login = (user: string) => {
    setUser(user)
  }
  const logout = () => {
    setUser(null)
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => {
  return useContext(AuthContext)
}
