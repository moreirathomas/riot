import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import { FastifyPluginAsync } from 'fastify'

import { compute } from '../../features/mrr'
import {
  getByMonthById,
  MonthType,
  previousOf,
} from '../../services/fake-subscriptions-api'

const query = Type.Object({
  month: MonthType,
  subscriptionId: Type.String(),
})

const responseOk = Type.Object({
  difference: Type.String(),
})

export const handleEvolution: FastifyPluginAsync = async (app) => {
  app.withTypeProvider<TypeBoxTypeProvider>().get(
    '/evolution',
    {
      schema: {
        querystring: query,
        response: { 200: responseOk },
      },
    },
    async (request, reply) => {
      const { month, subscriptionId } = request.query

      const subOfMonth = await getByMonthById(month, subscriptionId)
      const subOfMonthPrev = await getByMonthById(
        previousOf(month),
        subscriptionId,
      )

      const difference = compute(subOfMonthPrev).subtract(compute(subOfMonth))

      reply.status(200).send({ difference: difference.toString() })
    },
  )
}
