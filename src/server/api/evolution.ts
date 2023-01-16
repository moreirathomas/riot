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

      const sub = await getByMonthById(month, subscriptionId)

      const prevMonth = previousOf(month)
      if (prevMonth === null) {
        // No previous month, so the difference is the new MRR.
        // E.g. from $0 to whatever the new MRR is.
        reply.status(200).send({ difference: compute(sub).toString() })
        return
      }

      const prevSub = await getByMonthById(prevMonth, subscriptionId)

      const difference = compute(sub).subtract(compute(prevSub))

      reply.status(200).send({ difference: difference.toString() })
    },
  )
}
