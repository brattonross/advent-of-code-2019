import {
  runIntcode,
  Instruction,
  Opcode,
  ParameterMode,
  parseInstruction
} from '../intcode'

test('parseInstruction', () => {
  const cases: { num: number; expected: Instruction }[] = [
    {
      num: 1002,
      expected: {
        opcode: Opcode.MULTIPLY,
        paramMode1: ParameterMode.Position,
        paramMode2: ParameterMode.Immediate,
        paramMode3: ParameterMode.Position
      }
    },
    {
      num: 8,
      expected: {
        opcode: Opcode.EQUALS,
        paramMode1: ParameterMode.Position,
        paramMode2: ParameterMode.Position,
        paramMode3: ParameterMode.Position
      }
    }
  ]

  for (const tc of cases) {
    const actual = parseInstruction(tc.num)

    expect(actual).toEqual(tc.expected)
  }
})

describe('runIntcode', () => {
  it('passes the tests from day 2', () => {
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
      runIntcode(tc.code)
      expect(tc.code).toEqual(tc.expected)
    }
  })

  it('passes the tests from day 5', () => {
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
      const [actual] = runIntcode(tc.code, tc.input)
      expect(actual).toEqual(tc.expected)
    }
  })
})
