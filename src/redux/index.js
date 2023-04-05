import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './auth/reducer'

export default store = configureStore({
  reducer: {
    authReducer: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
