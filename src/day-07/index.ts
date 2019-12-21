import * as path from 'path'
import { runIntcode } from '../shared/intcode'
import permutator from '../shared/permutator'
import readInput from '../shared/readInput'
import range from '../shared/range'

class Amplifier {
  private code: number[]

  constructor(code: number[], private phaseSetting: number) {
    this.code = [...code]
  }

  run(input: number[]): number[] {
    return runIntcode(this.code, [this.phaseSetting, ...input])
  }
}

/**
 * Run the given code for each phase setting, summing the outputs for each.
 */
export function thruster(
  phaseSettings: number[],
  input: number,
  code: number[]
): number {
  return phaseSettings
    .map(s => new Amplifier(code, s))
    .reduce((thrust, amp) => {
      const [newTotal] = amp.run([thrust])
      return newTotal
    }, input)
}

const code = readInput(path.resolve(__dirname, './input.txt'))
  .split(',')
  .map(n => parseInt(n))

const possibleSettings = permutator<number>(range(0, 4))

// const max = Math.max(
//   ...possibleSettings.map(settings => thruster(settings, 0, code))
// )
