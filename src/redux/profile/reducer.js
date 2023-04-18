import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchApi } from '../../lib/fetchAPI'
const initialState = {
  data: [],
  isloading: false,
  haserr: false,
}

export const getProfile = createAsyncThunk('profile/get', async (body) => {
  const res = await fetchApi('/api/v1/user/profile')
  if (res.status === 200) {
    return res.data
  }
  return res.data.json()
})

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true
      state.hasErr = false
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.data = action.payload
      state.isLoading = false
      state.hasErr = false
    })
    builder.addCase(getProfile.rejected, (state) => {
      state.isLoading = false
      state.hasErr = true
    })
  },
})
export const profile = (state) => state.profileReducer.data

export default profileReducer.reducer
