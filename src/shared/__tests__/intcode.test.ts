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
    }
  ]

  for (const tc of cases) {
    const actual = parseInstruction(tc.num)

    expect(actual).toEqual(tc.expected)
  }
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
