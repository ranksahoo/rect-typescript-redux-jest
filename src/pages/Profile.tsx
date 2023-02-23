import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const userContext = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    userContext?.logout()
    navigate('/')
  }
  return (
    <div>
      Welcome to profile of {userContext?.user}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
export default Profile
