import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { reset } from '@store/actions'

const initialState: string[] = []

const songsSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    addSong(state, action: PayloadAction<string>) {
      state.push(action.payload)
    },
    removeSong(state, action: PayloadAction<string>) {
      const index = state.indexOf(action.payload)
      state.splice(index, 1)
    },
  },
  //   extraReducers(builder) {
  //     // builder.addCase("movie/reset", (state, action) => {
  //     //   return [];
  //     // });
  //     // builder.addCase(moviesSlice.actions.reset.toString(), (state, action) => {
  //     //   return [];
  //     // });
  //     // builder.addCase(moviesSlice.actions.reset, (state, action) => {
  //     //   return [];
  //     // });
  //   },
  extraReducers(builder) {
    builder.addCase(reset, () => {
      return []
    })
  },
})

export const { addSong, removeSong } = songsSlice.actions
export const songsReducer = songsSlice.reducer
