import { Static, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

import { monthPattern } from './month'

const apiResponse = Type.Array(
  Type.Object({
    date: Type.String({ pattern: monthPattern }),
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

export type APIResponse = Static<typeof apiResponse>

const checker = TypeCompiler.Compile(apiResponse)

/**
 * @throws Error if the response is invalid.
 */
export function parseAPIResponse(res: unknown): APIResponse {
  if (!checker.Check(res)) {
    const errors = [...checker.Errors(res)]
    console.error('Invalid response', errors)
    throw new Error('Invalid response', { cause: errors })
  }
  return res
}
