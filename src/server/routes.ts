import { FastifyInstance } from 'fastify'

import { handleTotal } from './api'
import { handleHealthCheck } from './health'

export function registerRoutes(app: FastifyInstance) {
  app.register(handleHealthCheck)

  app.register(handleTotal, { prefix: '/mrr' })
}
