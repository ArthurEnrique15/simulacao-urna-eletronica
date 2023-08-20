import { SignOut, User } from 'phosphor-react'
import {
  HeaderContainer,
  ExitButton,
  HeaderButtonsContainer,
  LoggedUserContainer,
} from './styles'
import { useContext } from 'react'
import { LoggedUserContext } from '../../contexts/LoggedUserContext'

export function Header() {
  const { loggedUser, logout } = useContext(LoggedUserContext)

  const handleLogout = () => {
    logout()
  }

  return (
    <HeaderContainer>
      <HeaderButtonsContainer>
        <LoggedUserContainer>
          <User size={22} weight="fill" />
          <span>{loggedUser?.name}</span>
        </LoggedUserContainer>
        <ExitButton onClick={handleLogout}>
          <SignOut size={22} weight="fill" />
        </ExitButton>
      </HeaderButtonsContainer>
    </HeaderContainer>
  )
}
