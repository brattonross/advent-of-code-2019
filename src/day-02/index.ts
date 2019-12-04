import { resolve } from 'path'
import readInput from '../shared/readInput'

enum Opcode {
  ADD = 1,
  MULTIPLY = 2,
  HALT = 99
}

run()

function run() {
  const targetValue = 19690720
  const arr = readInput(resolve(__dirname, 'input.txt'))
    .split(',')
    .map(n => parseInt(n))

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

export function runIntcode(arr: number[]): void {
  let index = 0
  while (true) {
    switch (arr[index]) {
      case Opcode.ADD:
        add(arr, index + 1)
        break
      case Opcode.MULTIPLY:
        multiply(arr, index + 1)
        break
      case Opcode.HALT:
        return
    }
    index += 4
  }
}

export function add(arr: number[], start: number): void {
  const [inputAIndex, inputBIndex, outputIndex] = getIndicies(arr, start)

  arr[outputIndex] = arr[inputAIndex] + arr[inputBIndex]
}

export function multiply(arr: number[], start: number): void {
  const [inputAIndex, inputBIndex, outputIndex] = getIndicies(arr, start)

  arr[outputIndex] = arr[inputAIndex] * arr[inputBIndex]
}

function getIndicies(arr: number[], start: number): number[] {
  return [arr[start], arr[start + 1], arr[start + 2]]
}
