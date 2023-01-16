import { fastify } from 'fastify'

import { registerRoutes } from './routes'

interface Options {
  port: number
  logger: boolean
}

export function start(opts: Options) {
  const app = fastify({
    logger: opts.logger,
  })

  registerRoutes(app)

  return app.listen({ port: opts.port })
}
