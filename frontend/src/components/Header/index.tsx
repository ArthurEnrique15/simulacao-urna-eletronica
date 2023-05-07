import { SignOut, User } from 'phosphor-react'
import {
  HeaderContainer,
  ExitButton,
  HeaderButtonsContainer,
  LoggedUserContainer,
} from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderButtonsContainer>
        <LoggedUserContainer>
          <User size={22} weight="fill" />
          <span>Arthur Enrique</span>
        </LoggedUserContainer>
        <ExitButton>
          <SignOut size={22} weight="fill" />
        </ExitButton>
      </HeaderButtonsContainer>
    </HeaderContainer>
  )
}
