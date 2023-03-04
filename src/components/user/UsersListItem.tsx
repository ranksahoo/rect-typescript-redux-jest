import { GoTrashcan } from 'react-icons/go'
import { useThunk } from '@store/hooks'
import { removeUser } from '../../store'
import AlbumsList from '@components/album/AlbumsList'
import Button from '@components/elements/Button'
import ExpandablePanel from '@components/ExpandablePanel'
import { User } from '@store/slices/usersSlice'

interface UsersListItemProps {
  user: User
}
function UsersListItem({ user }: UsersListItemProps) {
  const [doRemoveUser, deletingUser, deletingUserError] = useThunk(removeUser)
  const handleDeleteUser = () => {
    doRemoveUser(user)
  }
  const header = (
    <>
      <Button className='mr-3' loading={deletingUser} onClick={handleDeleteUser}>
        <GoTrashcan />
      </Button>
      {deletingUserError && <div>Error deleting user</div>}
      {user.name}
    </>
  )
  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  )
}
export default UsersListItem
