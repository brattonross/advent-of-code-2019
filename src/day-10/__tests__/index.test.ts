import { visibleAsteroids, Point, asteroids, bestAsteroid } from '..'

test('asteroids', () => {
  const map = [
    ['.', '#', '.', '.', '#'],
    ['.', '.', '.', '.', '.'],
    ['#', '#', '#', '#', '#'],
    ['.', '.', '.', '.', '#'],
    ['.', '.', '.', '#', '#']
  ]
  const expected: Point[] = [
    new Point(1, 0),
    new Point(4, 0),
    new Point(0, 2),
    new Point(1, 2),
    new Point(2, 2),
    new Point(3, 2),
    new Point(4, 2),
    new Point(4, 3),
    new Point(3, 4),
    new Point(4, 4)
  ]

  const actual = asteroids(map)

  expect(actual).toEqual(expected)
})

test('visibleAsteroids', () => {
  const asteroids = [
    new Point(1, 0),
    new Point(4, 0),
    new Point(0, 2),
    new Point(1, 2),
    new Point(2, 2),
    new Point(3, 2),
    new Point(4, 2),
    new Point(4, 3),
    new Point(3, 4),
    new Point(4, 4)
  ]
  const cases = [
    { pos: new Point(1, 0), expected: 7 },
    { pos: new Point(4, 0), expected: 7 },
    { pos: new Point(0, 2), expected: 6 },
    { pos: new Point(1, 2), expected: 7 },
    { pos: new Point(2, 2), expected: 7 },
    { pos: new Point(3, 2), expected: 7 },
    { pos: new Point(4, 2), expected: 5 },
    { pos: new Point(4, 3), expected: 7 },
    { pos: new Point(3, 4), expected: 8 },
    { pos: new Point(4, 4), expected: 7 }
  ]

  for (const tc of cases) {
    const actual = visibleAsteroids(asteroids, tc.pos)

    expect(actual).toEqual(tc.expected)
  }
})

test('bestAsteroid', () => {
  const cases = [
    {
      map: [
        '......#.#.'.split(''),
        '#..#.#....'.split(''),
        '..#######.'.split(''),
        '.#.#.###..'.split(''),
        '.#..#.....'.split(''),
        '..#....#.#'.split(''),
        '#..#....#.'.split(''),
        '.##.#..###'.split(''),
        '##...#..#.'.split(''),
        '.#....####'.split('')
      ],
      expected: { point: new Point(5, 8), visible: 33 }
    },
    {
      map: [
        '#.#...#.#.'.split(''),
        '.###....#.'.split(''),
        '.#....#...'.split(''),
        '##.#.#.#.#'.split(''),
        '....#.#.#.'.split(''),
        '.##..###.#'.split(''),
        '..#...##..'.split(''),
        '..##....##'.split(''),
        '......#...'.split(''),
        '.####.###.'.split('')
      ],
      expected: { point: new Point(1, 2), visible: 35 }
    },
    {
      map: [
        '.#..#..###'.split(''),
        '####.###.#'.split(''),
        '....###.#.'.split(''),
        '..###.##.#'.split(''),
        '##.##.#.#.'.split(''),
        '....###..#'.split(''),
        '..#.#..#.#'.split(''),
        '#..#.#.###'.split(''),
        '.##...##.#'.split(''),
        '.....#.#..'.split('')
      ],
      expected: { point: new Point(6, 3), visible: 41 }
    },
    {
      map: [
        '.#..##.###...#######'.split(''),
        '##.############..##.'.split(''),
        '.#.######.########.#'.split(''),
        '.###.#######.####.#.'.split(''),
        '#####.##.#.##.###.##'.split(''),
        '..#####..#.#########'.split(''),
        '####################'.split(''),
        '#.####....###.#.#.##'.split(''),
        '##.#################'.split(''),
        '#####.##.###..####..'.split(''),
        '..######..##.#######'.split(''),
        '####.##.####...##..#'.split(''),
        '.#####..#.######.###'.split(''),
        '##...#.##########...'.split(''),
        '#.##########.#######'.split(''),
        '.####.#.###.###.#.##'.split(''),
        '....##.##.###..#####'.split(''),
        '.#.#.###########.###'.split(''),
        '#.#.#.#####.####.###'.split(''),
        '###.##.####.##.#..##'.split('')
      ],
      expected: { point: new Point(11, 13), visible: 210 }
    }
  ]

  for (const tc of cases) {
    const actual = bestAsteroid(tc.map)

    expect(actual).toEqual(tc.expected)
  }
})
