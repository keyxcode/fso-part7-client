import { useState } from "react";
import PropTypes from "prop-types";
import { TextInput, Button, Paper, Anchor } from "@mantine/core";

const Blog = ({ blog, likeBlog, deleteBlog, commentBlog, currentUsername }) => {
  const [comment, setComment] = useState("");

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
      <div>
        likes {blog.likes} <Button onClick={handleClickLike}>like</Button>{" "}
      </div>
      <div>added by {blog.user.username}</div>
      <div>
        {blog.user.username === currentUsername && (
          <button onClick={handleClickDelete}>delete</button>
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
      {blog.comments
        .slice()
        .reverse()
        .map((c) => (
          <Paper key={c.id} shadow="xs" p="md" withBorder>
            {c.content}
          </Paper>
        ))}
    </div>
  );
};

Blog.propTypes = {
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentUsername: PropTypes.string.isRequired,
};

export default Blog;
