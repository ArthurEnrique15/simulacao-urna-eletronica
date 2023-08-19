export type AddUserRepositoryParams = {
  name: string
  email: string
  password: string
}

export interface IAddUserRepository {
  add: (params: AddUserRepositoryParams) => Promise<boolean>
}
