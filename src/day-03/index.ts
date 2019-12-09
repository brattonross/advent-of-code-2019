import * as path from 'path'

import range from '../shared/range'
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

type Vector2 = {
  x: number
  y: number
}

type Point = Vector2 & { length: number }

/**
 * Returns a list of all points covered by the given wire.
 */
function allPoints(wire: string[]): Point[] {
  let x = 0
  let y = 0
  let length = 0

  return wire.reduce((acc: Point[], cur) => {
    const dir = cur[0]
    const dist = parseInt(cur.slice(1))

    return [
      ...acc,
      ...range(1, dist).map(() => {
        x += xMultiplier[dir]
        y += yMultiplier[dir]
        length += 1

        return { x, y, length }
      })
    ]
  }, [])
}

// Calculate all points in each wires path.
const pointsA = allPoints(wireA)
const pointsB = allPoints(wireB)

// Calculate the points at which the wires cross.
// NOTE: very slow
// Part 1 implementation
// const crossingPoints = pointsA.filter(pointA =>
//   pointsB.some(pointB => pointB.x === pointA.x && pointB.y === pointA.y)
// )

// Part 1 implementation
// const minDistance = Math.min(
//   ...crossingPoints.map(({ x, y }) => Math.abs(x) + Math.abs(y))
// )

const crossingPoints = pointsA.reduce((acc: { a: Point; b: Point }[], cur) => {
  const matchingPoint = pointsB.find(
    pointB => pointB.x === cur.x && pointB.y === cur.y
  )
  if (!matchingPoint) {
    return acc
  }

  return [...acc, { a: cur, b: matchingPoint }]
}, [])

const minDistance = Math.min(
  ...crossingPoints.map(({ a, b }) => a.length + b.length)
)

console.log(minDistance)
