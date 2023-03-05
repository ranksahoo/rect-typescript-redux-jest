import { useRemoveAlbumMutation } from '@store/index'
import ExpandablePanel from '@components/ExpandablePanel'
import Button from '@components/elements/Button'
import { GoTrashcan } from 'react-icons/go'
import PhotosList from '@components/album/PhotosList'
import { Album } from '@store/apis/albumsApi'

interface AlbumsListItemProps {
  album: Album
}
function AlbumsListItem({ album }: AlbumsListItemProps) {
  const [removeAlbum, resultsRemove] = useRemoveAlbumMutation()

  const handleDeleteAlbum = (album: Album) => {
    removeAlbum(album)
  }

  const heder = (
    <div className="flex flex-row items-center">
      <Button
        className="mr-3"
        loading={resultsRemove.isLoading}
        onClick={() => {
          handleDeleteAlbum(album)
        }}
      >
        <GoTrashcan />
      </Button>
      {resultsRemove.isError && <div>Error deleting user</div>}
      {album.title}
    </div>
  )
  return (
    <ExpandablePanel header={heder}>
      <PhotosList album={album} />
    </ExpandablePanel>
  )
}

export default AlbumsListItem
