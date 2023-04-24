import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Paper, Text } from "@mantine/core";

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
    <Paper
      shadow="xs"
      p="md"
      component={Link}
      to={`blogs/${blog.id}`}
      withBorder
    >
      <Text>
        {blog.title} {blog.author}
      </Text>
    </Paper>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
