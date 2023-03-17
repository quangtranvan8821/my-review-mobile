import { createSlice } from "@reduxjs/toolkit";
import { actionLogin } from "./action";
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
        logout: (state) => {
            state.token = null;
            state.info = null;
            state.listPermission = [];
            state.isLoading = false;
            state.hasErr = false;
      }
  },
  extraReducers: (action) => {
    action.addCase(actionLogin.pending, (state) => {
      state.isLoading = true;
      state.hasErr = false;
    });
    action.addCase(actionLogin.fulfilled, (state, action) => {
      state.token = action.token;
      state.info = action.info;
      state.listPermission = action.listPermission;
      state.isLoading = false;
      state.hasErr = false;
    });
    action.addCase(actionLogin.rejected, (state) => {
      state.isLoading = false;
      state.hasErr = true;
    });
  },
})
export const { logout } = AuthReducer.actions
export const isLoading = state => state.auth.isLoading
export const hasErr = state => state.auth.hasErr
export const token = state => state.auth.token
export const info = state => state.auth.info
export const listPermission = state => state.auth.listPermission
export default AuthReducer.reducer
