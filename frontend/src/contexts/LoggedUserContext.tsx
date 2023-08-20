import { ReactNode, createContext, useState } from 'react'

export type LoggedUser = {
  name: string
  token: string
}

interface LoggedUserContextType {
  loggedUser: LoggedUser | null
  login: (user: LoggedUser) => void
  logout: () => void
}

interface LoggedUserProviderProps {
  children: ReactNode
}

export const LoggedUserContext = createContext({} as LoggedUserContextType)

export function LoggedUserProvider({ children }: LoggedUserProviderProps) {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null)

  const login = (user: LoggedUser) => {
    console.log(user)
    setLoggedUser(user)
  }

  const logout = () => {
    setLoggedUser(null)
  }

  return (
    <LoggedUserContext.Provider value={{ loggedUser, login, logout }}>
      {children}
    </LoggedUserContext.Provider>
  )
}
