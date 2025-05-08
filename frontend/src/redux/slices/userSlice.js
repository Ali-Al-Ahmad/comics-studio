import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout() {
      return null
    },
    updateProfile(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { login, logout, updateProfile } = userSlice.actions
export default userSlice.reducer
