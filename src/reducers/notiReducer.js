import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationChange(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

export const { notificationChange, clearNotification } =
  notificationSlice.actions;

export const setNotification = (msg) => (dispatch) => {
  dispatch(notificationChange(msg));
  setTimeout(() => {
    dispatch(clearNotification());
  }, 3000);
};

export default notificationSlice.reducer;
