export type Currency = 'usd' | 'eur'

export class Money {
  amount: number
  currency: Currency

  /**
   * @param amount Amount in minor units (e.g. cents). Must be an integer.
   * @param currency Currency code.
   */
  constructor(amount: number, currency: Currency) {
    if (!Number.isInteger(amount)) {
      throw new TypeError('Amount must be an integer')
    }
    this.amount = amount
    this.currency = currency
  }

  add(b: Money) {
    return add(this, b)
  }
  subtract(b: Money) {
    return subtract(this, b)
  }
  multiply(b: number) {
    return multiply(this, b)
  }
  divide(b: number) {
    return divide(this, b)
  }
  toString(): string {
    return toString(convertInMinorUnits(this.amount), this.currency)
  }
}

export const assertSameCurrency = (a: Currency, b: Currency): void => {
  if (a !== b) {
    throw new TypeError('Currencies must be the same')
  }
}

const add = (a: Money, b: Money): Money => {
  assertSameCurrency(a.currency, b.currency)
  return new Money(a.amount + b.amount, a.currency)
}

const subtract = (a: Money, b: Money): Money => {
  assertSameCurrency(a.currency, b.currency)
  return new Money(a.amount - b.amount, a.currency)
}

const multiply = (a: Money, b: number): Money => {
  return new Money(Math.round(a.amount * b), a.currency)
}

const divide = (a: Money, b: number): Money => {
  return new Money(Math.round(a.amount / b), a.currency)
}

// E.g. 100 cents equals 1 USD.
const MINOR_UNITS_PER_MAJOR_UNIT = 2

const convertInMinorUnits = (amount: number): number => {
  return Math.round(amount) / 10 ** MINOR_UNITS_PER_MAJOR_UNIT
}

const toString = (amount: number, currency: Currency): string => {
  return amount.toLocaleString('en-US', { style: 'currency', currency })
}
