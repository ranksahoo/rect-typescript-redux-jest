import '@styles/Media.css'
import { useDispatch } from 'react-redux'
import MoviePlaylist from '@components/movie/MoviePlaylist'
import SongPlaylist from '@components/song/SongPlaylist'
import { reset } from '../store'

export default function Media() {
  const dispatch = useDispatch()

  const handleResetClick = () => {
    dispatch(reset())
    // dispatch(resetSongs(""));
  }

  return (
    <div className='container is-fluid'>
      <button onClick={() => handleResetClick()} className='button is-danger'>
        Reset Both Playlists
      </button>
      <hr />
      <MoviePlaylist />
      <hr />
      <SongPlaylist />
    </div>
  )
}
