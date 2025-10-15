import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjectData: null,
  lessonData: null,
  contentData: null,
  imageData: null,
  module: [],
  updateDownloadProgress: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSubjectData: (state, action) => {
      state.subjectData = action.payload;
    },
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
    setUpdateDownloadProgress: (state, action) => {
      state.updateDownloadProgress = action.payload;
    },
    resetData: () => {
      return initialState;
    },
  },
});

export const {
  setSubjectData,
  setLesson,
  setContent,
  setModule,
  setImageData,
  setUpdateDownloadProgress,
  resetData,
} = dataSlice.actions;

export default dataSlice.reducer;
