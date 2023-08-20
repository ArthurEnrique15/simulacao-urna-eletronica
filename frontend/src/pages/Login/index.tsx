import React, { useContext, useState } from 'react'
import { api } from '../../lib/axios'
import {
  LoginContainer,
  LoginForm,
  InputField,
  ButtonsContainer,
  SubmitButton,
} from './styles'
import { LoggedUserContext } from '../../contexts/LoggedUserContext'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const { login } = useContext(LoggedUserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await api.post(
      `${import.meta.env.VITE_SERVER_URL}/login`,
      { email, password },
    )

    if (response.status !== 201) {
      return alert('Credenciais inválidas!')
    }

    const { data } = response

    login(data)

    alert('Login efetuado com sucesso!')

    if (data.alreadyVoted) {
      return navigate('/status')
    }

    navigate('/')
  }

  return (
    <LoginContainer>
      <h1>Login</h1>
      <LoginForm onSubmit={handleSubmit}>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonsContainer>
          <SubmitButton type="submit">Login</SubmitButton>
          <SubmitButton onClick={() => navigate('/register')}>
            Cadastre-se
          </SubmitButton>
        </ButtonsContainer>
      </LoginForm>
    </LoginContainer>
  )
}
