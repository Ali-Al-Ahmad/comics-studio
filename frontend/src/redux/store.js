import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'

import userReducer from './slices/userSlice'
import toastReducer from './slices/toastSlice'
import sidebarReducer from './slices/sidebarSlice'
import recentlyViewedReducer from './slices/recentlyViewedSlice'

export const RESET_APP = 'RESET_APP'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['toast'],
}

const rootReducer = combineReducers({
  user: userReducer,
  toast: toastReducer,
  sidebar: sidebarReducer,
  recentlyViewed: recentlyViewedReducer,
})

const appReducer = (state, action) => {
  if (action.type === RESET_APP) {
    storage.removeItem('persist:root')

    return rootReducer(undefined, action)
  }
  return rootReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, appReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

