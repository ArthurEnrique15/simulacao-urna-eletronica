export namespace AddUserDTO {
  export type Params = {
    email: string
    password: string
  }

  export type Result = boolean
}

export interface IAddUser {
  add(params: AddUserDTO.Params): Promise<AddUserDTO.Result>
}
