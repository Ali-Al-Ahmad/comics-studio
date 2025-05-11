import { createSlice } from '@reduxjs/toolkit'

const isMobileViewport = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= 768
  }
  return false
}

const initialState = {
  isCollapsed: isMobileViewport(),
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed
    },
    setSidebarCollapsed: (state, action) => {
      state.isCollapsed = action.payload
    },
  },
})

export const { toggleSidebar, setSidebarCollapsed } = sidebarSlice.actions

export default sidebarSlice.reducer
