import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchApi } from '../../lib/fetchAPI'

const initialState = {
  postData: [],
  isloading: false,
  haserr: false,
}

// loadData Post
export const loadPosts = createAsyncThunk('post/loadpost', async () => {
  const res = await fetchApi('/api/v1/post')
  if (res.status == 200) {
    return await res.data
  }
  return await res.json()
})

// add New Post
export const addNewPost = createAsyncThunk('post/addNewPost', async (body) => {
  const response = await fetchApi('/api/v1/post', 'post', body)
  if (response.status == 200) {
    console.log(response.data)
    return await response.data
  }
})

//delete Post
export const postDeletes = createAsyncThunk('post/delete', async (body) => {
  const res = await fetchApi('/postDelete', 'post', body)
  if (res.status == 200) {
    return await res.data
  }
  return await res.json()
})

const PostReducer = createSlice({
  initialState,
  name: 'post',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.postData.push(action.payload)
      })
      .addCase(loadPosts.pending, (state, action) => {
        state.isloading = true
        state.haserr = false
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.postData = action.payload
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.isloading = false
        state.haserr = true
      })
  },
})

export const {} = PostReducer.actions

export const postData = (state) => state.postReducer.postData

export const selectPostById = (state, postId) => state.postReducer.postData.find((post) => post.id === postId)

export default PostReducer.reducer
