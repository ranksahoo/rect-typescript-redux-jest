import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const Login = () => {
  const [user, setUser] = useState('')
  const userContext = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.path || '/'

  const handleLogin = () => {
    userContext?.login(user)
    navigate(redirectPath, { replace: true })
  }
  return (
    <div>
      <label>
        Username:
        <input
          type="text"
          onChange={(evt) => {
            setUser(evt.target.value)
          }}
        />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
export default Login
