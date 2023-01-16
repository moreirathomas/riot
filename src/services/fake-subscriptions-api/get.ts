import { Month } from './month'
import {
  SubscriptionsResponse,
  toSubscriptionsResponse,
  parse,
  unwrap,
} from './parser'
import { Subscription } from '../../features/mrr/subscription'

const URL = 'https://fake-subscriptions-api.fly.dev/api/subscriptions'

export async function getAll(): Promise<SubscriptionsResponse[]> {
  // The responses cycles between Jan 22, Feb 22 and Mar 22.
  // Repeat the request until we get a response for each month.
  // To do so, do the request 3 times to ensure we get a response
  // for each month.
  // TODO: cache the response. type Cache = { [month]: response }

  const requests = Array.from({ length: 3 }).map(() =>
    fetch(URL).then((res) => res.json()),
  )
  const data = await Promise.all(requests)

  return data.map(parse).map(unwrap).map(toSubscriptionsResponse)
}

export async function getByMonth(month: Month): Promise<SubscriptionsResponse> {
  const all = await getAll()
  const res = all.find((res) => res.date === month)
  if (!res) {
    throw new Error(`No subscriptions found for month ${month}`)
  }
  return res
}

export async function getByMonthById(
  month: Month,
  id: string,
): Promise<Subscription> {
  const { subscriptions } = await getByMonth(month)
  const subscription = subscriptions.find((s) => s.id === id)
  if (!subscription) {
    throw new Error(`No subscription found with id ${id}`)
  }
  return subscription
}
