import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  carsReducer,
  changeSearchTerm,
  addCar,
  removeCar,
} from './slices/carsSlice'
import { formReducer, changeName, changeCost } from './slices/formSlice'
import { moviesReducer, addMovie, removeMovie } from './slices/moviesSlice'
import { songsReducer, addSong, removeSong } from './slices/songsSlice'
import { reset } from './actions'
import { albumsApi } from './apis/albumsApi'
import { photosApi } from './apis/photosApi'
import { usersReducer } from './slices/usersSlice'

const store = configureStore({
  reducer: {
    form: formReducer,
    cars: carsReducer,
    songs: songsReducer,
    movies: moviesReducer,
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware)
  },
})

setupListeners(store.dispatch)

export { store }
export { changeSearchTerm, addCar, removeCar, changeName, changeCost }
export { addMovie, removeMovie, addSong, removeSong, reset }
export * from './thunks'
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from './apis/albumsApi'
export * from './apis/photosApi'

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
