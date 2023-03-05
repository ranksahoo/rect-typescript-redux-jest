import { GoTrashcan } from 'react-icons/go'
import { Photo, useRemovePhotoMutation } from '@store/index'

interface PhotosListItemProps {
  photo: Photo
}
function PhotosListItem({ photo }: PhotosListItemProps) {
  const [removePhoto, resultsRemove] = useRemovePhotoMutation()

  const handleDeletePhoto = () => {
    removePhoto(photo)
  }

  return (
    <div
      className="relative m-2"
      onClick={handleDeletePhoto}
      role="button"
      tabIndex={0}
      onKeyDown={handleDeletePhoto}
    >
      <img
        className="h-20 w-20"
        src={
          'https://images.unsplash.com/photo-1672917234995-f533f6b8b201?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200'
        }
        alt="random pic"
      />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80 hover:cursor-pointer">
        {resultsRemove.isLoading ? '' : <GoTrashcan className="text-3xl" />}
      </div>
    </div>
  )
}
export default PhotosListItem
