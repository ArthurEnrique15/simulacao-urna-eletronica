import React, { useState } from 'react'
import useSound from 'use-sound'
import brasao from '../../../assets/brasao_republica.png'
import {
  UrnContainer,
  TitleContainer,
  BoxContainer,
  ActionsButtonsContainer,
  ButtonsContainer,
  ConfirmButton,
  CorrectButton,
  NumbersContainer,
  WhiteButton,
  ScreenContainer,
  NumberVoteContainer,
  ScreenTitleContainer,
  FooterContainer,
  VoteContainer,
  CandidateContainer,
} from './styles'
import finishVoteSfx from '../../../assets/finish_vote.mp3'
import buttonClickSfx from '../../../assets/button_click.mp3'

export function Urn() {
  const [currentNumber, setCurrentNumber] = useState('')

  const [playFinishVoteSfx] = useSound(finishVoteSfx)
  const [playButtonClickSfx] = useSound(buttonClickSfx)

  const candidates = [
    {
      name: 'Lula',
      party: 'PT',
      number: '13',
      vice: 'Geraldo Alckmin',
    },
    {
      name: 'Léo Péricles',
      party: 'UP',
      number: '80',
      vice: 'Samara Martins',
    },
    {
      name: 'Sofia Manzano',
      party: 'PCB',
      number: '20',
      vice: 'Antonio Alves',
    },
  ]

  function handleNumberClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { value } = event.currentTarget

    playButtonClickSfx()

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
    if (currentNumber.length !== 0) {
      setCurrentNumber('')
    }
  }

  function handleVote() {
    if (currentNumber.length !== 2) {
      alert('Número errado! Digite novamente')
      setCurrentNumber('')
      return
    }

    playFinishVoteSfx()
    alert('Voto computado com sucesso!')
    setCurrentNumber('')
  }

  function getCandidate() {
    let candidate

    if (currentNumber.length === 0) {
      return <></>
    } else if (currentNumber.length === 1) {
      candidate = candidates.find(
        (candidate) => candidate.number[0] === currentNumber,
      )
    } else {
      candidate = candidates.find(
        (candidate) => candidate.number === currentNumber,
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
            {candidate.vice}
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

  function getFooter() {
    if (currentNumber.length === 2) {
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
        <img src={brasao} alt="Brasão da República Federativa do Brasil" />
        <span>JUSTIÇA ELEITORAL</span>
      </TitleContainer>

      <BoxContainer>
        <ScreenContainer>
          <ScreenTitleContainer>
            <span>Digite seu voto com o teclado numérico</span>
          </ScreenTitleContainer>
          <NumberVoteContainer>
            <VoteContainer>
              <button>{currentNumber[0]}</button>
              <button>{currentNumber[1]}</button>
            </VoteContainer>

            <CandidateContainer>{getCandidate()}</CandidateContainer>
          </NumberVoteContainer>

          <FooterContainer>{getFooter()}</FooterContainer>
        </ScreenContainer>

        <ButtonsContainer>
          <NumbersContainer>
            <button value="1" onClick={handleNumberClick}>
              1
            </button>
            <button value="2" onClick={handleNumberClick}>
              2
            </button>
            <button value="3" onClick={handleNumberClick}>
              3
            </button>
            <button value="4" onClick={handleNumberClick}>
              4
            </button>
            <button value="5" onClick={handleNumberClick}>
              5
            </button>
            <button value="6" onClick={handleNumberClick}>
              6
            </button>
            <button value="7" onClick={handleNumberClick}>
              7
            </button>
            <button value="8" onClick={handleNumberClick}>
              8
            </button>
            <button value="9" onClick={handleNumberClick}>
              9
            </button>
            <button value="0" onClick={handleNumberClick}>
              0
            </button>
          </NumbersContainer>

          <ActionsButtonsContainer>
            <WhiteButton>BRANCO</WhiteButton>
            <CorrectButton onClick={handleEraseCurrentNumber}>
              CORRIGE
            </CorrectButton>
            <ConfirmButton onClick={handleVote}>CONFIRMA</ConfirmButton>
          </ActionsButtonsContainer>
        </ButtonsContainer>
      </BoxContainer>
    </UrnContainer>
  )
}
