export type AddUserRepositoryParams = {
  email: string
  password: string
}

export interface IAddUserRepository {
  add: (params: AddUserRepositoryParams) => Promise<boolean>
}
