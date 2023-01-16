import { Money } from './money'
import { Subscription } from './subscription'

export function compute(subscription: Subscription): Money {
  if (subscription.status === 'canceled') {
    return new Money(0, subscription.currency)
  }

  const sum = subscription.items.reduce((acc, item) => {
    return acc.add(
      new Money(item.unitAmount * item.quantity, subscription.currency),
    )
  }, new Money(0, subscription.currency))

  const monthly = sum.divide(monthlyNumberOf(subscription.interval))

  const discount = monthly.multiply(subscription.percentOff / 100)

  return monthly.subtract(discount)
}

const monthlyNumberOf = (interval: Subscription['interval']) =>
  interval === 'yearly' ? 12 : 1
