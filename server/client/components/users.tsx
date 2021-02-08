import { useUsersContext } from '../context/usersContext'

const Users = (): JSX.Element | null => {
  const users = useUsersContext()
  return users.length ? (
    <div>
      <h1>user list</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  ) : null
}

export default Users
