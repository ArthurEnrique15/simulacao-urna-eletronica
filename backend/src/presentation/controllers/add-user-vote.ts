import { Request, Response } from 'express'

import { IAddUserVote } from '@/domain/use-cases/add-user-vote'

export class AddUserVoteController {
  constructor(private readonly addUserVoteUseCase: IAddUserVote) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.headers
    const { candidateId } = request.body

    try {
      if (!token) {
        throw new Error('Missing token')
      }

      const userVote = await this.addUserVoteUseCase.add({ token: token.toString(), candidateId })

      if (!userVote) {
        throw new Error('User vote not created')
      }

      return response.status(201).json({ message: 'User vote created' })
    } catch (err) {
      const error = err as Error
      return response.status(400).json({ message: error.message })
    }
  }
}
