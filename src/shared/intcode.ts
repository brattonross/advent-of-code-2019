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
      case Opcode.LESS_THAN:
      case Opcode.EQUALS:
        return code.slice(startIndex, startIndex + 3)
      case Opcode.OUTPUT:
      case Opcode.WRITE:
        return code.slice(startIndex, startIndex + 1)
      case Opcode.JUMP_IF_TRUE:
      case Opcode.JUMP_IF_FALSE:
        return code.slice(startIndex, startIndex + 2)
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
      case Opcode.JUMP_IF_TRUE: {
        const [paramA, paramB] = parameters
        const numA = getParam(paramA, instruction.paramMode1)
        const numB = getParam(paramB, instruction.paramMode2)
        if (numA !== 0) {
          index = numB
        } else {
          index += 3
        }
        break
      }
      case Opcode.JUMP_IF_FALSE: {
        const [paramA, paramB] = parameters
        const numA = getParam(paramA, instruction.paramMode1)
        const numB = getParam(paramB, instruction.paramMode2)
        if (numA === 0) {
          index = numB
        } else {
          index += 3
        }
        break
      }
      case Opcode.LESS_THAN: {
        const [paramA, paramB, outputIndex] = parameters
        const numA = getParam(paramA, instruction.paramMode1)
        const numB = getParam(paramB, instruction.paramMode2)
        if (numA < numB) {
          code[outputIndex] = 1
        } else {
          code[outputIndex] = 0
        }
        index += 4
        break
      }
      case Opcode.EQUALS: {
        const [paramA, paramB, outputIndex] = parameters
        const numA = getParam(paramA, instruction.paramMode1)
        const numB = getParam(paramB, instruction.paramMode2)
        if (numA === numB) {
          code[outputIndex] = 1
        } else {
          code[outputIndex] = 0
        }
        index += 4
        break
      }
      case Opcode.HALT:
        return outputs
    }
  }

  return outputs
}

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

  // If the first parameter is `non-zero`, it sets the instruction pointer
  // to the value from the second parameter. Otherwise, it does nothing.
  JUMP_IF_TRUE = 5,

  // If the first parameter is zero, it sets the instruction pointer to
  // the value from the second parameter. Otherwise, it does nothing.
  JUMP_IF_FALSE = 6,

  // If the first parameter is less then the second, it stores 1 in the position
  // given by the third parameter. Otherwise it stores 0.
  LESS_THAN = 7,

  // If the first parameter is equal to the second parameter, it stores
  // 1 in the position given by the third parameter. Otherwise it stores 0.
  EQUALS = 8,

  // Immediately halts execution of the program.
  HALT = 99
}

export enum ParameterMode {
  // Parameter is counted as the position of the value
  Position,

  // Parameter itself is counted as the value
  Immediate
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
