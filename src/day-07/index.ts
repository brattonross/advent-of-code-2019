import * as path from 'path'
import { runIntcode } from '../shared/intcode'
import permutator from '../shared/permutator'
import readInput from '../shared/readInput'

function runAmplifier(phaseSetting: number, input: number, code: number[]) {
  const [value] = runIntcode(code, [phaseSetting, input])
  return value
}

export function maxThruster(
  phaseSettings: number[],
  input: number,
  code: number[]
): number {
  return phaseSettings.reduce(
    (thrust, setting) => runAmplifier(setting, thrust, [...code]),
    input
  )
}

const code = readInput(path.resolve(__dirname, './input.txt'))
  .split(',')
  .map(n => parseInt(n))
const possibleSettings = permutator<number>([0, 1, 2, 3, 4])

const max = Math.max(
  ...possibleSettings.map(settings => maxThruster(settings, 0, code))
)

console.log(max)
