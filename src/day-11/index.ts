import * as path from 'path'
import { Computer } from '../shared/intcode'
import readInput from '../shared/readInput'

enum Color {
  Black = 0,
  White = 1
}

const UP = { x: 0, y: -1 }
const LEFT = { x: -1, y: 0 }
const RIGHT = { x: 1, y: 0 }
const DOWN = { x: 0, y: 1 }

const moves = [UP, RIGHT, DOWN, LEFT]

const code = readInput(path.resolve(__dirname, 'input.txt'))
  .split(',')
  .map(n => parseInt(n))

function pointToString(x: number, y: number): string {
  return `${x},${y}`
}

function part1() {
  const map = new Map<string, Color>()
  let current = { x: 0, y: 0 }
  let dir = 0
  const robot = new Computer(code, [])

  while (!robot.halted) {
    const currentKey = pointToString(current.x, current.y)
    const input = map.get(currentKey) || Color.Black
    robot.input(input)

    robot.run()
    // Get the color to paint
    const color = robot.outputs.shift() as Color
    if (color === undefined) {
      break
    }
    map.set(currentKey, color)

    robot.run()
    // Get the next direction
    const diff = robot.outputs.shift() || -1
    dir = dir + diff
    if (dir < 0) {
      dir = moves.length - 1
    } else if (dir > moves.length - 1) {
      dir = 0
    }

    // Move the current position
    const move = moves[dir]
    current.x += move.x
    current.y += move.y
  }

  return map.size
}

const ans1 = part1()
console.log('Part 1:', ans1)
