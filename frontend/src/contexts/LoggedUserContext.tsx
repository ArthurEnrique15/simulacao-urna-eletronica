import { ReactNode, createContext, useState } from 'react'

export type LoggedUser = {
  name: string
  token: string
  alreadyVoted: boolean
}

interface LoggedUserContextType {
  loggedUser: LoggedUser | null
  login: (user: LoggedUser) => void
  logout: () => void
  vote: () => void
}

interface LoggedUserProviderProps {
  children: ReactNode
}

export const LoggedUserContext = createContext({} as LoggedUserContextType)

export function LoggedUserProvider({ children }: LoggedUserProviderProps) {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null)

  const login = (user: LoggedUser) => {
    setLoggedUser(user)
  }

  const logout = () => {
    setLoggedUser(null)
  }

  const vote = () => {
    if (loggedUser && !loggedUser.alreadyVoted) {
      setLoggedUser({ ...loggedUser, alreadyVoted: true })
    }
  }

  return (
    <LoggedUserContext.Provider value={{ loggedUser, login, logout, vote }}>
      {children}
    </LoggedUserContext.Provider>
  )
}
