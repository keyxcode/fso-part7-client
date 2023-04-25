import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Routes, Route, useMatch, useNavigate } from "react-router-dom";
import {
  MantineProvider,
  AppShell,
  Container,
  Stack,
  Text,
} from "@mantine/core";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Navigation from "./components/Navigation";
import blogService from "./services/blogs";
import loginService from "./services/login";
import usersService from "./services/users";
import NotiContext from "./NotiContext";
import UserContext from "./UserContext";
import UserRoute from "./routes/User";
import UsersRoute from "./routes/Users";
import BlogRoute from "./routes/Blog";
import HomeRoute from "./routes/Home";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [noti, notiDispatch] = useContext(NotiContext);
  const [user, userDispatch] = useContext(UserContext);

  const queryClient = useQueryClient();
  const blogResult = useQuery("blogs", blogService.getAll);
  const usersResult = useQuery("users", usersService.getAll);

  const matchUser = useMatch("users/:id");
  const matchBlog = useMatch("blogs/:id");
  const navigate = useNavigate();

  const notifyWith = (message, type = "SUCCESS") => {
    notiDispatch({ type, payload: message });

    setTimeout(() => {
      notiDispatch({ type: "CLEAR" });
    }, 3000);
  };

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

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: ({ title, author }) => {
      queryClient.invalidateQueries("blogs");
      const msg = `liked blog ${title} by ${author}`;
      notifyWith(msg);
    },
    onError: ({ message }) => {
      const msg = `an error occured: ${message}`;
      notifyWith(msg, "ERROR");
    },
  });

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      const msg = `deletion success`;
      notifyWith(msg);
    },
    onError: ({ message }) => {
      const msg = `an error occured: ${message}`;
      notifyWith(msg, "ERROR");
    },
  });

  const commentBlogMutation = useMutation(blogService.commentBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      notifyWith("comment posted");
    },
    onError: ({ message }) => {
      const msg = `an error occured: ${message}`;
      notifyWith(msg, "ERROR");
    },
  });

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem("loggedBlogUser");

    if (loggedBlogUser) {
      const u = JSON.parse(loggedBlogUser);
      userDispatch({ type: "SET", payload: u });
      blogService.setToken(u.token);
    }
  }, []);

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

  const handleLogout = () => {
    userDispatch({ type: "CLEAR" });
    window.localStorage.removeItem("loggedBlogUser");
    const msg = "logout success";
    notifyWith(msg);
  };

  const likeBlog = async (updatedBlog) => {
    blogService.setToken(user.token);
    updateBlogMutation.mutate(updatedBlog);
  };

  const deleteBlog = async (id) => {
    blogService.setToken(user.token);
    deleteBlogMutation.mutate(id);
  };

  const commentBlog = async (id, comment) => {
    blogService.setToken(user.token);
    commentBlogMutation.mutate({ id, commentObject: { content: comment } });
  };

  if (blogResult.isLoading) {
    return <div>loading data...</div>;
  }
  if (blogResult.isError) {
    return <div>Error: {blogResult.error}</div>;
  }
  const blogs = blogResult.data;
  const sortedBlogs = blogs.sort((blogA, blogB) => blogB.likes - blogA.likes);
  const users = usersResult.data;

  const matchedUser = matchUser
    ? users.find((u) => u.id === matchUser.params.id)
    : null;
  const matchedBlog = matchBlog
    ? blogs.find((b) => b.id === matchBlog.params.id)
    : null;

  if (!user) {
    return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Container>
          <Notification />
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Container>
      </MantineProvider>
    );
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell header={<Navigation user={user} handleLogout={handleLogout} />}>
        <Container>
          <Notification />
          <Text
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            ta="center"
            fz={50}
            fw={700}
          >
            blog app
          </Text>

          <Routes>
            <Route
              path="/"
              element={
                <HomeRoute
                  blogs={sortedBlogs}
                  createBlogMutation={createBlogMutation}
                />
              }
            />
            <Route
              path="/users"
              element={<UsersRoute users={users} usersResult={usersResult} />}
            />
            <Route
              path="/users/:id"
              element={<UserRoute user={matchedUser} />}
            />
            <Route
              path="/blogs/:id"
              element={
                <BlogRoute
                  blog={matchedBlog}
                  likeBlog={likeBlog}
                  deleteBlog={deleteBlog}
                  commentBlog={commentBlog}
                  currentUsername={user.name}
                />
              }
            />
          </Routes>
        </Container>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
