import { hasTwoAdjacentSame, increases } from '..'

test('hasTwoAdjacentSame', () => {
  const cases = [
    { num: [1, 1, 1, 1, 1], expected: false },
    { num: [1, 2, 3, 4, 5, 6, 7, 8, 9], expected: false },
    { num: [1, 2, 2, 3, 4, 5], expected: true },
    { num: [1, 2, 3, 3, 4, 5], expected: true },
    { num: [1, 2, 3, 4, 4, 5], expected: true },
    { num: [1, 2, 3, 4, 5, 5], expected: true }
  ]

  for (const tc of cases) {
    const actual = hasTwoAdjacentSame(tc.num)

    expect(actual).toEqual(tc.expected)
  }
})

test('increases', () => {
  const cases = [
    { num: [1, 1, 1, 1, 0], expected: false },
    { num: [1, 2, 3, 4, 5, 6, 7, 8, 9], expected: true },
    { num: [2, 2, 3, 4, 5, 0], expected: false }
  ]

  for (const tc of cases) {
    const actual = increases(tc.num)

    expect(actual).toEqual(tc.expected)
  }
})
