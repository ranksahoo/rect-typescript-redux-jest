import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { carsReducer, changeSearchTerm, addCar, removeCar } from './slices/carsSlice'
import { formReducer, changeName, changeCost } from '@store/slices/formSlice'
import { moviesReducer, addMovie, removeMovie } from '@store/slices/moviesSlice'
import { songsReducer, addSong, removeSong } from '@store/slices/songsSlice'
import { reset } from '@store/actions'
import { albumsApi } from '@store/apis/albumsApi'
import { photosApi } from '@store/apis/photosApi'
import { usersReducer } from '@store/slices/usersSlice'
import { postsApi } from '@store/apis/postsApi'

const store = configureStore({
  reducer: {
    form: formReducer,
    cars: carsReducer,
    songs: songsReducer,
    movies: moviesReducer,
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware)
      .concat(postsApi.middleware)
  },
})

setupListeners(store.dispatch)

export { store }
export { changeSearchTerm, addCar, removeCar, changeName, changeCost }
export { addMovie, removeMovie, addSong, removeSong, reset }
export * from './thunks'
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } from './apis/albumsApi'
export * from './apis/photosApi'
export * from './apis/postsApi'

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
