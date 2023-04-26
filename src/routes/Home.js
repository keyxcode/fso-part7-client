import { Container, Stack } from "@mantine/core";
import { useContext } from "react";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";
import Blog from "../components/Blog";
import UserContext from "../UserContext";
import blogService from "../services/blogs";

const Home = ({ blogs, createBlogMutation }) => {
  const [user, userDispatch] = useContext(UserContext);

  const createBlog = async (newBlog) => {
    blogService.setToken(user.token);
    createBlogMutation.mutate(newBlog);
  };

  return (
    <Container>
      <Togglable buttonLabel="create new">
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <Stack>
        {blogs
          .slice()
          .reverse()
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </Stack>
    </Container>
  );
};

export default Home;
