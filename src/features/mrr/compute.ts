import { assertSameCurrency, Currency, Money } from './money'
import { Subscription } from './subscription'

export function computeMRR(subscription: Subscription): Money {
  if (isCanceled(subscription)) {
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

const isCanceled = (sub: Subscription) => sub.status === 'canceled'

const monthlyNumberOf = (interval: Subscription['interval']) =>
  interval === 'yearly' ? 12 : 1

export function sumMRRs(
  subscriptions: Subscription[],
  currency: Currency,
): Money {
  return subscriptions
    .filter(equalsCurrency(currency))
    .map(computeMRR)
    .reduce(sumMoney, new Money(0, currency))
}

const equalsCurrency = (currency: Currency) => (sub: Subscription) =>
  sub.currency === currency

const sumMoney = (acc: Money, val: Money) => acc.add(val)

export function subtractMMRs(a: Subscription, b: Subscription): Money {
  assertSameCurrency(a.currency, b.currency)
  return computeMRR(a).subtract(computeMRR(b))
}
