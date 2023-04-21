import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("form calls the event handler with the right details when a new blog is created", async () => {
  const createBlog = jest.fn();
  render(<BlogForm createBlog={createBlog} />);

  const blogInput = screen.getByPlaceholderText("blog name");
  const authorInput = screen.getByPlaceholderText("author name");
  const urlInput = screen.getByPlaceholderText("www.something.com");
  const button = screen.getByText("create");

  const user = userEvent.setup();

  fireEvent.change(blogInput, {
    target: { value: "my cool blog" },
  });

  fireEvent.change(authorInput, {
    target: { value: "my name" },
  });

  fireEvent.change(urlInput, {
    target: { value: "mywebsite.com" },
  });

  await user.click(button);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog).toHaveBeenCalledWith({
    title: "my cool blog",
    author: "my name",
    url: "mywebsite.com",
  });
});
