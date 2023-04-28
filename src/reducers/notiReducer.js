import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, type: null };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationChange(state, action) {
      return action.payload;
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const { notificationChange, clearNotification } =
  notificationSlice.actions;

export const setNotification =
  (message, type = "INFO") =>
  (dispatch) => {
    dispatch(notificationChange({ message, type }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
  };

export default notificationSlice.reducer;
