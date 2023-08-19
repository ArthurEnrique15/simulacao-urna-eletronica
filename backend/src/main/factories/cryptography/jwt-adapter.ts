import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'

export function makeJwtAdapter(): JwtAdapter {
  console.log(process.env.JWT_SECRET)
  return new JwtAdapter(process.env.JWT_SECRET as string)
}
