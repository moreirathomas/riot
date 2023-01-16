import { Currency } from './money'

export type Subscription = {
  id: string
  status: 'active' | 'canceled'
  items: Item[]
  interval: 'monthly' | 'yearly'
  currency: Currency
  percentOff: number
}

export type Item = {
  id: string
  module: string
  unitAmount: number
  quantity: number
}
