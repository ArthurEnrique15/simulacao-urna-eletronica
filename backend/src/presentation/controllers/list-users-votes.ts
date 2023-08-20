import { Request, Response } from 'express'

import { IListUsersVotes } from '@/domain/use-cases/list-users-votes'

export class ListUsersVotesController {
  constructor(private readonly listUsersVotesUseCase: IListUsersVotes) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const result = await this.listUsersVotesUseCase.list()

      return response.status(200).json(result)
    } catch (err) {
      const error = err as Error
      return response.status(400).json({ message: error.message })
    }
  }
}
