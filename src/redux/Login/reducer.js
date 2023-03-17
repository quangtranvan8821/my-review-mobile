import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import SInfo from "react-native-sensitive-info";
import { LOGIN } from "./const";
import fetchAPI  from '../../lib/fetchAPI'
export const login = createAsyncThunk(
    `auth/${LOGIN}`,
    async ({body}) => {
        const data = await fetchAPI(`${process.env.MY_REVIEW_SERVER}/login`,'post',body);
        const json = await data.json();
        if (data.status < 200 || data.status >= 300) {
            return console.log('hih', data.msg);
          }
        return json;
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
           await SInfo.set('token',null, {
                sharedPreferencesName: 'myReviewTokenPreferences',
                keychainService:'myReview'
            })
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
    await SInfo.set('token',action.token, {
            sharedPreferencesName: 'myReviewTokenPreferences',
            keychainService:'myReview'
        })
        
    });
    builder.addCase(login.rejected, (state) => {
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
