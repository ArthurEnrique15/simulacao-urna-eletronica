import styled from 'styled-components'

export const UrnContainer = styled.div`
  min-height: 34rem;
  width: 100%;
  margin: 2rem auto;

  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 3.5rem;
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  gap: 2rem;

  padding: 1rem;

  span {
    color: ${({ theme }) => theme['base-title']};

    /* font-family: 'Baloo 2'; */
    font-weight: 800;
    font-size: 5rem;
  }

  img {
    width: 10rem;
    height: 10rem;
  }
`

export const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0 auto;

  width: 100%;
  height: 30rem;

  border: 3px solid;
  border-radius: 6px;

  background-color: ${({ theme }) => theme['white-hover']};
`

export const IntroTextContainer = styled.div`
  font-size: 2rem;
`

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 2rem;
`

export const ButtonsContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 2rem;

  gap: 2rem;

  height: 30rem;

  background-color: ${({ theme }) => theme.black};

  border-radius: 6px;
`

export const NumbersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  gap: 2rem;

  button {
    width: 4rem;
    height: 4rem;

    color: #ffffff;
    background-color: ${({ theme }) => theme.black};

    font-size: 1.5rem;

    border: 1px solid;
    border-color: ${({ theme }) => theme['base-label']};
    border-radius: 6px;

    &:last-child {
      grid-column: 2; /* Posiciona o último número na coluna do meio */
    }

    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme['black-hover']};
    }
  }
`

export const ActionsButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`

const ActionButton = styled.button`
  padding: 0.5rem;
  font-weight: 800;

  border-radius: 6px;

  &:hover {
    cursor: pointer;
  }
`

export const WhiteButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.white};

  &:hover {
    background-color: ${({ theme }) => theme['white-hover']};
  }
`

export const CorrectButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.red};

  &:hover {
    background-color: ${({ theme }) => theme['red-hover']};
  }
`

export const ConfirmButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.green};

  &:hover {
    background-color: ${({ theme }) => theme['green-hover']};
  }
`
