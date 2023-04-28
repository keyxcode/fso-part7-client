import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlogs(state, action) {
      state.push(action.payload);
    },
    vote(state, action) {
      const updatedBlog = action.payload;

      return state.map((anecdote) =>
        anecdote.id !== updatedBlog.id ? anecdote : updatedBlog
      );
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlogs, vote, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  const anecdotes = await blogService.getAll();
  dispatch(setBlogs(anecdotes));
};

export const createBlog = (content) => async (dispatch) => {
  const newAnecdote = await blogService.createNew(content);
  dispatch(appendBlogs(newAnecdote));
};

export const voteBlog = (anecdote) => async (dispatch) => {
  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const updatedAnecdote = await blogService.update(
    votedAnecdote.id,
    votedAnecdote
  );
  dispatch(vote(updatedAnecdote));
};

export default blogSlice.reducer;
