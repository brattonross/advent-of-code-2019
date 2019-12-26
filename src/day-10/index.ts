export type Vector2 = {
  x: number
  y: number
}

export function asteroids(map: string[][]) {
  const asteroids: Vector2[] = []

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

// for each asteroid, compare to each other asteroid.
// work out right-angled triangle
// use angle as a key in set
// tan(angle) = opp / adj
// arctan(tan(angle)) = angle

/**
 * Returns the number of visible asteroids for the asteroid at
 * the given co-ordinates.
 */
export function visibleAsteroids(asteroids: Vector2[], pos: Vector2): number {
  return asteroids.reduce((set, asteroid) => {
    if (asteroid.x === pos.x && asteroid.y === pos.y) {
      return set
    }

    return set
  }, new Set<number>()).size
}

/**
 * Returns the angle between a vertical line which passes through point
 * a's x co-ordinate, and the line created by the points a and b.
 */
export function angle(a: Vector2, b: Vector2) {}
