export namespace AuthenticateUserDTO {
  export type Params = {
    email: string
    password: string
  }

  export type Result = boolean
}

export interface IAuthenticateUser {
  add(params: AuthenticateUserDTO.Result): Promise<AuthenticateUserDTO.Result>
}
