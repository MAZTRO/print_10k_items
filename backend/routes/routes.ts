import { Application } from 'express'
import { router as HEALTH } from '../components/helth/health.routes'
import { router as RANDOMUSERS } from '../components/randomUsers/randomUsers.routes'

export const Routes = (server: Application) => {
  const prefix = '/api/v01'

  server.use(`${prefix}/health`, HEALTH)
  server.use(`${prefix}/random-users`, RANDOMUSERS)
}
