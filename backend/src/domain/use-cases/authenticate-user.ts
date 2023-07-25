export namespace AuthenticateUserDTO {
  export type Params = {
    email: string
    password: string
  }

  export type Result = { token: string }
}

export interface IAuthenticateUser {
  authenticate(params: AuthenticateUserDTO.Params): Promise<AuthenticateUserDTO.Result>
}
