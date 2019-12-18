import * as path from 'path'
import readInput from '../shared/readInput'
import { runIntcode } from '../shared/intcode'

const code = readInput(path.resolve(__dirname, './input.txt'))
  .split(',')
  .map(n => parseInt(n))
const input = 1

const output = runIntcode(code, input)
console.log(output)
