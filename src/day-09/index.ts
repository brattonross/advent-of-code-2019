import * as path from 'path'
import readInput from '../shared/readInput'
import { Computer } from '../shared/intcode'

const code = readInput(path.resolve(__dirname, 'input.txt'))
  .split(',')
  .map(n => parseInt(n))

function part1() {
  const computer = new Computer(code, 1)

  let output: number[] = []
  while (!computer.halted) {
    output = computer.run()
  }

  return output
}

const ans1 = part1()
console.log(ans1)
