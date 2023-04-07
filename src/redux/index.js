import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './auth/reducer'
import ProfileReducer from './profile/reducer'
export default store = configureStore({
  reducer: {
    authReducer: AuthReducer,
    profileReducer: ProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
