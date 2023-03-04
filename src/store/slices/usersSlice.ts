import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addUser } from '@store/thunks/addUser'
import { fetchUsers } from '@store/thunks/fetchUsers'
import { removeUser } from '@store/thunks/removeUser'

export type User = {
  name: string
  id?: number
}
export type UserState = {
  data: User[]
  isLoading: boolean
  error: unknown
}
const initialState: UserState = {
  data: [],
  isLoading: false,
  error: '',
}
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Fetch Users
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })

    // Add user
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false
      state.data.push(action.payload)
    })
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })

    // remove user
    builder.addCase(removeUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(removeUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false
      state.data = state.data.filter((item: User) => {
        return item.id !== action.payload.id
      })
    })
    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  },
})

export const usersReducer = usersSlice.reducer
