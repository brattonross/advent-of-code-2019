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

  // Adjusts the relative base by the value of its only parameter.
  ADJUST_RELATIVE = 9,

  // Immediately halts execution of the program.
  HALT = 99
}
