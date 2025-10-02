import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  openModalImage: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
    setOpenModalImage: (state, action) => {
      state.openModalImage = action.payload;
    },
    resetModal: () => {
      return initialState;
    },
  },
});

export const { setOpenModal, setOpenModalImage, resetModal } =
  modalSlice.actions;

export default modalSlice.reducer;
