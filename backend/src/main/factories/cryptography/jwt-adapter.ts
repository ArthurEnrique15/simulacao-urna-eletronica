import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'

export function makeJwtAdapter(): JwtAdapter {
  return new JwtAdapter(process.env.JWT_SECRET as string)
}
