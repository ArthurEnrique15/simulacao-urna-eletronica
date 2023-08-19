export namespace AuthenticateUserDTO {
  export type Params = {
    email: string
    password: string
  }

  export type Result = { token: string; name: string }
}

export interface IAuthenticateUser {
  authenticate(params: AuthenticateUserDTO.Params): Promise<AuthenticateUserDTO.Result>
}
