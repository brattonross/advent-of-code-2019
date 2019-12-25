import { Opcode } from './Opcode'
import { Instruction } from './Instruction'
import { ParameterMode } from './ParameterMode'

type OperationFunction = (...params: number[]) => { jumped: boolean } | void

interface IOperation {
  /** The number of parameters that this operation takes. */
  parameters: number

  /** Executes the operation. */
  execute: OperationFunction

  /** Whether the operation writes to memory. */
  writes?: boolean

  /** Whether the operation can assign the instruction pointer. */
  jumps?: boolean
}

class Operation implements IOperation {
  constructor(
    public parameters: number,
    public execute: OperationFunction,
    public writes = false,
    public jumps = false
  ) {}

  public static from(op: IOperation): Operation {
    return new Operation(op.parameters, op.execute, op.writes, op.jumps)
  }
}

type Operations = {
  [key in Opcode]: Operation
}

export class Computer {
  private memory: number[]
  public inputs: number[]
  public outputs: number[] = []
  private pointer = 0
  private relativeBase = 0
  public halted = false
  private operations: Operations = {
    [Opcode.ADD]: Operation.from({
      parameters: 3,
      execute: (a, b, out) => {
        this.memory[out] = a + b
      },
      writes: true
    }),

    [Opcode.MULTIPLY]: Operation.from({
      parameters: 3,
      execute: (a, b, out) => {
        this.memory[out] = a * b
      },
      writes: true
    }),

    [Opcode.WRITE]: Operation.from({
      parameters: 1,
      execute: out => {
        const input = this.inputs.shift()
        if (input === undefined) {
          throw new TypeError('Expected input but got undefined')
        }
        this.memory[out] = input
      },
      writes: true
    }),

    [Opcode.OUTPUT]: Operation.from({
      parameters: 1,
      execute: out => {
        this.outputs.push(out)
      }
    }),

    [Opcode.JUMP_IF_TRUE]: Operation.from({
      parameters: 2,
      execute: (a, b) => {
        if (a !== 0) {
          this.pointer = b
          return { jumped: true }
        }
      },
      jumps: true
    }),

    [Opcode.JUMP_IF_FALSE]: Operation.from({
      parameters: 2,
      execute: (a, b) => {
        if (a == 0) {
          this.pointer = b
          return { jumped: true }
        }
      },
      jumps: true
    }),

    [Opcode.LESS_THAN]: Operation.from({
      parameters: 3,
      execute: (a, b, out) => {
        if (a < b) {
          this.memory[out] = 1
        } else {
          this.memory[out] = 0
        }
      },
      writes: true
    }),

    [Opcode.EQUALS]: Operation.from({
      parameters: 3,
      execute: (a, b, out) => {
        if (a === b) {
          this.memory[out] = 1
        } else {
          this.memory[out] = 0
        }
      },
      writes: true
    }),

    [Opcode.ADJUST_RELATIVE]: Operation.from({
      parameters: 1,
      execute: a => {
        this.relativeBase += a
      }
    }),

    [Opcode.HALT]: Operation.from({
      parameters: 0,
      execute: () => {
        this.halted = true
      }
    })
  }

  constructor(memory: number[], inputs: number[] | number) {
    this.memory = [...memory]
    this.inputs = Array.isArray(inputs) ? inputs : [inputs]
  }

  /**
   * Runs the computer until an Output or Halt instruction is reached.
   */
  run(): number[] {
    while (!this.halted) {
      const instruction = this.parseInstruction(this.memory[this.pointer])
      const operation = this.operations[instruction.opcode]

      this.pointer++
      const parameters = instruction.modes.map((mode, index) => {
        let parameter = this.memory[this.pointer + index]

        // If the operation does not write, or it does and we aren't on the
        // last parameter, we should check if it is in Position Mode.
        if (!operation.writes || index < instruction.modes.length - 1) {
          if (mode === ParameterMode.Position) {
            parameter = this.memory[parameter]
          } else if (mode === ParameterMode.Relative) {
            parameter = this.memory[this.relativeBase + parameter]
          }
        } else if (
          operation.writes &&
          index === instruction.modes.length - 1 &&
          mode === ParameterMode.Relative
        ) {
          parameter = this.relativeBase + parameter
        }

        return parameter
      })

      const result = operation.execute(...parameters)
      // If the operation does not jump, or we didn't jump,
      // then increment the pointer by the number of parameters.
      if (
        !operation.jumps ||
        (operation.jumps && (!result || !result.jumped))
      ) {
        this.pointer += parameters.length
      }

      // If the program outputs or halts, then stop running.
      if (this.halted || instruction.opcode === Opcode.OUTPUT) {
        break
      }
    }

    return this.outputs
  }

  public input(inputs: number[] | number): void {
    const newInput = Array.isArray(inputs) ? inputs : [inputs]
    this.inputs = [...this.inputs, ...newInput]
  }

  private parseInstruction(n: number): Instruction {
    const instruction = n
      .toString()
      .padStart(2, '0')
      .split('')

    const opcode = +instruction.slice(-2).join('') as Opcode
    const op = this.operations[opcode]

    const modes: number[] = []
    for (let i = 3; i <= 2 + op.parameters; i++) {
      modes.push(+(instruction[instruction.length - i] || 0))
    }

    return new Instruction(opcode, modes)
  }

  /** Outputs the current */
  dump(): number[] {
    return [...this.memory]
  }
}
