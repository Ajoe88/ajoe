import React from 'react'
import { useUsers } from '../hooks/useUsers'
import { User } from '../../src/user/User'

export type Users = Array<User>

export const usersContext = React.createContext<any>({
  users: [],
  error: null,
  isPending: true,
})

export const UserContextProvider: React.FC = ({ children }) => {
  return (
    <usersContext.Provider value={useUsers()}>{children}</usersContext.Provider>
  )
}

export const useUsersContext = (): Users => {
  const context = React.useContext(usersContext)
  if (!context) {
    throw new Error(
      'useUserContext must be used in a component within a UserContextProvider.'
    )
  }
  return context
}
