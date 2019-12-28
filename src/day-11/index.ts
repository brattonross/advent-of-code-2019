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

function paintHull(start: Color = Color.Black) {
  const map = new Map<string, Color>([['0,0', start]])
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

  return map
}

function part1() {
  const map = paintHull()
  return map.size
}

const ans1 = part1()
console.log('Part 1:', ans1)

function part2() {
  const map = paintHull(Color.White)

  let h = 0
  let w = 0

  for (const key of map.keys()) {
    const [x, y] = key.split(',').map(n => parseInt(n))
    if (x > w) {
      w = x
    }
    if (y > h) {
      h = y
    }
  }

  for (let x = 0; x <= w; x++) {
    const arr: string[] = []
    for (let y = 0; y <= h; y++) {
      const s = map.get(pointToString(x, y)) === Color.White ? '#' : ' '
      arr.push(s)
    }
    console.log(arr)
  }
}

part2()
