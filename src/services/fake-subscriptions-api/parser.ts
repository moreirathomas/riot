import { Static, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

import { Month, MonthType } from './month'
import { Subscription } from '../../features/mrr/subscription'

const response = Type.Array(
  Type.Object({
    date: MonthType,
    subscriptions: Type.Array(
      Type.Object({
        id: Type.String(),
        status: Type.Union([Type.Literal('active'), Type.Literal('canceled')]),
        items: Type.Array(
          Type.Object({
            id: Type.String(),
            module: Type.String(),
            unit_amount: Type.Number(),
            quantity: Type.Number(),
          }),
        ),
        interval: Type.Union([Type.Literal('monthly'), Type.Literal('yearly')]),
        currency: Type.Union([Type.Literal('usd'), Type.Literal('eur')]),
        percent_off: Type.Number(),
      }),
    ),
  }),
)

type Response = Static<typeof response>

export type UnwrappedResponse = Response[number]

export type UnwrappedSubscription = Response[number]['subscriptions'][number]

const checker = TypeCompiler.Compile(response)

/**
 * @throws Error if the response is invalid.
 */
export const parse = (res: unknown): Response => {
  if (!checker.Check(res)) {
    const errors = [...checker.Errors(res)]
    console.error('Invalid response', errors)
    throw new Error('Invalid response', { cause: errors })
  }
  return res
}

export const unwrap = (res: Response): UnwrappedResponse => res[0]

export type SubscriptionsResponse = {
  date: Month
  subscriptions: Subscription[]
}

export const toSubscriptionsResponse = (
  res: UnwrappedResponse,
): SubscriptionsResponse => ({
  date: res.date,
  subscriptions: res.subscriptions.map(toSubscription),
})

const toSubscription = (sub: UnwrappedSubscription): Subscription => ({
  id: sub.id,
  status: sub.status,
  items: sub.items.map((item) => ({
    id: item.id,
    module: item.module,
    unitAmount: item.unit_amount,
    quantity: item.quantity,
  })),
  interval: sub.interval,
  currency: sub.currency,
  percentOff: sub.percent_off,
})
