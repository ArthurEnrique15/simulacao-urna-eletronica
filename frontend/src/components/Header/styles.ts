import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  height: 6.5rem;

  padding: 2rem 0;
`

export const HeaderButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 0.75rem;
  height: 2.375rem;
`

export const LoggedUserContainer = styled.div`
  border: 0px;
  border-radius: 6px;
  padding: 0.5rem;

  display: flex;
  align-items: flex-end;

  gap: 0.5rem;
`

export const ExitButton = styled.button`
  border: 0px;
  border-radius: 6px;

  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${(props) => props.theme['base-card']};

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme['base-hover']};
  }
`
