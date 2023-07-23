import { User } from '@/domain/models/user'

export namespace AddUserRepositoryDTO {
  export type Params = {
    email: string
    password: string
  }

  export type Result = User
}

export interface IAddUserRepository {
  add: (params: AddUserRepositoryDTO.Params) => Promise<AddUserRepositoryDTO.Result>
}
