import { useFetchPhotosQuery, useAddPhotoMutation, Photo } from '@store/index'
import { Album } from '@store/apis/albumsApi'
import Button from '@components/elements/Button'
import PhotosListItem from '@components/album/PhotosListItem'
import Skeleton from '@components/Skeleton'

interface PhotosListProps {
  album: Album
}
function PhotosList({ album }: PhotosListProps) {
  const { data, error, isFetching } = useFetchPhotosQuery(album)

  const [addPhoto, results] = useAddPhotoMutation()

  const handleAddPhoto = () => {
    addPhoto(album)
  }

  let content
  if (isFetching) {
    content = <Skeleton times={4} className='h-8 w-8' />
  } else if (error) {
    content = <div>Error in fetching data.</div>
  } else {
    content = data.map((photo: Photo) => {
      return <PhotosListItem key={photo.id} photo={photo} />
    })
  }

  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold'>Photos in album {album.title} </h3>
        <Button loading={results.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className='mx-8 flex flex-row flex-wrap justify-center'>{content}</div>
    </div>
  )
}
export default PhotosList
