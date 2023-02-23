import { Outlet, useSearchParams } from 'react-router-dom'
const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const showActiveUsers = searchParams.get('filter') === 'active'
  return (
    <>
      <div>Users List</div>
      <div>
        <h1>User 1</h1>
        <h1>User 2</h1>
        <h1>User 3</h1>
        <Outlet />
        <div>
          <button
            onClick={() => {
              setSearchParams({ filter: 'active' })
            }}
          >
            Active Users
          </button>
          <button
            onClick={() => {
              setSearchParams({})
            }}
          >
            Reset Filters
          </button>
        </div>
        {showActiveUsers ? (
          <h2>Showing active uers</h2>
        ) : (
          <h2>Showing all users</h2>
        )}
      </div>
    </>
  )
}
export default Users
