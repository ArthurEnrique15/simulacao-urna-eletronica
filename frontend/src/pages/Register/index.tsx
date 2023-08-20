import React, { useState } from 'react'
import {
  RegisterContainer,
  RegisterForm,
  InputField,
  SubmitButton,
  ButtonsContainer,
} from './styles'
import { api } from '../../lib/axios'
import { useNavigate } from 'react-router-dom'

export function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await api.post(`${import.meta.env.VITE_SERVER_URL}/user`, {
      name,
      email,
      password,
    })

    if (response.status !== 201) {
      return alert('Erro ao cadastrar usuário!')
    }

    alert('Usuário cadastrado com sucesso!')

    navigate('/login')
  }

  return (
    <RegisterContainer>
      <h1>Cadastro</h1>
      <RegisterForm onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          <SubmitButton type="submit">Cadastrar</SubmitButton>
          <SubmitButton onClick={() => navigate('/login')}>Login</SubmitButton>
        </ButtonsContainer>
      </RegisterForm>
    </RegisterContainer>
  )
}
