import { Link } from "react-router-dom";

const Navigation = ({ user, handleLogout }) => (
  <div>
    <Link to={"/"}>blogs</Link>
    <Link to={"/users"}>users</Link>
    {user && `${user.name} logged in`}
    {user && <button onClick={handleLogout}>logout</button>}
  </div>
);

export default Navigation;
