import { compute } from './compute'
import { Subscription } from './subscription'

describe('compute(subscription)', () => {
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
    const got = compute(sub).toString()
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
    const got = compute(sub).toString()
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
    const got = compute(sub).toString()
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
    const got = compute(sub).toString()
    expect(got).toEqual('$0.00')
  })
})
