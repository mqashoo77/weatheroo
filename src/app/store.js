import { configureStore } from '@reduxjs/toolkit'
import weatherapiSliceReducer from '../weatherapiSlice'

export const store = configureStore({
  reducer: {
    weather : weatherapiSliceReducer,
  },
})