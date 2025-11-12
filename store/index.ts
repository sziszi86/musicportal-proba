import { configureStore } from '@reduxjs/toolkit'
import audioReducer from './audioSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    audio: audioReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch