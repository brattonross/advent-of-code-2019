/**
 * Generates a range from start to end (inclusive).
 */
export default function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
