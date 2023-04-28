import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlogs(state, action) {
      state.push(action.payload);
    },
    like(state, action) {
      const updatedBlog = action.payload;

      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
    remove(state, action) {
      const id = action.payload;

      return state.filter((blog) => blog.id !== id);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlogs, like, remove, setBlogs } = blogSlice.actions;

export default blogSlice.reducer;
