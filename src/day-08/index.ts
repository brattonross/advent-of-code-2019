import * as path from 'path'
import readInput from '../shared/readInput'

const HEIGHT = 6
const WIDTH = 25

export class SpaceImage {
  private pixels: number[]

  constructor(pixels: number[], private width: number, private height: number) {
    this.pixels = [...pixels]
  }

  layer(n: number): number[] {
    const start = n * this.width * this.height
    const end = start + this.width * this.height
    return this.pixels.slice(start, end)
  }

  get layers(): number[][] {
    const layers = []

    for (let i = 0; ; i++) {
      const layer = this.layer(i)
      if (!layer.length) {
        break
      }

      layers.push(layer)
    }

    return layers
  }
}

const pixels = readInput(path.resolve(__dirname, './input.txt'))
  .split('')
  .map(n => parseInt(n))

/**
 * Returns the number of elements in the array that match the given argument.
 */
export function count<T>(arr: T[], item: T): number {
  return arr.reduce((total, a) => total + (a === item ? 1 : 0), 0)
}

function part1() {
  const img = new SpaceImage(pixels, WIDTH, HEIGHT)

  const zeroCounts = img.layers.map(layer => count(layer, 0))
  const layerIndex = zeroCounts.indexOf(Math.min(...zeroCounts))
  const layer = img.layer(layerIndex)

  const oneCounts = count(layer, 1)
  const twoCounts = count(layer, 2)

  return oneCounts * twoCounts
}

const ans1 = part1()
console.log('Part 1:', ans1)
