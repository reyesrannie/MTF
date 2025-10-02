import { configureStore } from "@reduxjs/toolkit";
import { jsonServerAPI } from "./request";
import authSlice from "../slice/authSlice";
import setupSlice from "../slice/setupSlice";
import dataSlice from "../slice/dataSlice";
import modalSlice from "../slice/modalSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    setup: setupSlice,
    data: dataSlice,
    modal: modalSlice,

    [jsonServerAPI.reducerPath]: jsonServerAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonServerAPI.middleware),
});
