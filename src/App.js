import { useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { Routes, Route, useMatch } from "react-router-dom";
import { MantineProvider, AppShell, Container, Title } from "@mantine/core";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Navigation from "./components/Navigation";
import blogService from "./services/blogs";
import usersService from "./services/users";
import UserContext from "./UserContext";
import { useNotiDispatch } from "./NotiContext";
import UserRoute from "./routes/User";
import UsersRoute from "./routes/Users";
import BlogRoute from "./routes/Blog";
import HomeRoute from "./routes/Home";

const App = () => {
  const [user, userDispatch] = useContext(UserContext);
  const notiDispatch = useNotiDispatch();

  const blogResult = useQuery("blogs", blogService.getAll);
  const usersResult = useQuery("users", usersService.getAll);

  const matchUser = useMatch("users/:id");
  const matchBlog = useMatch("blogs/:id");

  const notifyWith = (message, type = "SUCCESS") => {
    notiDispatch({ type, payload: message });

    setTimeout(() => {
      notiDispatch({ type: "CLEAR" });
    }, 3000);
  };

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem("loggedBlogUser");

    if (loggedBlogUser) {
      const u = JSON.parse(loggedBlogUser);
      userDispatch({ type: "SET", payload: u });
      blogService.setToken(u.token);
    }
  }, []);

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
          <LoginForm notifyWith={notifyWith} />
        </Container>
      </MantineProvider>
    );
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
        header={<Navigation notifyWith={notifyWith} />}
      >
        <Container>
          <Notification />
          <Title
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            ta="center"
            order={1}
            size={50}
            mb="md"
          >
            j&#39;aime
          </Title>
          <Container>
            <Routes>
              <Route
                path="/"
                element={
                  <HomeRoute blogs={sortedBlogs} notifyWith={notifyWith} />
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
                  <BlogRoute blog={matchedBlog} notifyWith={notifyWith} />
                }
              />
            </Routes>
          </Container>
        </Container>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
