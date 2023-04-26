import { TextInput, Button } from "@mantine/core";
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

  return (
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
};

export default LoginForm;
