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

class AmplifierSeries {
  private amplifiers: Computer[]
  private pointer = 0

  constructor(memory: number[], phaseSettings: number[]) {
    this.amplifiers = phaseSettings.map((setting, index) => {
      const inputs = index === 0 ? [setting, 0] : [setting]
      return new Computer(memory, inputs)
    })
  }

  private get amp() {
    return this.amplifiers[this.pointer]
  }

  private next() {
    this.pointer = (this.pointer + 1) % this.amplifiers.length
  }

  run() {
    let nextInput: number | undefined = 0

    while (!this.amp.halted) {
      const output = this.amp.run()
      if (this.amp.halted) {
        break
      }

      nextInput = output.shift()
      if (nextInput === undefined) {
        throw new Error('Expected output to contain at least 1 number')
      }

      this.next()

      this.amp.input(nextInput)
    }

    return nextInput
  }
}

function part2() {
  const possibleSettings = permutator<number>(range(5, 9))

  const results = possibleSettings.map(settings =>
    new AmplifierSeries(code, settings).run()
  )

  return Math.max(...results)
}

const ans2 = part2()
console.log('Part 2', ans2)
