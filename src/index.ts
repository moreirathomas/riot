import { getEnvInteger } from './lib/env'
import { start } from './server'

async function main() {
  const SERVER_PORT = getEnvInteger('SERVER_PORT')

  await start({ port: SERVER_PORT, logger: true })
}

main().catch(console.error)
