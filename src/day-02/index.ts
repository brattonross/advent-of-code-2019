import { resolve } from 'path'

import readInput from '../shared/readInput'
import { runIntcode } from '../shared/intcode'

run()

function run(): void {
  const targetValue = 19690720
  const arr = readInput(resolve(__dirname, 'input.txt'))
    .split(',')
    .map(n => parseInt(n, 10))

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      arr[1] = noun
      arr[2] = verb

      const input = [...arr]
      runIntcode(input)

      if (input[0] === targetValue) {
        console.log(`100 * ${noun} + ${verb} = ${100 * noun + verb}`)
        return
      }
    }
  }
}
