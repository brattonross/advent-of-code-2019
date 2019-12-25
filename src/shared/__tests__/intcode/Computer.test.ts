import { Computer } from '../../intcode'

test('passes day 02 tests', () => {
  const cases = [
    { code: [1, 0, 0, 0, 99], expected: [2, 0, 0, 0, 99] },
    { code: [2, 3, 0, 3, 99], expected: [2, 3, 0, 6, 99] },
    { code: [2, 4, 4, 5, 99, 0], expected: [2, 4, 4, 5, 99, 9801] },
    {
      code: [1, 1, 1, 4, 99, 5, 6, 0, 99],
      expected: [30, 1, 1, 4, 2, 5, 6, 0, 99]
    }
  ]

  for (const tc of cases) {
    const computer = new Computer(tc.code, [])
    computer.run()

    const actual = computer.dump()

    expect(actual).toEqual(tc.expected)
  }
})

test('passes day 05 tests', () => {
  const cases = [
    {
      code: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
      input: 8,
      expected: 1
    },
    {
      code: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
      input: 1,
      expected: 0
    },
    {
      code: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
      input: 0,
      expected: 0
    },
    {
      code: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
      input: 1,
      expected: 1
    },
    {
      code: [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
      input: 0,
      expected: 0
    },
    {
      code: [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
      input: 1,
      expected: 1
    },
    {
      code: [
        3,
        21,
        1008,
        21,
        8,
        20,
        1005,
        20,
        22,
        107,
        8,
        21,
        20,
        1006,
        20,
        31,
        1106,
        0,
        36,
        98,
        0,
        0,
        1002,
        21,
        125,
        20,
        4,
        20,
        1105,
        1,
        46,
        104,
        999,
        1105,
        1,
        46,
        1101,
        1000,
        1,
        20,
        4,
        20,
        1105,
        1,
        46,
        98,
        99
      ],
      input: 0,
      expected: 999
    },
    {
      code: [
        3,
        21,
        1008,
        21,
        8,
        20,
        1005,
        20,
        22,
        107,
        8,
        21,
        20,
        1006,
        20,
        31,
        1106,
        0,
        36,
        98,
        0,
        0,
        1002,
        21,
        125,
        20,
        4,
        20,
        1105,
        1,
        46,
        104,
        999,
        1105,
        1,
        46,
        1101,
        1000,
        1,
        20,
        4,
        20,
        1105,
        1,
        46,
        98,
        99
      ],
      input: 8,
      expected: 1000
    },
    {
      code: [
        3,
        21,
        1008,
        21,
        8,
        20,
        1005,
        20,
        22,
        107,
        8,
        21,
        20,
        1006,
        20,
        31,
        1106,
        0,
        36,
        98,
        0,
        0,
        1002,
        21,
        125,
        20,
        4,
        20,
        1105,
        1,
        46,
        104,
        999,
        1105,
        1,
        46,
        1101,
        1000,
        1,
        20,
        4,
        20,
        1105,
        1,
        46,
        98,
        99
      ],
      input: 9,
      expected: 1001
    }
  ]

  for (const tc of cases) {
    const computer = new Computer(tc.code, tc.input)
    const [actual] = computer.run()

    expect(actual).toEqual(tc.expected)
  }
})

test('run finishes after an output', () => {
  const computer = new Computer([4, 0, 99], [])

  const actual = computer.run()
  expect(actual).toEqual([4])
  expect(computer.halted).toEqual(false)
})

test('passes day 09 test 1', () => {
  const code = [
    109,
    1,
    204,
    -1,
    1001,
    100,
    1,
    100,
    1008,
    100,
    16,
    101,
    1006,
    101,
    0,
    99
  ]
  const computer = new Computer(code, [])

  let actual: number[] = []
  while (!computer.halted) {
    actual = computer.run()
  }

  expect(actual).toEqual(code)
})

test('passes day 09 test 2', () => {
  const code = [1102, 34915192, 34915192, 7, 4, 7, 99, 0]
  const computer = new Computer(code, [])

  const [actual] = computer.run()

  expect(actual).toBeTruthy()
  expect(actual.toString().split('').length).toEqual(16)
})

test('passes day 09 test 3', () => {
  const code = [104, 1125899906842624, 99]
  const computer = new Computer(code, [])

  const [actual] = computer.run()

  expect(actual).toEqual(1125899906842624)
})
