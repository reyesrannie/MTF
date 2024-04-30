import { configureStore } from "@reduxjs/toolkit";
import { jsonServerAPI } from "./request";
import authSlice from "../slice/authSlice";
import setupSlice from "../slice/setupSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    setup: setupSlice,

    [jsonServerAPI.reducerPath]: jsonServerAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonServerAPI.middleware),
});
