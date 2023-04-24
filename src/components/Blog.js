import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <Link to={`blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
