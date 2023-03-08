import '@styles/Media.css'
import { useDispatch } from 'react-redux'
import MoviePlaylist from '@components/movie/MoviePlaylist'
import SongPlaylist from '@components/song/SongPlaylist'
import { reset } from '@store/index'

export default function Media() {
  const dispatch = useDispatch()

  const handleResetClick = () => {
    dispatch(reset())
    // dispatch(resetSongs(""));
  }

  return (
    <div className="is-fluid container">
      <button onClick={() => handleResetClick()} className="button is-danger">
        Reset Both Playlists
      </button>
      <hr />
      <MoviePlaylist />
      <hr />
      <SongPlaylist />
    </div>
  )
}
