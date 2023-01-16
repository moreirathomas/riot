import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import { FastifyPluginAsync } from 'fastify'

import { computeMRR, subtractMMRs } from '../../features/mrr'
import {
  getByMonthById,
  MonthType,
  previousMonthOf,
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

      const prevMonth = previousMonthOf(month)
      if (prevMonth === null) {
        // No previous month, so the difference is the new MRR.
        // E.g. from $0 to whatever the new MRR is.
        reply.status(200).send({ difference: computeMRR(sub).toString() })
        return
      }

      const prevSub = await getByMonthById(prevMonth, subscriptionId)

      const difference = subtractMMRs(sub, prevSub)

      reply.status(200).send({ difference: difference.toString() })
    },
  )
}
