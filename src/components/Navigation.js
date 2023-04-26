import { Link } from "react-router-dom";
import { Header, Flex, Button, Anchor } from "@mantine/core";
import { useContext } from "react";
import UserContext from "../UserContext";

const Navigation = ({ notifyWith }) => {
  const [user, userDispatch] = useContext(UserContext);

  const handleLogout = () => {
    userDispatch({ type: "CLEAR" });
    window.localStorage.removeItem("loggedBlogUser");
    const msg = "logout success";
    notifyWith(msg);
  };

  return (
    <Header height={60} p="md">
      <Flex justify="space-between" wrap="wrap">
        <Flex gap="md">
          <Anchor component={Link} to={"/"}>
            blogs
          </Anchor>
          <Anchor component={Link} to={"/users"}>
            users
          </Anchor>
        </Flex>
        <Flex gap="md">
          {user.name}
          <Button onClick={handleLogout} color="red">
            logout
          </Button>
        </Flex>
      </Flex>
    </Header>
  );
};

export default Navigation;
