import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN } from "./const";
import { fetchApi } from "../../lib/fetchAPI";

//init state auth
const initialState = {
  token: null,
  isLoading: false,
  hasErr: false,
};

//action login
export const login = createAsyncThunk(`auth/${LOGIN}`, async (body) => {
  const res = await fetchApi(`/api/v1/auth/local/signin`, "post", body);
  if (res.status == 200) {
    return await res.data;
  }
  return await res.json();
});

//logup action
export const logup = createAsyncThunk(`auth/logup`, async (body) => {
  const res = await fetchApi(`/api/v1/auth/local/signup`, "post", body);
  if (res.status == 200) {
    return await res.data;
  }
  return await res.json();
});

//slice
export const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    //khi login dang xu li
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.hasErr = false;
    });
    // xu li login thanh cong
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.access_token;
      state.isLoading = false;
      state.hasErr = false;
    });
    // khi logup xay ra loi
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.hasErr = true;
    });

    builder.addCase(logup.pending, (state) => {
      state.isLoading = true;
      state.hasErr = false;
    });
    // xu li logup thanh cong
    builder.addCase(logup.fulfilled, (state, action) => {
      state.token = action.payload.access_token;
      state.isLoading = false;
      state.hasErr = false;
    });
    // khi logup xay ra loi
    builder.addCase(logup.rejected, (state) => {
      state.isLoading = false;
      state.hasErr = true;
    });
  },
});

export const { logout } = AuthReducer.actions;
export const isloading = (state) => state.authReducer.isLoading;
export const haserr = (state) => state.authReducer.hasErr;
export const token = (state) => state.authReducer.token;
export default AuthReducer.reducer;
