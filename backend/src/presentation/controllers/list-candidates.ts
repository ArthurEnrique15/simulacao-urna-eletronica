import { Request, Response } from 'express'

import { IListCandidates } from '@/domain/use-cases/list-candidates'

export class ListCandidatesController {
  constructor(private readonly listCandidatesUseCase: IListCandidates) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const result = await this.listCandidatesUseCase.list()

      return response.status(200).json(result)
    } catch (err) {
      const error = err as Error
      return response.status(400).json({ message: error.message })
    }
  }
}
