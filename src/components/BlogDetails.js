import { Button, Paper, Anchor, Grid, Text, Title, Box } from "@mantine/core";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import blogService from "../services/blogs";
import { useUserValue } from "../UserContext";

const BlogDetails = ({ blog, notifyWith }) => {
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

  return (
    <Box>
      <Paper withBorder p="xl" mb="md">
        <Grid>
          <Grid.Col sm={6}>
            <Title order={1} size="h3">
              {blog.title}
            </Title>
            <Text fz="lg">{blog.author}</Text>
            <Anchor
              component="a"
              href={blog.url}
              sx={{ wordWrap: "break-word" }}
            >
              {blog.url}
            </Anchor>
            <Text fs="italic">added by {blog.user.name}</Text>
          </Grid.Col>
          <Grid.Col sm={6}>
            <Button onClick={handleClickLike} mb="md">
              like
            </Button>{" "}
            {blog.likes}
            <div>
              {blog.user.username === user.username && (
                <Button onClick={handleClickDelete} color="red">
                  delete
                </Button>
              )}
            </div>
          </Grid.Col>
        </Grid>
      </Paper>
    </Box>
  );
};

export default BlogDetails;
