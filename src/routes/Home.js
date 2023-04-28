import { ScrollArea, Stack, Flex, Box } from "@mantine/core";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";
import Blog from "../components/Blog";
import { useUserValue } from "../UserContext";
import blogService from "../services/blogs";

const Home = ({ blogs, notifyWith }) => {
  const user = useUserValue();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createBlogMutation = useMutation(blogService.create, {
    onSuccess: ({ title, author }) => {
      queryClient.invalidateQueries("blogs");
      const msg = `a new blog ${title} by ${author} added`;
      notifyWith(msg);
      navigate("/");
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
    <Box sx={{ height: "calc(100vh - 200px)" }}>
      <Flex direction="column" sx={{ height: "100%" }}>
        <Togglable buttonLabel="create new">
          <BlogForm createBlog={createBlog} />
        </Togglable>

        <ScrollArea sx={{ flexGrow: 1 }} type="always">
          <Stack>
            {blogs
              .slice()
              .reverse()
              .map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
          </Stack>
        </ScrollArea>
      </Flex>
    </Box>
  );
};

export default Home;
