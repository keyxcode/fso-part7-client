import { Stack, Container, Text, ScrollArea } from "@mantine/core";
import Blog from "../components/Blog";

const User = ({ user }) => (
  <Container>
    <Text fz="xl" fw={700}>
      {user.name}
    </Text>
    <Text fz="lg">added blogs</Text>
    <ScrollArea.Autosize mah={500} type="always">
      <Stack>
        {user.blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </Stack>
    </ScrollArea.Autosize>
  </Container>
);

export default User;
