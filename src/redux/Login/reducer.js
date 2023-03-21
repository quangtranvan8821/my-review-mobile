import { createSlice,createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';
import { LOGIN } from "./const";
import { fetchApi } from "../../lib/FetchAPI";
export const login = createAsyncThunk(
    `auth/${LOGIN}`,
  async (body) => {
    const res = await fetchApi(`/auth/login`, 'post', body); 
    if (res.status == 200) {
      return res.data
    }
    return res.json()
    }
);
export const AuthReducer = createSlice({
  name: "auth",
  initialState: {
    token: null,
    info: null,
    listPermission: [],
    isLoading: false,
    hasErr: false,
  },
    reducer: {
        logout: async (state) => {
            state.token = null;
            state.info = null;
            state.listPermission = [];
            state.isLoading = false;
            state.hasErr = false;
            await SecureStore.setItemAsync('token',null)

      }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.hasErr = false;
    });
    builder.addCase(login.fulfilled,(state,action) => {
      state.token = action.payload.token;
      state.info = action.info;
      state.listPermission = action.listPermission;
      state.isLoading = false;
      state.hasErr = false;  
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.hasErr = true;
    });
  },
})
export const { logout } = AuthReducer.actions
export const isloading = (state) => state.authReducer.isLoading
export const haserr = (state) => state.authReducer.hasErr
export const token = (state) => state.authReducer.token
export const info = (state) => state.AuthReducer.info
export const listpermission = (state) => state.AuthReduceruth.listPermission
export default AuthReducer.reducer
