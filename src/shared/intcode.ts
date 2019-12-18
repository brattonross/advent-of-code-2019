export enum Opcode {
  // Adds together the first two parameters and stores them at
  // the location specified by the third parameter.
  ADD = 1,

  // Multiplies together the first two parameters and stores them
  // at the location specified by the third parameter.
  MULTIPLY = 2,

  // Takes an input and writes it to the location specified by the parameter.
  WRITE = 3,

  // Outputs the value of the parameter.
  OUTPUT = 4,

  // Immediately halts execution of the program.
  HALT = 99
}

export enum ParameterMode {
  // Parameter is counted as the position of the value
  Position,

  // Parameter itself is counted as the value
  Immediate
}

export function runIntcode(code: number[], input: number = 0): number[] {
  // Start the program at index 0
  let index = 0
  let outputs: number[] = []

  /** Returns a list of parameters from the code array based on the opcode. */
  function getParams(opcode: Opcode): number[] {
    const startIndex = index + 1

    switch (opcode) {
      case Opcode.ADD:
      case Opcode.MULTIPLY:
        return code.slice(startIndex, startIndex + 3)
      case Opcode.OUTPUT:
      case Opcode.WRITE:
        return code.slice(startIndex, startIndex + 1)
      default:
        return []
    }
  }

  /** Returns the value of the parameter based on the parameter mode. */
  function getParam(param: number, mode: ParameterMode): number {
    return mode === ParameterMode.Immediate ? param : code[param]
  }

  while (code[index] !== undefined) {
    const instruction: Instruction = parseInstruction(code[index])
    const parameters: number[] = getParams(instruction.opcode)

    switch (instruction.opcode) {
      case Opcode.ADD: {
        const [paramA, paramB, outputIndex] = parameters
        const numA = getParam(paramA, instruction.paramMode1)
        const numB = getParam(paramB, instruction.paramMode2)
        code[outputIndex] = numA + numB
        index += 4
        break
      }
      case Opcode.MULTIPLY: {
        const [paramA, paramB, outputIndex] = parameters
        const numA = getParam(paramA, instruction.paramMode1)
        const numB = getParam(paramB, instruction.paramMode2)
        code[outputIndex] = numA * numB
        index += 4
        break
      }
      case Opcode.WRITE: {
        const [outputIndex] = parameters
        code[outputIndex] = input
        index += 2
        break
      }
      case Opcode.OUTPUT: {
        const outputIndex = getParam(parameters[0], instruction.paramMode1)
        outputs.push(outputIndex)
        index += 2
        break
      }
      case Opcode.HALT:
        return outputs
    }
  }

  return outputs
}

export type Instruction = {
  opcode: Opcode
  paramMode1: ParameterMode
  paramMode2: ParameterMode
  paramMode3: ParameterMode
}

export function parseInstruction(n: number): Instruction {
  const instruction = n.toString().split('')

  const opcode = +instruction.slice(-2).join('')
  const paramMode1 = +(instruction[instruction.length - 3] || 0)
  const paramMode2 = +(instruction[instruction.length - 4] || 0)
  const paramMode3 = +(instruction[instruction.length - 5] || 0)

  return {
    opcode,
    paramMode1,
    paramMode2,
    paramMode3
  }
}
