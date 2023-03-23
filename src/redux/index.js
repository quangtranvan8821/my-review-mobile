import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./Auth/reducer";
export default store = configureStore({
    reducer: {
        authReducer: AuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});