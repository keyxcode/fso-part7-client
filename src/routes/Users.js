import { Link } from "react-router-dom";
import { Anchor, Table } from "@mantine/core";

const Users = ({ usersResult, users }) => {
  if (usersResult.isLoading) {
    return <div>loading users...</div>;
  }
  if (usersResult.isError) {
    return <div>Error: {usersResult.error}</div>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>user</th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>
              <Anchor component={Link} to={`/users/${u.id}`}>
                {u.name}
              </Anchor>
            </td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Users;
