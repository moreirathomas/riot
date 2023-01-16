import { Type } from '@sinclair/typebox'

/**
 * Only Jan, Feb, Mar 22 are supported.
 */
export type Month = `${'Jan' | 'Feb' | 'Mar'} ${'22'}`

export const previousOf = (month: Month): Month => {
  switch (month) {
    case 'Jan 22':
      return 'Mar 22'
    case 'Feb 22':
      return 'Jan 22'
    case 'Mar 22':
      return 'Feb 22'
  }
}

/**
 * A Typebox type for the Month type.
 */
export const MonthType = Type.Union([
  Type.Literal('Jan 22'),
  Type.Literal('Feb 22'),
  Type.Literal('Mar 22'),
])
