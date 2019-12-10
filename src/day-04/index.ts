import range from '../shared/range'

const input = '183564-657474'

const [start, end] = input.split('-').map(n => parseInt(n))

/**
 * Returns the number of occurrences of the given number in the array.
 */
const countOf = (ns: number[], n: number): number => {
  return ns.reduce((acc, cur) => acc + (cur === n ? 1 : 0), 0)
}

// Since we can guarantee that the numbers increase in value, we know for
// certain that any numbers of the same value are adjacent.
export const hasTwoAdjacentSame = (ns: number[]): boolean =>
  [...new Set(ns)].some(n => countOf(ns, n) === 2)

export const increases = (ns: number[]): boolean =>
  ns.every((n, i, arr) => arr[i + 1] === undefined || n <= arr[i + 1])

const num = range(start, end).reduce((acc, n) => {
  const digits = n
    .toString()
    .split('')
    .map(Number)

  return acc + (increases(digits) && hasTwoAdjacentSame(digits) ? 1 : 0)
}, 0)

console.log(num)
