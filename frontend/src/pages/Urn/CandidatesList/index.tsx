import { useContext } from 'react'
import { CandidatesContext } from '../../../contexts/CandidatesContext'
import { CandidateName, CandidatesListContainer, ListContainer } from './styles'

export function CandidatesList() {
  const { candidates } = useContext(CandidatesContext)

  return (
    <CandidatesListContainer>
      <h1>Lista de candidatos</h1>

      <ListContainer>
        {candidates.map((candidate) => {
          return (
            <div key={candidate.id}>
              <CandidateName>
                {candidate.number +
                  ' - ' +
                  candidate.name +
                  ` (${candidate.party})`}
              </CandidateName>
              <p>Vice: {candidate.viceCandidate}</p>
            </div>
          )
        })}
      </ListContainer>
    </CandidatesListContainer>
  )
}
