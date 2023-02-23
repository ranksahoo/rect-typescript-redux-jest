import { useParams } from 'react-router-dom'

const UserDetails = () => {
  const params = useParams()
  const { userId } = params
  return (
    <>
      <div>User Details Page</div>
      <div>User id: {userId}</div>
    </>
  )
}
export default UserDetails
