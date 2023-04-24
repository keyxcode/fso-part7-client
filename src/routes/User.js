import { TextInput, Button, Paper, Anchor } from "@mantine/core";

const User = ({ user }) => (
  <div>
    <h1>{user.name}</h1>
    <h2>added blogs</h2>
    <ul>
      {user.blogs.map((b) => (
        <Paper shadow="xs" p="md" withBorder key={b.id}>
          {b.title}
        </Paper>
      ))}
    </ul>
  </div>
);

export default User;
