import { Month } from './month'
import { APIResponse, parseAPIResponse } from './response'

const URL = 'https://fake-subscriptions-api.fly.dev/api/subscriptions'

export async function getAll(): Promise<APIResponse> {
  // The responses cycles between Jan 22, Feb 22 and Mar 22.
  // Repeat the request until we get a response for each month.
  // To do so, do the request 3 times to ensure we get a response
  // for each month.
  // TODO: cache the response. type Cache = { [month]: response }

  const requests = Array.from({ length: 3 }).map(() => fetch(URL))

  const responses = await Promise.all(requests)

  const data = await Promise.all(responses.map((res) => res.json()))

  return data.map(parseAPIResponse).flat(1)
}

export async function getByMonth(month: Month): Promise<APIResponse> {
  const all = await getAll()
  return all.filter((r) => r.date === month)
}
