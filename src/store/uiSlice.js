import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    snackbar: {
      isSnackbarOpen: false,
      type: "success",
      text: "",
    },
  },

  reducers: {
    openSnackbar(state, action) {
      state.snackbar = {
        ...action.payload,
        isSnackbarOpen: true,
      };
    },
    closeSnackbar(state) {
      state.snackbar = {
        isSnackbarOpen: false,
        type: "success",
        text: "",
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
