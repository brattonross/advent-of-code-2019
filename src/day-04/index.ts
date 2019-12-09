import range from '../shared/range'

const input = '183564-657474'

const [start, end] = input.split('-').map(n => parseInt(n))

export const hasTwoAdjacentSame = (n: number) =>
  n
    .toString()
    .split('')
    .some((n, i, arr) => arr[i + 1] === n)

export const increases = (n: number) =>
  n
    .toString()
    .split('')
    .every((n, i, arr) => arr[i + 1] === undefined || n <= arr[i + 1])

const num = range(start, end).reduce(
  (acc, n) => acc + (hasTwoAdjacentSame(n) && increases(n) ? 1 : 0),
  0
)

console.log(num)
