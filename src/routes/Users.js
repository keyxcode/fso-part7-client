import { Link } from "react-router-dom";

const Users = ({ usersResult, users }) => {
  if (usersResult.isLoading) {
    return <div>loading users...</div>;
  }
  if (usersResult.isError) {
    return <div>Error: {usersResult.error}</div>;
  }
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

export default Users;
