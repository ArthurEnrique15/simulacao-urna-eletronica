import styled from 'styled-components'

export const UrnContainer = styled.div`
  min-height: 34rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 1rem;

  margin-bottom: 2rem;
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
    width: 7rem;
    height: 7rem;
  }
`

export const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  padding: 2rem;

  gap: 2rem;

  /* margin: 0 auto; */

  width: 100%;
  height: 40rem;

  border: 3px solid;
  border-radius: 6px;

  background-color: ${({ theme }) => theme['white-hover']};
`

export const ScreenTitleContainer = styled.div`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`

export const NumberVoteContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  /* gap: 0.25rem; */

  width: 100%;
  height: 20rem;

  margin-bottom: 1rem;
`

export const VoteContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  gap: 0.25rem;

  button {
    font-size: 5rem;

    width: 6rem;
    height: 7.5rem;

    border: 3px solid;
    border-radius: 6px;
    border-color: ${({ theme }) => theme.black};

    background-color: transparent;
  }
`

export const VoteInfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 40%;

  padding: 0.5rem;

  gap: 0.5rem;

  font-size: 1.2rem;
`

export const TutorialContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.25rem;

  height: 8rem;

  font-size: 1.2rem;
`

export const BoxesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 2rem;
`

export const ButtonsContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2rem;

  gap: 5rem;

  height: 40rem;

  background-color: ${({ theme }) => theme.black};

  border-radius: 6px;
`

export const NumberButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  gap: 2rem;
`

export const NumberButton = styled.button`
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
`

export const ActionButtonsContainer = styled.div`
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

export const BlankButton = styled(ActionButton)`
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
