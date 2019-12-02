import { resolve } from 'path'
import readInput from '../shared/readInput'

run()

function run() {
  const masses: number[] = readInput(resolve(__dirname, 'input.txt'))
    .split('\n')
    .map(n => parseInt(n))

  const total = sum(...masses.map(additionalFuelRequirement))
  console.log('Total', total)
}

export function sum(...nums: number[]) {
  return nums.reduce((acc, cur) => acc + cur, 0)
}

export function fuelRequirement(mass: number): number {
  return Math.floor(mass / 3) - 2
}

export function additionalFuelRequirement(mass: number): number {
  let total = 0
  let requirement = fuelRequirement(mass)
  while (requirement > 0) {
    total += requirement
    requirement = fuelRequirement(requirement)
  }
  return total
}
