import UsersManager from '@components/table-pagination2/UsersManager'
// import UserList from '@components/user/UserList'

const Home = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold">Home Page</h1>
      {/* <UserList /> */}
      <UsersManager />
    </div>
  )
}
export default Home
