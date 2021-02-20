import api from '../api'
import { useAsync } from './useAsync'
import { User } from '../../src/user/User'

const emptyUsers: User[] = []
const getUsers = () => {
  return api('users')
}

export const useUsers = () => {
  const state = useAsync(getUsers, emptyUsers)
  return Array.isArray(state[0]) ? state[0] : []
}
