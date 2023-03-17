import { createSlice } from "@reduxjs/toolkit";
import { actionLogin } from "./action";
import SInfo from "react-native-sensitive-info";

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
           await SInfo.set('token',null, {
                sharedPreferencesName: 'myReviewTokenPreferences',
                keychainService:'myReview'
            })
      }
  },
  extraReducers: (action) => {
    action.addCase(actionLogin.pending, (state) => {
      state.isLoading = true;
      state.hasErr = false;
    });
    action.addCase(actionLogin.fulfilled,async (state, action) => {
      state.token = action.token;
      state.info = action.info;
      state.listPermission = action.listPermission;
      state.isLoading = false;
    state.hasErr = false;
    await SInfo.set('token',action.token, {
            sharedPreferencesName: 'myReviewTokenPreferences',
            keychainService:'myReview'
        })
        
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
