import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { api } from '../lib/axios'

export type Candidate = {
  id: string
  name: string
  party: string
  viceCandidate: string
  number: number
  createdAt: Date
}

interface CandidatesContextType {
  candidates: Candidate[]
}

interface CandidatesProviderProps {
  children: ReactNode
}

export const CandidatesContext = createContext({} as CandidatesContextType)

export function CandidatesProvider({ children }: CandidatesProviderProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([])

  const fetchCandidates = useCallback(async () => {
    const response = await api.get(
      `${import.meta.env.VITE_SERVER_URL}/candidates`,
    )

    setCandidates(response.data)
  }, [])

  useEffect(() => {
    fetchCandidates()
  }, [fetchCandidates])

  return (
    <CandidatesContext.Provider value={{ candidates }}>
      {children}
    </CandidatesContext.Provider>
  )
}
