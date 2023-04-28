import { configureStore } from "@reduxjs/toolkit";
import notiReducer from "./reducers/notiReducer";
import blogReducer from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    notification: notiReducer,
    blogs: blogReducer,
  },
});

export default store;
