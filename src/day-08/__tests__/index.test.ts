import { SpaceImage, count } from '..'

describe('SpaceImage', () => {
  it('returns all layers', () => {
    const pixels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2]
    const width = 3
    const height = 2

    const img = new SpaceImage(pixels, width, height)

    const actual = img.layers

    expect(actual).toEqual([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 0, 1, 2]
    ])
  })
})

test('count', () => {
  const cases = [
    { arr: [0, 0, 0, 1], num: 0, expected: 3 },
    { arr: [1, 2, 3, 4], num: 1, expected: 1 },
    { arr: [0, 0, 0, 0], num: 1, expected: 0 }
  ]

  for (const tc of cases) {
    const actual = count(tc.arr, tc.num)

    expect(actual).toEqual(tc.expected)
  }
})
