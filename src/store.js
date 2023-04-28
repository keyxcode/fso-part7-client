import { configureStore } from "@reduxjs/toolkit";
import notiReducer from "./reducers/notiReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    notification: notiReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});

export default store;
