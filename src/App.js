import { useState, useEffect, useContext } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import NotiContext from "./NotiContext";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notiInfo, setNotiInfo] = useState({ message: null });
  const [noti, notiDispatch] = useContext(NotiContext);

  useEffect(() => {
    blogService.getAll().then((b) => setBlogs(b));
  }, []);

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem("loggedBlogUser");

    if (loggedBlogUser) {
      const u = JSON.parse(loggedBlogUser);
      setUser(u);
      blogService.setToken(u.token);
    }
  }, []);

  const notifyWith = (message, type = "SUCCESS") => {
    notiDispatch({ type, payload: message });

    setTimeout(() => {
      notiDispatch({ type: "CLEAR" });
    }, 3000);
  };

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
    try {
      blogService.setToken(user.token);
      const newBlog = await blogService.create({ title, author, url });

      const msg = `a new blog ${title} by ${author} added`;
      notifyWith(msg);

      setBlogs(blogs.concat(newBlog));
    } catch (exception) {
      const msg = `an error occured: ${exception.message}`;
      notifyWith(msg, "ERROR");
    }
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
    try {
      blogService.setToken(user.token);
      await blogService.deleteBlog(id);

      setBlogs(blogs.filter((blog) => blog.id !== id));

      const msg = `deletion success`;
      notifyWith(msg);
    } catch (exception) {
      const msg = `an error occured: ${exception.message}`;
      notifyWith(msg, "ERROR");
    }
  };

  const sortedBlogs = blogs.sort((blogA, blogB) => blogB.likes - blogA.likes);

  return (
    <div>
      <Notification notiInfo={notiInfo} />
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
