import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch,
} from "react-router-dom";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import usersService from "./services/users";
import NotiContext from "./NotiContext";
import UserContext from "./UserContext";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [noti, notiDispatch] = useContext(NotiContext);
  const [user, userDispatch] = useContext(UserContext);
  const queryClient = useQueryClient();
  const blogResult = useQuery("blogs", blogService.getAll);

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

  const createBlog = async (newBlog) => {
    blogService.setToken(user.token);
    createBlogMutation.mutate(newBlog);
  };

  const likeBlog = async (updatedBlog) => {
    blogService.setToken(user.token);
    updateBlogMutation.mutate(updatedBlog);
  };

  const deleteBlog = async (id) => {
    blogService.setToken(user.token);
    deleteBlogMutation.mutate(id);
  };

  if (blogResult.isLoading) {
    return <div>loading data...</div>;
  }
  if (blogResult.isError) {
    return <div>Error: {blogResult.error}</div>;
  }
  const blogs = blogResult.data;
  const sortedBlogs = blogs.sort((blogA, blogB) => blogB.likes - blogA.likes);

  const Users = () => {
    const usersResult = useQuery("users", usersService.getAll);

    if (usersResult.isLoading) {
      return <div>loading users...</div>;
    }
    if (usersResult.isError) {
      return <div>Error: {usersResult.error}</div>;
    }
    const users = usersResult.data;

    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const User = () => {};

  return (
    <div>
      <Notification />

      {user && (
        <div>
          <h2>blogs</h2>
          <div>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
          </div>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <div>
                <Togglable buttonLabel="create new blog">
                  <BlogForm createBlog={createBlog} />
                </Togglable>
                {sortedBlogs.map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    likeBlog={likeBlog}
                    deleteBlog={deleteBlog}
                    currentUsername={user.username}
                  />
                ))}
              </div>
            ) : (
              <LoginForm
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
              />
            )
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
