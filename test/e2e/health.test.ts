// Allow to use fetch().
/// <reference lib="dom" />

import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.development' })

const port = process.env.SERVER_PORT

describe('Health check', () => {
  test('returns 200 OK', async () => {
    const res = await fetch(`http://localhost:${port}/health`)
    expect(res.status).toBe(200)
  })
})
