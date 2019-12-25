export enum ParameterMode {
  // Parameter is counted as the position of the value
  Position,

  // Parameter itself is counted as the value
  Immediate,

  // Uses the sum of the relative base with the parameter
  // as the position of the value
  Relative
}
