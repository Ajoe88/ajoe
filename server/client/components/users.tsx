import { useUsersContext } from "../context/usersContext";

export default () => {
  const users = useUsersContext();
  return (
    <div>
      <h1>user list</h1>
      <ul>
        {users.map((user) => (
          <li>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};
