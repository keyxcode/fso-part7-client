import { useState } from "react";
import {
  TextInput,
  Button,
  Paper,
  Anchor,
  Container,
  ScrollArea,
} from "@mantine/core";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import blogService from "../services/blogs";
import { useUserValue } from "../UserContext";

const Blog = ({ blog, notifyWith }) => {
  const [comment, setComment] = useState("");
  const user = useUserValue();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: ({ title, author }) => {
      queryClient.invalidateQueries("blogs");
      const msg = `liked blog ${title} by ${author}`;
      notifyWith(msg);
    },
    onError: ({ message }) => {
      const msg = `an error occured: ${message}`;
      notifyWith(msg, "ERROR");
    },
  });

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      const msg = `deletion success`;
      notifyWith(msg);
      navigate("/");
    },
    onError: ({ message }) => {
      const msg = `an error occured: ${message}`;
      notifyWith(msg, "ERROR");
    },
  });

  const commentBlogMutation = useMutation(blogService.commentBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      notifyWith("comment posted");
    },
    onError: ({ message }) => {
      const msg = `an error occured: ${message}`;
      notifyWith(msg, "ERROR");
    },
  });

  const handleClickLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    blogService.setToken(user.token);
    updateBlogMutation.mutate(updatedBlog);
  };

  const handleClickDelete = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.setToken(user.token);
      deleteBlogMutation.mutate(blog.id);
    }
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();

    const { id } = blog;
    const commentObject = { content: comment };

    blogService.setToken(user.token);
    commentBlogMutation.mutate({ id, commentObject });

    setComment("");
  };

  return (
    <Container>
      <h1>{blog.title}</h1>
      <h2>{blog.author}</h2>
      <div>
        <Anchor component="a" href={blog.url}>
          {blog.url}
        </Anchor>
      </div>
      <div>likes {blog.likes}</div>
      <div>
        <Button onClick={handleClickLike}>like</Button>
      </div>
      <div>added by {blog.user.name}</div>
      <div>
        {blog.user.username === user.username && (
          <Button onClick={handleClickDelete} color="red">
            delete
          </Button>
        )}
      </div>
      <h2>comments</h2>
      <form onSubmit={handleSubmitComment}>
        <TextInput
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <Button type="submit">add comment</Button>
      </form>
      <ScrollArea.Autosize mah={300} type="always">
        {blog.comments
          .slice()
          .reverse()
          .map((c) => (
            <Paper key={c.id} shadow="xs" p="md" withBorder>
              {c.content}
            </Paper>
          ))}
      </ScrollArea.Autosize>
    </Container>
  );
};

export default Blog;
