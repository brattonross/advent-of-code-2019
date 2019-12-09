import { hasTwoAdjacentSame, increases } from '..'

test('hasTwoAdjacentSame', () => {
  const cases = [
    { num: 11111, expected: true },
    { num: 123456789, expected: false },
    { num: 122345, expected: true },
    { num: 123345, expected: true },
    { num: 123445, expected: true },
    { num: 123455, expected: true }
  ]

  for (const tc of cases) {
    const actual = hasTwoAdjacentSame(tc.num)

    expect(actual).toEqual(tc.expected)
  }
})

test('increases', () => {
  const cases = [
    { num: 11110, expected: false },
    { num: 123456789, expected: true },
    { num: 223450, expected: false }
  ]

  for (const tc of cases) {
    const actual = increases(tc.num)

    expect(actual).toEqual(tc.expected)
  }
})
