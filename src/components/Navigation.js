import { Link } from "react-router-dom";
import { Header, Group, rem, Button, Anchor } from "@mantine/core";
import { useContext } from "react";
import UserContext from "../UserContext";

const HEADER_HEIGHT = rem(60);

const Navigation = ({ notifyWith }) => {
  const [user, userDispatch] = useContext(UserContext);

  const handleLogout = () => {
    userDispatch({ type: "CLEAR" });
    window.localStorage.removeItem("loggedBlogUser");
    const msg = "logout success";
    notifyWith(msg);
  };

  return (
    <Header height={HEADER_HEIGHT}>
      <Group spacing={20}>
        <Anchor component={Link} to={"/"}>
          blogs
        </Anchor>
        <Anchor component={Link} to={"/users"}>
          users
        </Anchor>
        {user.name} logged in
        <Button onClick={handleLogout}>logout</Button>
      </Group>
    </Header>
  );
};

export default Navigation;
