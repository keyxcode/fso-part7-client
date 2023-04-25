import { TextInput, Button } from "@mantine/core";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => (
  <form onSubmit={handleLogin}>
    <h1>log in to application</h1>
    username
    <TextInput
      id="username"
      type="text"
      value={username}
      name="Username"
      onChange={({ target }) => setUsername(target.value)}
    />
    password
    <TextInput
      id="password"
      type="password"
      value={password}
      name="Password"
      onChange={({ target }) => setPassword(target.value)}
    />
    <Button id="login-button" type="submit">
      login
    </Button>
  </form>
);

export default LoginForm;
