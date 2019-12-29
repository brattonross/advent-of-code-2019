import * as path from 'path'
import readInput from '../shared/readInput'

export class Vector3 {
  constructor(public x: number, public y: number, public z: number) {}

  static from(v: Vector3) {
    return new Vector3(v.x, v.y, v.z)
  }

  static parse(s: string) {
    const [x, y, z] = s.match(/-?\d+/g)!.map(n => parseInt(n))
    return new Vector3(x, y, z)
  }

  add(v: Vector3) {
    this.x += v.x
    this.y += v.y
    this.z += v.z

    return this
  }

  sumAbs(): number {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
  }

  toString(): string {
    return `(${this.x}, ${this.y}, ${this.z})`
  }
}

export class Moon {
  constructor(
    public position: Vector3,
    public velocity = new Vector3(0, 0, 0)
  ) {}

  static parse(s: string): Moon {
    const [p, v] = s.split('>,')
    return new Moon(Vector3.parse(p), Vector3.parse(v))
  }

  toString(): string {
    return `${this.position} ${this.velocity}`
  }

  get potentialEnergy(): number {
    return this.position.sumAbs()
  }

  get kineticEnergy(): number {
    return this.velocity.sumAbs()
  }

  get totalEnergy(): number {
    return this.potentialEnergy * this.kineticEnergy
  }
}

function gravityBetween(pos1: number, pos2: number) {
  return pos1 === pos2 ? 0 : pos1 < pos2 ? 1 : -1
}

export class Simulation {
  public moons: Moon[]

  constructor(moons: Moon[]) {
    this.moons = moons
  }

  step() {
    this.moons = this.moons
      .map((moon, index) => {
        // Apply gravity
        moon.velocity = this.moons.reduce((vel, m, i) => {
          // Don't compare to self
          if (i === index) {
            return vel
          }

          const gravity = new Vector3(
            gravityBetween(moon.position.x, m.position.x),
            gravityBetween(moon.position.y, m.position.y),
            gravityBetween(moon.position.z, m.position.z)
          )

          return vel.add(gravity)
        }, Vector3.from(moon.velocity))

        return moon
      })
      .map(moon => {
        // Apply velocity
        moon.position.add(moon.velocity)
        return moon
      })
  }

  get totalEnergy(): number {
    return this.moons.reduce((sum, moon) => sum + moon.totalEnergy, 0)
  }
}

const moons = readInput(path.resolve(__dirname, 'input.txt'))
  .split('\n')
  .map(s => {
    const pos = Vector3.parse(s)
    return new Moon(pos)
  })

function part1() {
  const simulation = new Simulation(moons)

  for (let i = 0; i < 1000; i++) {
    simulation.step()
  }

  return simulation.totalEnergy
}

const ans1 = part1()
console.log('Part 1:', ans1)
