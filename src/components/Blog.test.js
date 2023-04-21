import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders title and author only by default", () => {
  const blog = {
    title: "testBook",
    author: "testAuthor",
    url: "google",
    likes: 10,
    user: {
      username: "testUser",
      name: "bill",
      id: "456",
    },
    id: "123",
  };

  render(<Blog blog={blog} />);
  screen.debug();

  screen.getByText("testBook", { exact: false });
  screen.getByText("testAuthor", { exact: false });

  expect(screen.queryByText("google", { exact: false })).not.toBeVisible();
  expect(screen.queryByText("10", { exact: false })).not.toBeVisible();
});

test("clicking the view button shows url and likes", async () => {
  const blog = {
    title: "testBook",
    author: "testAuthor",
    url: "google",
    likes: 10,
    user: {
      username: "testUser",
      name: "bill",
      id: "456",
    },
    id: "123",
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  expect(screen.queryByText("google", { exact: false })).toBeVisible();
  expect(screen.queryByText("10", { exact: false })).toBeVisible();
});

test("clicking the like button twice calls the event handler twice", async () => {
  const blog = {
    title: "testBook",
    author: "testAuthor",
    url: "google",
    likes: 10,
    user: {
      username: "testUser",
      name: "bill",
      id: "456",
    },
    id: "123",
  };

  const mockHandler = jest.fn();
  render(<Blog blog={blog} likeBlog={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("like");
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
