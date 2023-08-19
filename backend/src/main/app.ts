import 'express-async-errors'

import express, { NextFunction, Request, Response } from 'express'

import MongoHelper from '../infra/database/mongodb/helper'
import { setupRoutes } from './routes'

export async function setupApp() {
  await MongoHelper.connect()
  const app = express()

  app.use(express.json())
  app.use(setupRoutes())

  app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(err)
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  })

  return app
}
