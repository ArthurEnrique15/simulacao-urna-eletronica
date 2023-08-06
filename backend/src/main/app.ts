import express from 'express'

import { router } from './routes'

export function setupApp() {
  const app = express()
  app.use(router)
  return app
}
