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
  IntroTextContainer,
  ScreenContainer,
} from './styles'

export function Urn() {
  return (
    <UrnContainer>
      <TitleContainer>
        <img src={brasao} alt="Brasão da República Federativa do Brasil" />
        <span>JUSTIÇA ELEITORAL</span>
      </TitleContainer>

      <BoxContainer>
        <ScreenContainer>
          <IntroTextContainer>
            <span>Digite o seu voto com o teclado numérico</span>
          </IntroTextContainer>
        </ScreenContainer>

        <ButtonsContainer>
          <NumbersContainer>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>0</button>
          </NumbersContainer>

          <ActionsButtonsContainer>
            <WhiteButton>BRANCO</WhiteButton>
            <CorrectButton>CORRIGE</CorrectButton>
            <ConfirmButton>CONFIRMA</ConfirmButton>
          </ActionsButtonsContainer>
        </ButtonsContainer>
      </BoxContainer>
    </UrnContainer>
  )
}
