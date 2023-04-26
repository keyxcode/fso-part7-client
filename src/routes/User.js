import { Stack, Container } from "@mantine/core";
import Blog from "../components/Blog";

const User = ({ user }) => (
  <Container>
    <h1>{user.name}</h1>
    <h2>added blogs</h2>
    <Stack>
      {user.blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </Stack>
  </Container>
);

export default User;
