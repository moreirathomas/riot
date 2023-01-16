import { FastifyInstance } from 'fastify'

import { handleHealthCheck } from './health'

export function registerRoutes(app: FastifyInstance) {
  app.register(handleHealthCheck)
}
