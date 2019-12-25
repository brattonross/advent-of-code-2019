import * as path from 'path'
import readInput from '../shared/readInput'
import { Computer } from '../shared/intcode'

const code = readInput(path.resolve(__dirname, './input.txt'))
  .split(',')
  .map(n => parseInt(n))

// part 1
// const input = 1

// part 2
const input = [5]

const output = new Computer(code, input).run()
console.log(output)
