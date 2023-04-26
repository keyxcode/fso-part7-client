import { TextInput, Button, Title, Container, Flex } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login";
import { useUserDispatch } from "../UserContext";

const LoginForm = ({ notifyWith }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userDispatch = useUserDispatch();

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(loggedUser));

      const msg = `welcome ${loggedUser.name}`;
      notifyWith(msg);

      navigate("/");
      userDispatch({ type: "SET", payload: loggedUser });

      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);

      const msg = "wrong user name or password";
      notifyWith(msg, "ERROR");
    }
  };

  const handleClickGuest = () => {
    setUsername("guest");
    setPassword("123");
  };

  return (
    <Container mt="md">
      <form onSubmit={handleLogin}>
        <Title>log in to application</Title>
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
        <Flex gap="md">
          <Button id="login-button" type="submit" mt="md">
            login
          </Button>
          <Button
            type="button"
            mt="md"
            color="green"
            variant="outline"
            onClick={handleClickGuest}
          >
            use guest credentials
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default LoginForm;
