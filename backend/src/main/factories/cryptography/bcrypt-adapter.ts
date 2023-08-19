import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'

export function makeBcryptAdapter(): BcryptAdapter {
  return new BcryptAdapter(12)
}
