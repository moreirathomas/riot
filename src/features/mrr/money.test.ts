import { Money } from './money'

describe('Money', () => {
  it('only accepts integers', () => {
    expect(() => new Money(1.5, 'usd')).toThrowError(TypeError)
  })

  describe('operations', () => {
    it('add', () => {
      expect(new Money(100, 'usd').add(new Money(200, 'usd')).amount).toEqual(
        300,
      )
    })

    it('throws when adding different currencies', () => {
      expect(() =>
        new Money(100, 'usd').add(new Money(200, 'eur')),
      ).toThrowError(TypeError)
    })

    it('subtract', () => {
      expect(
        new Money(100, 'usd').subtract(new Money(200, 'usd')).amount,
      ).toEqual(-100)
    })

    it('throws when subtracting different currencies', () => {
      expect(() =>
        new Money(100, 'usd').subtract(new Money(200, 'eur')),
      ).toThrowError(TypeError)
    })

    it('multiply', () => {
      expect(new Money(100, 'usd').multiply(2).amount).toEqual(200)
    })

    it('divide', () => {
      expect(new Money(100, 'usd').divide(2).amount).toEqual(50)
    })
  })

  describe('formatting', () => {
    it('formats for usd', () => {
      expect(new Money(100, 'usd').toString()).toEqual('$1.00')
    })

    it('formats for eur', () => {
      expect(new Money(100, 'eur').toString()).toEqual('€1.00')
    })
  })
})
