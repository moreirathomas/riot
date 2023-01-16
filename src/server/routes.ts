import { FastifyInstance } from 'fastify'

import { handleEvolution, handleTotal } from './api'
import { handleHealthCheck } from './health'

export function registerRoutes(app: FastifyInstance) {
  app.register(handleHealthCheck)

  app.register(handleEvolution, { prefix: '/mrr' })
  app.register(handleTotal, { prefix: '/mrr' })
}
