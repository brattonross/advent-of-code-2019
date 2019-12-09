import * as path from 'path'

import readInput from '../shared/readInput'

// Read in the two wires, map them to a list of instructions
const [wireA, wireB] = readInput(path.resolve(__dirname, 'input.txt'))
  .split('\n')
  .map(wire => wire.split(','))

const xMultiplier: { [key: string]: number } = {
  L: -1,
  R: 1,
  U: 0,
  D: 0
}

const yMultiplier: { [key: string]: number } = {
  L: 0,
  R: 0,
  U: -1,
  D: 1
}

/**
 * Generates a range from start to end (inclusive).
 */
function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

type Vector2 = {
  x: number
  y: number
}

/**
 * Returns a list of all points covered by the given wire.
 */
function allPoints(wire: string[]): Vector2[] {
  let x = 0
  let y = 0

  return wire.reduce((acc: Vector2[], cur) => {
    const dir = cur[0]
    const dist = parseInt(cur.slice(1))

    return [
      ...acc,
      ...range(1, dist).map(() => {
        x += xMultiplier[dir]
        y += yMultiplier[dir]

        return { x, y }
      })
    ]
  }, [])
}

// Calculate all points in each wires path.
const pointsA = allPoints(wireA)
const pointsB = allPoints(wireB)

// Calculate the points at which the wires cross.
// NOTE: very slow
const crossingPoints = pointsA.filter(pointA =>
  pointsB.some(pointB => pointB.x === pointA.x && pointB.y === pointA.y)
)

const minDistance = Math.min(
  ...crossingPoints.map(({ x, y }) => Math.abs(x) + Math.abs(y))
)

console.log(minDistance)
