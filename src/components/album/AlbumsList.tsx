import { useFetchAlbumsQuery, useAddAlbumMutation } from '../../store'
import Button from '@components/elements/Button'
import AlbumsListItem from '@components/album/AlbumsListItem'
import { User } from '@store/slices/usersSlice'
import { Album } from '@store/apis/albumsApi'
import Skeleton from '@components/Skeleton'

interface AlbumsListProps {
  user: User
}
function AlbumsList({ user }: AlbumsListProps) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user)
  const [addAlbum, results] = useAddAlbumMutation()

  const handleAddAlbum = () => {
    addAlbum(user)
  }

  let content
  if (isFetching) {
    content = <Skeleton times={3} className='h-10 w-full' />
  } else if (error) {
    content = <div>Error in fetching data.</div>
  } else {
    content = data.map((album: Album) => {
      return <AlbumsListItem key={album.id} album={album} />
    })
  }
  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold'>Albums for {user.name} </h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div> {content} </div>
    </div>
  )
}
export default AlbumsList
