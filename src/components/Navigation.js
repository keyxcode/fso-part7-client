import { Link } from "react-router-dom";
import { Header, Group, rem, Button } from "@mantine/core";

const HEADER_HEIGHT = rem(60);

const Navigation = ({ user, handleLogout }) => (
  <Header height={HEADER_HEIGHT}>
    <Group spacing={20}>
      <Link to={"/"}>blogs</Link>
      <Link to={"/users"}>users</Link>
      {user.name} logged in
      <Button onClick={handleLogout}>logout</Button>
    </Group>
  </Header>
);

export default Navigation;
