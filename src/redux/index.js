import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./Login/reducer";
export default store = configureStore({

    reducer: {
       AuthReducer: AuthReducer
    }
});