import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './auth/reducer'
import PostReducer from './post/postReducer'
import ProfileReducer from './profile/reducer'
export default store = configureStore({
  reducer: {
    authReducer: AuthReducer,
    postReducer: PostReducer,
    profileReducer: ProfileReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
