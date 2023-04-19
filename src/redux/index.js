import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './auth/reducer'
import PostReducer from './post/postReducer'
import ProfileReducer from './profile/reducer'
import CommentReducer from './post/commentReducer'
export default store = configureStore({
  reducer: {
    authReducer: AuthReducer,
    postReducer: PostReducer,
    profileReducer: ProfileReducer,
    commentReducer: CommentReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
