import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15%;

  gap: 0.75rem;
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.75rem;
`

export const InputField = styled.input`
  width: 25rem;
  padding: 0.75rem;
  margin: 0.25rem;
  border: 1px solid ${({ theme }) => theme['base-button']};
  border-radius: 6px;

  transition: 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme['base-text']};
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 1rem;
`

export const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme['base-button']};
  color: ${({ theme }) => theme['base-text']};
  border: none;
  border-radius: 6px;
  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme['base-hover']};
  }
`
