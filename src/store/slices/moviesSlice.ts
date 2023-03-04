import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { reset } from '@store/actions'

const initialState: string[] = []
const moviesSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    addMovie(state, action: PayloadAction<string>) {
      state.push(action.payload)
    },
    removeMovie(state, action: PayloadAction<string>) {
      const index = state.indexOf(action.payload)
      state.splice(index, 1)
    },
    // reset(state: any[], action) {
    //   return [];
    // },
  },
  extraReducers(builder) {
    builder.addCase(reset, () => {
      return []
    })
  },
})

export const { addMovie, removeMovie } = moviesSlice.actions
export const moviesReducer = moviesSlice.reducer
