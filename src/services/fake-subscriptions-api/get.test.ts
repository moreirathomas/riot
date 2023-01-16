import { getAll, getByMonth } from './get'

describe('getAll', () => {
  it('returns the subscriptions for every available month', async () => {
    const subscriptions = await getAll()
    expect(subscriptions).toHaveLength(3)
  })
})

describe('getByMonth', () => {
  const cases = ['Jan 22', 'Feb 22', 'Mar 22'] as const

  it.each(cases)(
    'returns the subscriptions for the given month (%s)',
    async (month) => {
      const subscriptions = await getByMonth(month)
      expect(subscriptions.date).toBe(month)
    },
  )
})
