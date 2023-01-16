import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'

import { compute, Money } from '../../features/mrr'
import { getByMonth, MonthType } from '../../services/fake-subscriptions-api'

const query = Type.Object({
  month: MonthType,
  currency: Type.Union([Type.Literal('usd')]), // eur is not supported yet
})

const responseOk = Type.Object({
  total: Type.String(),
})

export const handleTotal: FastifyPluginAsyncTypebox = async (app) => {
  app.get(
    '/total',
    {
      schema: {
        querystring: query,
        response: {
          200: responseOk,
        },
      },
    },
    async (request, reply) => {
      const { month, currency } = request.query
      const { subscriptions } = await getByMonth(month)

      const total = subscriptions
        .filter((sub) => sub.currency === currency)
        .reduce((sum, sub) => sum.add(compute(sub)), new Money(0, currency))

      reply.status(200).send({ total: total.toString() })
    },
  )
}
