import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { User } from '@store/slices/usersSlice'

const removeUser = createAsyncThunk('users/remove', async (user: User) => {
  await axios.delete(`http://localhost:3005/users/${user.id}`)
  await pause(1000)
  return user
})

const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
export { removeUser }
