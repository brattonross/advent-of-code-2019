import { Opcode, ParameterMode } from '.'

export class Instruction {
  constructor(public opcode: Opcode, public modes: ParameterMode[]) {
    if (!(opcode in Opcode)) {
      throw new TypeError(`Unsupported opcode: ${opcode}`)
    }
  }
}
