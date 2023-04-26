import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Paper, Text, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  blogPaper: {
    padding: theme.spacing.md,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[1],
    },
  },
}));

const Blog = ({ blog }) => {
  const { classes } = useStyles();

  return (
    <Paper
      component={Link}
      to={`/blogs/${blog.id}`}
      withBorder
      shadow="xs"
      className={classes.blogPaper}
      p="md"
    >
      <Text>
        {blog.title} - {blog.author}
      </Text>
    </Paper>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
