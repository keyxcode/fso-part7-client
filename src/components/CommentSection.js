import { useState } from "react";
import {
  TextInput,
  Button,
  Paper,
  Box,
  ScrollArea,
  Grid,
  Text,
} from "@mantine/core";
import { useMutation, useQueryClient } from "react-query";
import blogService from "../services/blogs";
import { useUserValue } from "../UserContext";

const CommentSection = ({ blog, notifyWith }) => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const user = useUserValue();

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

  const handleSubmitComment = (event) => {
    event.preventDefault();

    const { id } = blog;
    const commentObject = { content: comment };

    blogService.setToken(user.token);
    commentBlogMutation.mutate({ id, commentObject });

    setComment("");
  };

  return (
    <Box>
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

      {!blog.comments.length && <Text>There are no comments here</Text>}

      <ScrollArea.Autosize mah={300} mt="md" type="always">
        {blog.comments
          .slice()
          .reverse()
          .map((c) => (
            <Paper key={c.id} p="xs" mb="xs" withBorder>
              {c.content}
            </Paper>
          ))}
      </ScrollArea.Autosize>
    </Box>
  );
};

export default CommentSection;
