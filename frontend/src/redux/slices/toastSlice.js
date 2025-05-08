import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  show: false,
  type: '',
  message: '',
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.show = true
      state.type = action.payload.type
      state.message = action.payload.message
    },
    hideToast: (state) => {
      state.show = false
      state.type = ''
      state.message = ''
    },
  },
})

export const { showToast, hideToast } = toastSlice.actions
export default toastSlice.reducer
