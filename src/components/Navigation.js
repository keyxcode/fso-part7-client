import { Link } from "react-router-dom";
import { Header, Group, rem, Button, Anchor, Flex } from "@mantine/core";
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
    <Header height={HEADER_HEIGHT} p="md">
      <Flex justify="space-between">
        <Group spacing={20}>
          <Anchor component={Link} to={"/"}>
            blogs
          </Anchor>
          <Anchor component={Link} to={"/users"}>
            users
          </Anchor>
        </Group>
        <Group spacing={20}>
          {user.name} logged in
          <Button onClick={handleLogout} color="red">
            logout
          </Button>
        </Group>
      </Flex>
    </Header>
  );
};

export default Navigation;
