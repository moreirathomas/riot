import { computeMRR, subtractMMRs, sumMRRs } from './compute'
import { Subscription } from './subscription'

describe('computeMRR(subscription)', () => {
  it('computes the MRR for a subscription paid for yearly', () => {
    const sub: Subscription = {
      id: 'sub-1',
      status: 'active',
      items: [
        {
          id: 'sub-1-item-1',
          module: 'awareness',
          unitAmount: 3990,
          quantity: 12,
        },
      ],
      interval: 'yearly',
      currency: 'usd',
      percentOff: 0,
    }
    const got = computeMRR(sub).toString()
    expect(got).toEqual('$39.90')
  })

  it('computes the MRR for a subscription paid for monthly', () => {
    const sub: Subscription = {
      id: 'sub-1',
      status: 'active',
      items: [
        {
          id: 'sub-1-item-1',
          module: 'awareness',
          unitAmount: 399,
          quantity: 100,
        },
      ],
      interval: 'monthly',
      currency: 'usd',
      percentOff: 10,
    }
    const got = computeMRR(sub).toString()
    expect(got).toEqual('$359.10')
  })

  it('computes the MRR for a subscription with multiple items', () => {
    const sub: Subscription = {
      id: 'sub-1',
      status: 'active',
      items: [
        {
          id: 'sub-1-item-1',
          module: 'awareness',
          unitAmount: 399,
          quantity: 100,
        },
        {
          id: 'sub-1-item-2',
          module: 'engagement',
          unitAmount: 399,
          quantity: 100,
        },
      ],
      interval: 'monthly',
      currency: 'usd',
      percentOff: 10,
    }
    const got = computeMRR(sub).toString()
    expect(got).toEqual('$718.20')
  })

  it('excludes canceled subscriptions', () => {
    const sub: Subscription = {
      id: 'sub-1',
      status: 'canceled',
      items: [
        {
          id: 'sub-1-item-1',
          module: 'awareness',
          unitAmount: 399,
          quantity: 100,
        },
      ],
      interval: 'monthly',
      currency: 'usd',
      percentOff: 10,
    }
    const got = computeMRR(sub).toString()
    expect(got).toEqual('$0.00')
  })
})

describe('sumMRRs(subscriptions, currency)', () => {
  it('sums the MRRs for a given currency', () => {
    const subs: Subscription[] = [
      {
        id: 'sub-1',
        status: 'active',
        items: [
          {
            id: 'sub-1-item-1',
            module: 'awareness',
            unitAmount: 399,
            quantity: 100,
          },
        ],
        interval: 'monthly',
        currency: 'usd',
        percentOff: 10,
      },
      {
        id: 'sub-2',
        status: 'active',
        items: [
          {
            id: 'sub-2-item-1',
            module: 'engagement',
            unitAmount: 399,
            quantity: 100,
          },
        ],
        interval: 'monthly',
        currency: 'usd',
        percentOff: 10,
      },
    ]
    const got = sumMRRs(subs, 'usd').toString()
    expect(got).toEqual('$718.20')
  })
})

describe('subtractMMRs(a, b)', () => {
  it('subtracts the MRRs of two subscriptions', () => {
    const a: Subscription = {
      id: 'sub-1',
      status: 'active',
      items: [
        {
          id: 'sub-1-item-1',
          module: 'awareness',
          unitAmount: 399,
          quantity: 100,
        },
      ],
      interval: 'monthly',
      currency: 'usd',
      percentOff: 10,
    }
    const b: Subscription = {
      id: 'sub-2',
      status: 'active',
      items: [
        {
          id: 'sub-2-item-1',
          module: 'engagement',
          unitAmount: 399,
          quantity: 100,
        },
      ],
      interval: 'monthly',
      currency: 'usd',
      percentOff: 10,
    }
    const got = subtractMMRs(a, b).toString()
    expect(got).toEqual('$0.00')
  })

  it('throws if the subscriptions are not in the same currency', () => {
    const a: Subscription = {
      id: 'sub-1',
      status: 'active',
      items: [
        {
          id: 'sub-1-item-1',
          module: 'awareness',
          unitAmount: 399,
          quantity: 100,
        },
      ],
      interval: 'monthly',
      currency: 'usd',
      percentOff: 10,
    }
    const b: Subscription = {
      id: 'sub-2',
      status: 'active',
      items: [
        {
          id: 'sub-2-item-1',
          module: 'engagement',
          unitAmount: 399,
          quantity: 100,
        },
      ],
      interval: 'monthly',
      currency: 'eur',
      percentOff: 10,
    }
    expect(() => subtractMMRs(a, b)).toThrowError()
  })
})
