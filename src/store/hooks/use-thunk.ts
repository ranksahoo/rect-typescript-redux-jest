import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

function useThunk(thunk: any) {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const runThunk = useCallback(
    (payload: any) => {
      setLoading(true)
      dispatch(thunk(payload))
        .unwrap()
        .catch((error: any) => {
          setError(error)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [dispatch, thunk],
  )
  return [runThunk, isLoading, error]
}

export default useThunk
