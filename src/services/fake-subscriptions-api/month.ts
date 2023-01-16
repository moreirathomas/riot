/**
 * Only Jan, Feb, Mar 22 are supported.
 */
export type Month = `${'Jan' | 'Feb' | 'Mar'} ${'22'}`

export const monthPattern = '^(Jan|Feb|Mar) 22$'

// export const isMonth = (month: string): month is Month =>
//   new RegExp(monthPattern).test(month)
