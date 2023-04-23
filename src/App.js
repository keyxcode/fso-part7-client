import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import NotiContext from "./NotiContext";

const App = () => {
  const [oldblogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [noti, notiDispatch] = useContext(NotiContext);
  const queryClient = useQueryClient();

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
      setUser(u);
      blogService.setToken(u.token);
    }
  }, []);

  const result = useQuery("blogs", blogService.getAll);
  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  const blogs = result.data;
  const sortedBlogs = blogs.sort((blogA, blogB) => blogB.likes - blogA.likes);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(loggedUser));

      const msg = `welcome ${loggedUser.name}`;
      notifyWith(msg);

      setUser(loggedUser);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);

      const msg = "wrong user name or password";
      notifyWith(msg, "ERROR");
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogUser");

    const msg = "logout success";
    notifyWith(msg);
  };

  const createBlog = async ({ title, author, url }) => {
    blogService.setToken(user.token);
    createBlogMutation.mutate({ title, author, url });
  };

  const likeBlog = async (id, updatedBlog) => {
    try {
      blogService.setToken(user.token);
      await blogService.update(id, updatedBlog);

      const updatedBlogs = blogs.map((blog) =>
        blog.id === id ? { ...blog, likes: updatedBlog.likes } : blog
      );
      setBlogs(updatedBlogs);

      const msg = `liked blog ${updatedBlog.title} by ${updatedBlog.author}`;
      notifyWith(msg);
    } catch (exception) {
      const msg = `an error occured: ${exception.message}`;
      notifyWith(msg, "ERROR");
    }
  };

  const deleteBlog = async (id) => {
    blogService.setToken(user.token);
    deleteBlogMutation.mutate(id);
  };

  return (
    <div>
      <Notification />
      {user && (
        <div>
          <h2>blogs</h2>
          <div>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
          </div>
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
      )}
      {!user && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
