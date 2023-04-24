import { TextInput, Button, Group } from "@mantine/core";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => (
  <form onSubmit={handleLogin}>
    <h1>log in to application</h1>
    <Group>
      username
      <TextInput
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </Group>
    <Group>
      password
      <TextInput
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </Group>
    <Button id="login-button" type="submit">
      login
    </Button>
  </form>
);

export default LoginForm;
