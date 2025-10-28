import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import audioSlice from './audioSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    audio: audioSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch