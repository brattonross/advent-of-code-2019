/**
 * Produces an array containing all permutations of the given input array.
 */
export default function permutator<T>(input: T[]): T[][] {
  const result: T[][] = []

  function permute(arr: T[], m: T[] = []) {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice()
        const next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(input)

  return result
}
