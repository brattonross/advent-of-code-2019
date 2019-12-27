import * as path from 'path'
import Point from '../shared/Point'
import readInput from '../shared/readInput'

type Result = {
  point: Point
  visible: number
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
 * Creates a map of angle to asteroids (excluding the station location).
 */
function asteroidMap(asteroids: Point[], station: Point) {
  return asteroids.reduce((map, asteroid) => {
    if (asteroid.x === station.x && asteroid.y === station.y) {
      return map
    }

    const a = angle(station, asteroid)
    if (!map.has(a)) {
      map.set(a, [])
    }
    const entry = map.get(a)
    entry!.push(asteroid)

    return map
  }, new Map<number, Point[]>())
}

/**
 * Returns the number of visible asteroids for the asteroid at
 * the given co-ordinates.
 */
export function visibleAsteroids(asteroids: Point[], pos: Point): number {
  return asteroidMap(asteroids, pos).size
}

/**
 * Returns the angle between the positive x-axis and the line created by the points a and b.
 */
function angle(a: Point, b: Point): number {
  return Math.atan2(a.y - b.y, a.x - b.x) * (180 / Math.PI)
}

const map = readInput(path.resolve(__dirname, 'input.txt'))
  .split('\n')
  .map(line => line.split(''))

function part1() {
  return bestAsteroid(map)
}

const ans1 = part1()
console.log('Part 1:', ans1)

function part2() {
  const as = asteroids(map)
  const station = bestAsteroid(map)
  const am = asteroidMap(as, station!.point)

  // Sort the map so that we iterate over the asteroids in a "clockwise" order.
  const sortedMap = [...am.entries()].sort((a, b) => a[0] - b[0])

  // We want to start from 90deg because this is "up" in terms of an angle from the x-axis.
  const startPos = sortedMap.findIndex(e => e[0] === 90)

  let totalDestroyed = 0
  const points = sortedMap.map(e => e[1])

  // Continuously iterate over the array in order, removing the first
  // asteroid found at each angle (if there is one), and adding to the
  // destroyed count until we reach 200.
  for (let i = startPos; ; i = (i + 1) % points.length) {
    if (!points[i].length) {
      continue
    }

    const destroyed = points[i].shift()!
    if (++totalDestroyed === 200) {
      return destroyed.x * 100 + destroyed.y
    }
  }
}

const ans2 = part2()
console.log('Part 2:', ans2)
