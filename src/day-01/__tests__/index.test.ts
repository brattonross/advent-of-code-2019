import { fuelRequirement, sum, additionalFuelRequirement } from '..'

describe('fuelRequirement', () => {
  it('returns the correct requirement', () => {
    const cases = [
      { mass: 12, expected: 2 },
      { mass: 14, expected: 2 },
      { mass: 1969, expected: 654 },
      { mass: 100756, expected: 33583 }
    ]

    for (const testCase of cases) {
      const actual = fuelRequirement(testCase.mass)
      expect(actual).toEqual(testCase.expected)
    }
  })
})

describe('sum', () => {
  it('sums numbers', () => {
    const cases = [
      { nums: [1, 2, 3], expected: 6 },
      { nums: [2, 2, 654, 33583], expected: 34241 }
    ]

    for (const tc of cases) {
      const actual = sum(...tc.nums)
      expect(actual).toEqual(tc.expected)
    }
  })
})

describe('additionalFuelRequirement', () => {
  it('returns the correct requirement', () => {
    const cases = [
      { mass: 12, expected: 2 },
      { mass: 14, expected: 2 },
      { mass: 1969, expected: 966 },
      { mass: 100756, expected: 50346 }
    ]

    for (const tc of cases) {
      const actual = additionalFuelRequirement(tc.mass)
      expect(actual).toEqual(tc.expected)
    }
  })
})
