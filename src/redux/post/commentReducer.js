import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchApi } from '../../lib/fetchAPI'
const initialState = {
  commentData: [],
  isloading: false,
  haserr: false,
}

// loadData comment
export const loadComments = createAsyncThunk('comment/loadcomment', async (body) => {
  const res = await fetchApi(`/api/v1/comment/find`, 'post', body)
  console.log('saas', res)
  if (res.status == 200) {
    return await res.data
  }
  return await res.json()
})

// add New comment
export const addNewComment = createAsyncThunk('comment/addNewcomment', async (body) => {
  const response = await fetchApi('/api/v1/comment', 'post', body)
  if (response.status == 200 || response.status === 201) {
    return await response.data
  }
  return await res.json()
})

//delete comment
export const commentDeletes = createAsyncThunk('comment/delete', async (body) => {
  const res = await fetchApi(`/api/v1/comment/${body}`, 'delete')
  if (res.status == 200) {
    return await res.data
  }
  return await res.json()
})

const CommentReducer = createSlice({
  initialState,
  name: 'comment',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewComment.pending, (state, action) => {
        state.isloading = true
        state.haserr = false
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.commentData.push(action.payload)
      })
      .addCase(addNewComment.rejected, (state, action) => {
        state.isloading = false
        state.haserr = true
      })
      .addCase(loadComments.pending, (state, action) => {
        state.isloading = true
        state.haserr = false
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.commentData = action.payload
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.isloading = false
        state.haserr = true
      })
  },
})

export const {} = CommentReducer.actions

export const commentData = (state) => state.commentReducer.commentData

export const selectcommentById = (state, commentId) =>
  state.commentReducer.commentData.find((comment) => comment.id === commentId)
export const isloading = (state) => state.commentReducer.isloading
export default CommentReducer.reducer
