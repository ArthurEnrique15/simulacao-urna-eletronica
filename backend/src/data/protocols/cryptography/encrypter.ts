export interface IEncrypter {
  encrypt(data: object): Promise<string>
}
