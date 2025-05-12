import { createSlice } from '@reduxjs/toolkit'

const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState: {
    comicIds: [],
  },
  reducers: {
    addToRecentlyViewed: (state, action) => {
      const comicId = Number(action.payload)

      if (isNaN(comicId)) {
        console.error('Invalid comic ID:', action.payload)
        return
      }

      state.comicIds = state.comicIds.filter((id) => id !== comicId)

      state.comicIds.unshift(comicId)

      if (state.comicIds.length > 10) {
        state.comicIds = state.comicIds.slice(0, 10)
      }
    },
    clearRecentlyViewed: (state) => {
      state.comicIds = []
    },
  },
})

export const { addToRecentlyViewed, clearRecentlyViewed } =
  recentlyViewedSlice.actions
export default recentlyViewedSlice.reducer
