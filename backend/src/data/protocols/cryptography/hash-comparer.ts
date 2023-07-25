export namespace HashComparerDTO {
  export type Params = {
    value: string
    hash: string
  }
}

export interface IHashComparer {
  compare(params: HashComparerDTO.Params): Promise<boolean>
}
