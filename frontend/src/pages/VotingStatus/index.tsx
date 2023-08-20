import { useCallback, useContext, useEffect, useState } from 'react'
import { CandidatesContext } from '../../contexts/CandidatesContext'
import { api } from '../../lib/axios'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { VotingStatusContainer } from './styles'

type GraphData = {
  name: string
  value: number
}

type UserVote = {
  id: string
  userId: string
  candidateId: string | null
  isBlank: boolean
  createdAt: Date
}

ChartJS.register(ArcElement, Tooltip, Legend)

export function VotingStatus() {
  const { candidates } = useContext(CandidatesContext)
  const [graphData, setGraphData] =
    useState<ChartData<'pie', number[], unknown>>()

  const generateRandomColorRGB = () => {
    const minBrightness = 40 // Minimum brightness for each channel (0-255)
    const maxBrightness = 200 // Maximum brightness for each channel (0-255)

    const randomChannelValue = () =>
      Math.floor(Math.random() * (maxBrightness - minBrightness + 1)) +
      minBrightness

    const r = randomChannelValue()
    const g = randomChannelValue()
    const b = randomChannelValue()

    return `rgba(${r},${g},${b},1)`
  }

  const getGraphData = useCallback(async () => {
    const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/votes`)
    const votes: UserVote[] = response.data

    console.log(votes)

    const formattedArray: GraphData[] = candidates.map((candidate) => {
      const voteCount = votes.filter(
        (vote) => vote.candidateId === candidate.id,
      ).length

      return {
        name: candidate.name,
        value: voteCount,
      }
    })

    const blankVotes = votes.filter((vote) => vote.isBlank).length

    formattedArray.push({
      name: 'Votos em branco',
      value: blankVotes,
    })

    console.log(formattedArray)

    const data = {
      labels: formattedArray.map((item) => item.name),
      datasets: [
        {
          label: '# of Votes',
          data: formattedArray.map((item) => item.value),
          backgroundColor: formattedArray.map(() => generateRandomColorRGB()),
          borderColor: formattedArray.map(() => generateRandomColorRGB()),
          borderWidth: 1,
        },
      ],
    }

    setGraphData(data)
  }, [candidates])

  useEffect(() => {
    getGraphData()
  }, [getGraphData])

  return (
    <VotingStatusContainer>
      {graphData ? <Pie data={graphData} /> : <span>Loading...</span>}
    </VotingStatusContainer>
  )
}
