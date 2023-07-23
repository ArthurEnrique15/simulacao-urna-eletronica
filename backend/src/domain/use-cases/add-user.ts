export namespace AddUserDTO {
  export type Params = {
    userId: string
    candidateId: string
  }

  export type Result = boolean
}

export interface IAddUser {
  add(params: AddUserDTO.Result): Promise<AddUserDTO.Result>
}
