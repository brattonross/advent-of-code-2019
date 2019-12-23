import * as path from 'path'
import { Computer } from '../shared/intcode'
import permutator from '../shared/permutator'
import readInput from '../shared/readInput'
import range from '../shared/range'

const code = readInput(path.resolve(__dirname, './input.txt'))
  .split(',')
  .map(n => parseInt(n))

function part1() {
  const possibleSettings = permutator<number>(range(0, 4))
  return Math.max(
    ...possibleSettings.map(settings => {
      return settings.reduce((total, setting) => {
        const computer = new Computer(code, [setting, total])
        const [newTotal] = computer.run()
        return newTotal
      }, 0)
    })
  )
}

const ans1 = part1()
console.log('Part 1', ans1)
