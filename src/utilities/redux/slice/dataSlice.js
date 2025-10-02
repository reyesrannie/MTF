import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lessonData: null,
  contentData: null,
  imageData: null,
  module: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setLesson: (state, action) => {
      state.lessonData = action.payload;
    },
    setContent: (state, action) => {
      state.contentData = action.payload;
    },
    setModule: (state, action) => {
      state.module = action.payload;
    },
    setImageData: (state, action) => {
      state.imageData = action.payload;
    },
    resetData: () => {
      return initialState;
    },
  },
});

export const { setLesson, setContent, setModule, setImageData, resetData } =
  dataSlice.actions;

export default dataSlice.reducer;
