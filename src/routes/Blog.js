import { useState, useContext } from "react";
import { TextInput, Button, Paper, Anchor, Stack } from "@mantine/core";
import blogService from "../services/blogs";
import UserContext from "../UserContext";

const Blog = ({
  blog,
  updateBlogMutation,
  deleteBlogMutation,
  commentBlogMutation,
}) => {
  const [comment, setComment] = useState("");
  const [user, userDispatch] = useContext(UserContext);

  const likeBlog = async (updatedBlog) => {
    blogService.setToken(user.token);
    updateBlogMutation.mutate(updatedBlog);
  };

  const deleteBlog = async (id) => {
    blogService.setToken(user.token);
    deleteBlogMutation.mutate(id);
  };

  const commentBlog = async (id, content) => {
    blogService.setToken(user.token);
    commentBlogMutation.mutate({ id, commentObject: { content } });
  };

  const handleClickLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    likeBlog(updatedBlog);
  };

  const handleClickDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id);
    }
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    commentBlog(blog.id, comment);
    setComment("");
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <Anchor component="a" href={blog.url}>
          {blog.url}
        </Anchor>
      </div>
      <div>likes {blog.likes}</div>
      <div>
        <Button onClick={handleClickLike}>like</Button>
      </div>
      <div>added by {blog.user.username}</div>
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
      <Stack>
        {blog.comments
          .slice()
          .reverse()
          .map((c) => (
            <Paper key={c.id} shadow="xs" p="md" withBorder>
              {c.content}
            </Paper>
          ))}
      </Stack>
    </div>
  );
};

export default Blog;
