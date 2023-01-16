import { Type } from '@sinclair/typebox'

/**
 * Only Jan, Feb, Mar 22 are supported.
 */
export type Month = `${'Jan' | 'Feb' | 'Mar'} ${'22'}`

/**
 * A Typebox type for the Month type.
 */
export const MonthType = Type.Union([
  Type.Literal('Jan 22'),
  Type.Literal('Feb 22'),
  Type.Literal('Mar 22'),
])
