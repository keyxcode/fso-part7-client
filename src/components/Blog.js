import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Paper, Text } from "@mantine/core";

const Blog = ({ blog }) => (
  <Paper component={Link} to={`blogs/${blog.id}`} shadow="xs" p="md" withBorder>
    <Text>
      {blog.title} {blog.author}
    </Text>
  </Paper>
);

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
