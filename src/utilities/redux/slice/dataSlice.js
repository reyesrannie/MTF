import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjectData: null,
  subjectCompletion: [],
  lessonData: null,
  lessonCompletion: [],
  contentData: null,
  contentCompletion: [],
  componentData: null,
  componentCompletion: [],
  imageData: null,
  module: [],
  moduleCompletion: [],
  updateDownloadProgress: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSubjectData: (state, action) => {
      state.subjectData = action.payload;
    },
    setSubjectCompletion: (state, action) => {
      state.subjectCompletion = action.payload;
    },
    setLesson: (state, action) => {
      state.lessonData = action.payload;
    },
    setLessonCompletion: (state, action) => {
      state.lessonCompletion = action.payload;
    },
    setContent: (state, action) => {
      state.contentData = action.payload;
    },

    setContentCompletion: (state, action) => {
      state.contentCompletion = action.payload;
    },

    setComponent: (state, action) => {
      state.componentData = action.payload;
    },

    setComponentCompletion: (state, action) => {
      state.componentCompletion = action.payload;
    },
    setModule: (state, action) => {
      state.module = action.payload;
    },
    setModuleCompletion: (state, action) => {
      state.moduleCompletion = action.payload;
    },
    setImageData: (state, action) => {
      state.imageData = action.payload;
    },
    setUpdateDownloadProgress: (state, action) => {
      const { componentID, type, progress } = action.payload;
      const existing = state?.updateDownloadProgress?.find(
        (i) => i.objectID === componentID && i?.type === type
      );
      if (existing) {
        existing.progress = progress;
      } else {
        state?.updateDownloadProgress?.push({
          objectID: componentID,
          type: type,
          progress,
        });
      }
    },
    resetData: () => {
      return initialState;
    },
  },
});

export const {
  setSubjectData,
  setSubjectCompletion,
  setLesson,
  setLessonCompletion,
  setContent,
  setContentCompletion,
  setComponent,
  setComponentCompletion,
  setModule,
  setModuleCompletion,
  setImageData,
  setUpdateDownloadProgress,
  resetData,
} = dataSlice.actions;

export default dataSlice.reducer;
