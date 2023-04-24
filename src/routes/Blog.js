import PropTypes from "prop-types";

const Blog = ({ blog, likeBlog, deleteBlog, currentUsername }) => {
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

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes} <button onClick={handleClickLike}>like</button>{" "}
      </div>
      <div>added by {blog.user.username}</div>
      <div>
        {blog.user.username === currentUsername && (
          <button onClick={handleClickDelete}>delete</button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentUsername: PropTypes.string.isRequired,
};

export default Blog;
