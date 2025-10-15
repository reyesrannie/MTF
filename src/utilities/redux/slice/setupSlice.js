import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onboarding: null,
  selected: "Student",
  isLoading: true,
  showPassword: true,
  hasError: null,
  showCountryCode: false,
  countryCode: null,
  mpin: "",
  cmpin: "",
  confirmPin: false,
  matchPIN: undefined,
  errorPIN: "",
  completedSetup: false,
};

const setupSlice = createSlice({
  name: "setup",
  initialState,
  reducers: {
    setOnboarding: (state, action) => {
      state.onboarding = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setHasError: (state, action) => {
      state.hasError = action.payload;
    },
    setShowCountryCode: (state, action) => {
      state.showCountryCode = action.payload;
    },
    setCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    setMpin: (state, action) => {
      state.mpin = action.payload;
    },
    setCmpin: (state, action) => {
      state.cmpin = action.payload;
    },
    setConfirmPin: (state, action) => {
      state.confirmPin = action.payload;
    },
    setMatchPin: (state, action) => {
      state.matchPIN = action.payload;
    },
    setErrorPIN: (state, action) => {
      state.errorPIN = action.payload;
    },
    setCompletedSetup: (state, action) => {
      state.completedSetup = action.payload;
    },
    resetSetup: () => {
      return initialState;
    },
  },
});

export const {
  setOnboarding,
  setSelected,
  setIsLoading,
  setShowPassword,
  setHasError,
  setShowCountryCode,
  setCountryCode,
  setMpin,
  setCmpin,
  setConfirmPin,
  setMatchPin,
  setErrorPIN,
  setCompletedSetup,
  resetSetup,
} = setupSlice.actions;

export default setupSlice.reducer;
