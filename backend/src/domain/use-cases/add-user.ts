import { User } from '../models/user'

export namespace AddUserDTO {
  export type Params = {
    email: string
    password: string
  }

  export type Result = User
}

export interface IAddUser {
  add(params: AddUserDTO.Params): Promise<AddUserDTO.Result>
}
