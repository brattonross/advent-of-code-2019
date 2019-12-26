import { visibleAsteroids, Vector2, asteroids, angle } from '..'

test('asteroids', () => {
  const map = [
    ['.', '#', '.', '.', '#'],
    ['.', '.', '.', '.', '.'],
    ['#', '#', '#', '#', '#'],
    ['.', '.', '.', '.', '#'],
    ['.', '.', '.', '#', '#']
  ]
  const expected: Vector2[] = [
    { x: 1, y: 0 },
    { x: 4, y: 0 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
    { x: 4, y: 3 },
    { x: 3, y: 4 },
    { x: 4, y: 4 }
  ]

  const actual = asteroids(map)

  expect(actual).toEqual(expected)
})

test('visibleAsteroids', () => {
  const asteroids = [
    { x: 1, y: 0 },
    { x: 4, y: 0 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
    { x: 4, y: 3 },
    { x: 3, y: 4 },
    { x: 4, y: 4 }
  ]
  const cases = [
    {
      pos: {
        x: 1,
        y: 0
      },
      expected: 7
    }
  ]

  for (const tc of cases) {
    const actual = visibleAsteroids(asteroids, tc.pos)

    expect(actual).toEqual(tc.expected)
  }
})

test('angle', () => {
  const cases = [
    { a: { x: 0, y: 1 }, b: { x: 0, y: 0 }, expected: 0 },
    { a: { x: 0, y: 0 }, b: { x: 1, y: 0 }, expected: 90 },
    { a: { x: 0, y: 0 }, b: { x: 0, y: 1 }, expected: 180 },
    { a: { x: 1, y: 0 }, b: { x: 0, y: 0 }, expected: 270 },
    { a: { x: 0, y: 0 }, b: { x: 1, y: 1 }, expected: 45 }
  ]

  for (const tc of cases) {
    const actual = angle(tc.a, tc.b)

    expect(actual).toEqual(tc.expected)
  }
})
