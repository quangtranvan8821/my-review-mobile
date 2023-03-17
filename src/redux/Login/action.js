import { LOGIN } from "./const";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {AuthReducer} from "./reducer";
import fetchAPI  from '../../lib/fetchAPI'
export const actionLogin = createAsyncThunk(
    `${AuthReducer.name}/${LOGIN}`,
    async ({body}) => {
        const data = await fetchAPI(`${process.env.MY_REVIEW_SERVER}/login`,'post',body);
        const json = await data.json();
        if (data.status < 200 || data.status >= 300) {
            return console.log('hih', data.msg);
          }
        return json;
    }
);
