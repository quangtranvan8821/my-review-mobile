import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './auth/reducer'
import PostReducer from './post/postReducer'
export default store = configureStore({
  reducer: {
    authReducer: AuthReducer,
    postReducer: PostReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
