import React, { useContext, useEffect, useState } from 'react'
import useSound from 'use-sound'
import brasilCoatOfArms from '../../assets/brasao_republica.png'
import {
  UrnContainer,
  TitleContainer,
  BoxesContainer,
  ActionButtonsContainer,
  ButtonsContainer,
  ConfirmButton,
  CorrectButton,
  NumberButtonsContainer,
  BlankButton,
  ScreenContainer,
  NumberVoteContainer,
  ScreenTitleContainer,
  TutorialContainer,
  VoteContainer,
  VoteInfoContainer,
  NumberButton,
} from './styles'
import finishVoteSfx from '../../assets/finish_vote.mp3'
import buttonClickSfx from '../../assets/button_click.mp3'
import { LoggedUserContext } from '../../contexts/LoggedUserContext'
import { api } from '../../lib/axios'
import { useNavigate } from 'react-router-dom'
import { CandidatesContext } from '../../contexts/CandidatesContext'
import { CandidatesList } from './CandidatesList'

export function Urn() {
  const { loggedUser, logout, vote } = useContext(LoggedUserContext)
  const { candidates } = useContext(CandidatesContext)

  const navigate = useNavigate()

  const [currentNumber, setCurrentNumber] = useState('')
  const [isBlankVote, setIsBlankVote] = useState(false)

  const [playFinishVoteSfx] = useSound(finishVoteSfx)
  const [playButtonClickSfx] = useSound(buttonClickSfx)

  useEffect(() => {
    if (!candidates) {
      alert('Erro ao buscar candidatos! Por favor, faça login novamente.')
      logout()
      navigate('/')
    }
  }, [candidates, logout, navigate])

  function handleNumberClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { value } = event.currentTarget

    playButtonClickSfx()

    setIsBlankVote(false)

    if (currentNumber.length === 0) {
      setCurrentNumber(value)
    } else if (currentNumber.length === 1) {
      setCurrentNumber(currentNumber + value)
    } else if (currentNumber.length === 2) {
      alert('Você já digitou o número máximo de dígitos')
    }
  }

  function handleEraseCurrentNumber() {
    playButtonClickSfx()
    setIsBlankVote(false)
    if (currentNumber.length !== 0) {
      setCurrentNumber('')
    }
  }

  const handleVote = async () => {
    if (currentNumber.length !== 2 && !isBlankVote) {
      alert('Para confirmar é necessário digitar 2 números ou votar em BRANCO')
      return
    }

    playFinishVoteSfx()

    const getCandidateId = () => {
      if (isBlankVote) {
        return null
      }

      const candidate = candidates.find(
        (candidate) => candidate.number.toString() === currentNumber,
      )

      return candidate?.id || null
    }

    const response = await api.post(
      `${import.meta.env.VITE_SERVER_URL}/vote`,
      { candidateId: getCandidateId() },
      { headers: { token: loggedUser?.token } },
    )

    if (response.status !== 201) {
      return alert('Erro ao computar voto! Tente novamente.')
    }

    vote()

    alert('Voto computado com sucesso!')
    setCurrentNumber('')
    setIsBlankVote(false)
  }

  function handleBlankVote() {
    playButtonClickSfx()
    setIsBlankVote(true)
    setCurrentNumber('')
  }

  function getVoteInfo() {
    if (isBlankVote) {
      return (
        <>
          <h1>VOTO EM BRANCO</h1>
        </>
      )
    }

    if (currentNumber === '') {
      return <></>
    }

    let candidate = null

    if (currentNumber.length === 1) {
      candidate = candidates.find(
        (candidate) => candidate.number.toString()[0] === currentNumber,
      )
    } else {
      candidate = candidates.find(
        (candidate) => candidate.number.toString() === currentNumber,
      )
    }

    if (candidate) {
      return (
        <>
          <span>
            <strong>Candidato(a): </strong>
            {candidate.name}
          </span>
          <span>
            <strong>Partido: </strong>
            {candidate.party}
          </span>
          <span>
            <strong>Vice: </strong>
            {candidate.viceCandidate}
          </span>
        </>
      )
    }

    return (
      <>
        <h1>NÚMERO ERRADO</h1>
        <h1>VOTO NULO</h1>
      </>
    )
  }

  function getTutorial() {
    if (currentNumber.length === 2 || isBlankVote) {
      return (
        <>
          <p>
            <strong>Aperte a tecla:</strong>
          </p>
          <p>
            <strong>CONFIRMA</strong> para finalizar seu voto
          </p>
          <p>
            <strong>CORRIGE</strong> para reiniciar seu voto
          </p>
        </>
      )
    }

    return <></>
  }

  return (
    <UrnContainer>
      <TitleContainer>
        <img
          src={brasilCoatOfArms}
          alt="Brasão da República Federativa do Brasil"
        />
        <span>JUSTIÇA ELEITORAL</span>
      </TitleContainer>

      <BoxesContainer>
        <ScreenContainer>
          <ScreenTitleContainer>
            <span>Digite seu voto com o teclado numérico</span>
          </ScreenTitleContainer>
          <NumberVoteContainer>
            <VoteContainer>
              <button>{currentNumber[0]}</button>
              <button>{currentNumber[1]}</button>
            </VoteContainer>

            <VoteInfoContainer>{getVoteInfo()}</VoteInfoContainer>
          </NumberVoteContainer>

          <TutorialContainer>{getTutorial()}</TutorialContainer>
        </ScreenContainer>

        <ButtonsContainer>
          <NumberButtonsContainer>
            <NumberButton value="1" onClick={handleNumberClick}>
              1
            </NumberButton>
            <NumberButton value="2" onClick={handleNumberClick}>
              2
            </NumberButton>
            <NumberButton value="3" onClick={handleNumberClick}>
              3
            </NumberButton>
            <NumberButton value="4" onClick={handleNumberClick}>
              4
            </NumberButton>
            <NumberButton value="5" onClick={handleNumberClick}>
              5
            </NumberButton>
            <NumberButton value="6" onClick={handleNumberClick}>
              6
            </NumberButton>
            <NumberButton value="7" onClick={handleNumberClick}>
              7
            </NumberButton>
            <NumberButton value="8" onClick={handleNumberClick}>
              8
            </NumberButton>
            <NumberButton value="9" onClick={handleNumberClick}>
              9
            </NumberButton>
            <NumberButton value="0" onClick={handleNumberClick}>
              0
            </NumberButton>
          </NumberButtonsContainer>

          <ActionButtonsContainer>
            <BlankButton onClick={handleBlankVote}>BRANCO</BlankButton>
            <CorrectButton onClick={handleEraseCurrentNumber}>
              CORRIGE
            </CorrectButton>
            <ConfirmButton onClick={handleVote}>CONFIRMA</ConfirmButton>
          </ActionButtonsContainer>
        </ButtonsContainer>
      </BoxesContainer>

      <CandidatesList />
    </UrnContainer>
  )
}
