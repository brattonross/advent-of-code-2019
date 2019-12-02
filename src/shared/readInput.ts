import { readFileSync } from 'fs'

export default function readInput(path: string): string[] {
  return readFileSync(path)
    .toString()
    .split('\n')
}
