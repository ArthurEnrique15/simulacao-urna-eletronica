export namespace AddUserDTO {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = boolean
}

export interface IAddUser {
  add(params: AddUserDTO.Params): Promise<AddUserDTO.Result>
}
