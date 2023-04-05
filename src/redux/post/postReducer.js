import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "../../lib/FetchAPI";


const initialState = {
    postData: [],
    isloading: false,
    haserr:false

}
export const loadData = createAsyncThunk('post/loadpost',async () => {
    const res = await fetchApi('/post')
    if (res.status == 200) {
        return  await res.data
      }
      return await res.json() 
})
export const postDelete = createAsyncThunk('post/delete', async (body) => {
    const res = await fetchApi('/postDelete','post',body)
    if (res.status == 200) {
        return  await res.data
      }
      return await res.json() 
})
const PostReducer = createSlice({
    initialState,
    name:'post',
    reducers: {},
    extraReducers: (builder) => {
        
    }
})
