import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';
import { LOGIN } from "./const";
import { fetchApi } from "../../lib/FetchAPI";
export const login = createAsyncThunk(
    `auth/${LOGIN}`,
  async (body) => {
        const data = await fetchApi(`${process.env.MY_REVIEW_SERVER}/login`,'post',body);
         console.log(hehe,data); 
        const json = await data.json();
        if (data.status < 200 || data.status >= 300) {
            return console.log('fasle');
          }
        return json;
    }
);
export const AuthReducer = createSlice({
  name: "auth",
  initialState: {
    token: 'hii',
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
    builder.addCase(login.fulfilled,async (state, action) => {
      state.token = action.token;
      state.info = action.info;
      state.listPermission = action.listPermission;
      state.isLoading = false;
    state.hasErr = false;
    await SecureStore.setItemAsync('token',action.token)
        
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.hasErr = true;
    });
  },
})
export const { logout } = AuthReducer.actions
export const isloading = (state) => state.AuthReducer.isLoading
export const haserr = (state) => state.AuthReducer.hasErr
export const token = (state) => state.AuthReducer.token
export const info = (state) => state.AuthReducer.info
export const listpermission = (state) => state.AuthReduceruth.listPermission
export default AuthReducer.reducer
