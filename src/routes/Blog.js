import { useState } from "react";
import {
  TextInput,
  Button,
  Paper,
  Anchor,
  Container,
  ScrollArea,
  Grid,
  Text,
  Title,
  Flex,
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
      <form onSubmit={handleSubmitComment}>
        <Text fz="xl" fw={700}>
          Comments
        </Text>
        <Grid justify="flex-end">
          <Grid.Col sm={9}>
            <TextInput
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm={3}>
            <Button type="submit" fullWidth>
              add comment
            </Button>
          </Grid.Col>
        </Grid>
      </form>
      <Flex
        mt="md"
        direction="column"
        sx={{
          height: "30vh",
        }}
      >
        <ScrollArea sx={{ flex: 1 }} type="always">
          {blog.comments
            .slice()
            .reverse()
            .map((c) => (
              <Paper key={c.id} p="xs" mb="xs" withBorder>
                {c.content}
              </Paper>
            ))}
        </ScrollArea>
      </Flex>
    </Container>
  );
};

export default Blog;
