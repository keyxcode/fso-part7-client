import { Container, ScrollArea, Stack } from "@mantine/core";
import { useMutation, useQueryClient } from "react-query";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";
import Blog from "../components/Blog";
import { useUserValue } from "../UserContext";
import blogService from "../services/blogs";

const Home = ({ blogs, notifyWith }) => {
  const user = useUserValue();
  const queryClient = useQueryClient();

  const createBlogMutation = useMutation(blogService.create, {
    onSuccess: ({ title, author }) => {
      queryClient.invalidateQueries("blogs");
      const msg = `a new blog ${title} by ${author} added`;
      notifyWith(msg);
    },
    onError: ({ message }) => {
      const msg = `an error occured: ${message}`;
      notifyWith(msg, "ERROR");
    },
  });

  const createBlog = async (newBlog) => {
    blogService.setToken(user.token);
    createBlogMutation.mutate(newBlog);
  };

  return (
    <Container>
      <Togglable buttonLabel="create new">
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <ScrollArea.Autosize mah={500} type="always">
        <Stack>
          {blogs
            .slice()
            .reverse()
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </Stack>
      </ScrollArea.Autosize>
    </Container>
  );
};

export default Home;
