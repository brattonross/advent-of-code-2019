import { resolve } from 'path'

import readInput from '../shared/readInput'
import { Computer } from '../shared/intcode'

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

      let input = [...arr]
      const computer = new Computer(input, [])
      computer.run()
      input = computer.dump()

      if (input[0] === targetValue) {
        console.log(`100 * ${noun} + ${verb} = ${100 * noun + verb}`)
        return
      }
    }
  }
}
