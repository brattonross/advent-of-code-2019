import * as path from 'path'
import readInput from '../shared/readInput'

type Result = {
  point: Point
  visible: number
}

export class Point {
  constructor(public x: number, public y: number) {}
}

export function bestAsteroid(map: string[][]) {
  const allAsteroids = asteroids(map)

  return allAsteroids.reduce<Result | undefined>((best, asteroid) => {
    const total = visibleAsteroids(allAsteroids, asteroid)
    if (best === undefined) {
      return { point: asteroid, visible: total }
    }

    if (total > best.visible) {
      return { point: asteroid, visible: total }
    }

    return best
  }, undefined)
}

export function asteroids(map: string[][]) {
  const asteroids: Point[] = []

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '.') {
        continue
      }
      asteroids.push({ x, y })
    }
  }

  return asteroids
}

/**
 * Returns the number of visible asteroids for the asteroid at
 * the given co-ordinates.
 */
export function visibleAsteroids(asteroids: Point[], pos: Point): number {
  return asteroids.reduce((set, asteroid) => {
    if (asteroid.x === pos.x && asteroid.y === pos.y) {
      return set
    }

    return set.add(angle(pos, asteroid))
  }, new Set<number>()).size
}

/**
 * Returns the angle between the positive x-axis and the line created by the points a and b.
 */
function angle(a: Point, b: Point): number {
  return Math.atan2(a.y - b.y, a.x - b.x)
}

const map = readInput(path.resolve(__dirname, 'input.txt'))
  .split('\n')
  .map(line => line.split(''))

function part1() {
  return bestAsteroid(map)
}

const ans1 = part1()
console.log('Part 1:', ans1)
