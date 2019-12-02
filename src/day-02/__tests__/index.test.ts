import { add, multiply, runIntcode } from '..'

test('add', () => {
  const arr = [1, 4, 5, 6, 10, 20, 0]
  add(arr, 1)

  expect(arr).toEqual([1, 4, 5, 6, 10, 20, 30])
})

test('multiply', () => {
  const arr = [2, 4, 5, 6, 10, 20, 0]
  multiply(arr, 1)

  expect(arr).toEqual([2, 4, 5, 6, 10, 20, 200])
})

test('runIntcode', () => {
  const cases = [
    { input: [1, 0, 0, 0, 99], expected: [2, 0, 0, 0, 99] },
    { input: [2, 3, 0, 3, 99], expected: [2, 3, 0, 6, 99] },
    { input: [2, 4, 4, 5, 99, 0], expected: [2, 4, 4, 5, 99, 9801] },
    {
      input: [1, 1, 1, 4, 99, 5, 6, 0, 99],
      expected: [30, 1, 1, 4, 2, 5, 6, 0, 99]
    }
  ]

  for (const tc of cases) {
    runIntcode(tc.input)

    expect(tc.input).toEqual(tc.expected)
  }
})
