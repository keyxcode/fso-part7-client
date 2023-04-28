/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { setNotification } from "./reducers/notiReducer";
import { appendBlogs, setBlogs, like, remove } from "./reducers/blogReducer";
import { clearUser, setUser } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  const currentUser = useSelector(({ user }) => user);
  const allBlogs = useSelector(({ blogs }) =>
    blogs.slice().sort((blogA, blogB) => blogB.likes - blogA.likes)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((b) => dispatch(setBlogs(b)));
  }, [dispatch]);

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem("loggedBlogUser");

    if (loggedBlogUser) {
      const u = JSON.parse(loggedBlogUser);
      dispatch(setUser(u));
      blogService.setToken(u.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(loggedUser));

      const msg = `welcome ${loggedUser.name}`;
      dispatch(setNotification(msg));

      setUser(loggedUser);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);

      const msg = "wrong user name or password";
      dispatch(setNotification(msg, "ERROR"));
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    window.localStorage.removeItem("loggedBlogUser");

    const msg = "logout success";
    dispatch(setNotification(msg));
  };

  const createBlog = async ({ title, author, url }) => {
    try {
      blogService.setToken(currentUser.token);
      const newBlog = await blogService.create({ title, author, url });

      const msg = `a new blog ${title} by ${author} added`;
      dispatch(setNotification(msg));

      dispatch(appendBlogs(newBlog));
    } catch (exception) {
      const msg = `an error occured: ${exception.message}`;
      dispatch(setNotification(msg, "ERROR"));
    }
  };

  const likeBlog = async (updatedBlog) => {
    try {
      blogService.setToken(currentUser.token);
      await blogService.update(updatedBlog.id, updatedBlog);

      const msg = `liked blog ${updatedBlog.title} by ${updatedBlog.author}`;
      dispatch(setNotification(msg));

      dispatch(like(updatedBlog));
    } catch (exception) {
      const msg = `an error occured: ${exception.message}`;
      dispatch(setNotification(msg, "ERROR"));
    }
  };

  const deleteBlog = async (id) => {
    try {
      blogService.setToken(currentUser.token);
      await blogService.deleteBlog(id);

      dispatch(remove(id));

      const msg = `deletion success`;
      dispatch(setNotification(msg));
    } catch (exception) {
      const msg = `an error occured: ${exception.message}`;
      dispatch(setNotification(msg, "ERROR"));
    }
  };

  return (
    <div>
      <Notification />
      {currentUser && (
        <div>
          <h2>blogs</h2>
          <div>
            {currentUser.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="create new blog">
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {allBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              currentUsername={currentUser.username}
            />
          ))}
        </div>
      )}
      {!currentUser && (
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
