import React, { useEffect } from 'react'
import { useAppSelector, fetchUsers, addUser } from '../../store'
import Button from '@components/elements/Button'
import Skeleton from '@components/Skeleton'
import { useThunk } from '@store/hooks'
import UsersListItem from '@components/user/UsersListItem'
import { User } from '@store/slices/usersSlice'

function UserList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
  const [doAddUser, isCreatingUsers, creatingUsersError] = useThunk(addUser)
  const { data } = useAppSelector((state) => {
    return state.users
  })
  useEffect(() => {
    doFetchUsers()
  }, [doFetchUsers])

  const handleAddUser = () => {
    doAddUser()
  }
  let content
  if (isLoadingUsers) {
    content = <Skeleton times={6} className='h-10 w-full' />
  } else if (loadingUsersError) {
    content = <div>Error in fetching data.</div>
  } else {
    content = data.map((user: User) => {
      return <UsersListItem key={user.id} user={user} />
    })
  }
  return (
    <div>
      <div className='flex flex-row justify-between items-center m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        <Button loading={isCreatingUsers} onClick={handleAddUser}>
          + Add User
        </Button>
        {creatingUsersError && <div>Error in creating user.</div>}
      </div>
      {content}
    </div>
  )
}
export default UserList
