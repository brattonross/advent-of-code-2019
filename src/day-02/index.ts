import { resolve } from 'path'
import readInput from '../shared/readInput'

enum Opcode {
  ADD = 1,
  MULTIPLY = 2,
  HALT = 99
}

run()

function run() {
  const arr = readInput(resolve(__dirname, 'input.txt'))
    .split(',')
    .map(n => parseInt(n))

  arr[1] = 12
  arr[2] = 2

  runIntcode(arr)

  console.log(arr[0])
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
