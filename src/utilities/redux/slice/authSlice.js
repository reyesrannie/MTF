import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "1",
  userData: null,
  changePass: false,
  facebookData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setChangePass: (state, action) => {
      state.changePass = action.payload;
    },
    setFacebookData: (state, action) => {
      state.facebookData = action.payload;
    },
    resetAuth: () => {
      return initialState;
    },
  },
});

export const {
  setToken,
  setUserData,
  setChangePass,
  resetAuth,
  setFacebookData,
} = authSlice.actions;

export default authSlice.reducer;
