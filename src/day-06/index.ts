import * as path from 'path'
import readInput from '../shared/readInput'

export interface Node<T> {
  value: T
  next?: Node<T>
}

/**
 * Converts a list of orbital relationships to an adjacency list.
 * @param relationships List of orbital relationships (e.g. `AAA)BBB`).
 */
export function toAdjacencyList(relationships: string[]): Node<string>[] {
  return relationships.reduce((lists: Node<string>[], line) => {
    const [to, from] = line.split(')')

    let toNode = lists.find(list => list.value === to)
    if (!toNode) {
      toNode = {
        value: to
      }
      lists.push(toNode)
    }

    let fromNode = lists.find(list => list.value === from)
    if (!fromNode) {
      fromNode = {
        value: from
      }
      lists.push(fromNode)
    }

    fromNode.next = toNode

    return lists
  }, [])
}

/**
 * Returns the total number of direct + indirect orbits for the list.
 */
export function totalOrbits(list: Node<string>[]): number {
  return list.reduce((total, node) => {
    while (node.next) {
      total += 1
      node = node.next
    }
    return total
  }, 0)
}

/**
 * Returns the object at which the two nodes cross orbital paths, if any.
 */
export function crossAt(
  nodeA: Node<string>,
  nodeB: Node<string>
): Node<string> | undefined {
  let currentA = nodeA
  let currentB = nodeB

  while (currentA.next) {
    while (currentB.next) {
      // If the two nodes match then we found a crossing point
      if (currentB.value === currentA.value) {
        return currentA
      }
      currentB = currentB.next
    }

    // Reset nodeB
    currentB = nodeB
    currentA = currentA.next
  }

  return undefined
}

/**
 * Returns the number of orbital transfers required to get from one node to another.
 * The 'to' node must be in the orbital path of the 'from' node.
 */
export function transfersBetween(from: Node<string>, to: Node<string>): number {
  let total = 0
  let current = from
  while (current.next) {
    if (current.value === to.value) {
      return total
    }
    total += 1
    current = current.next
  }
  return total
}

const orbits = toAdjacencyList(
  readInput(path.resolve(__dirname, './input.txt')).split('\n')
)

const you = orbits.find(node => node.value === 'YOU')!
const san = orbits.find(node => node.value === 'SAN')!

const crossingPoint = crossAt(you, san)!

// Total transfers will be the distance between YOU and SAN - 2.
// This is because we only want to count the distance between the
// objects that YOU and SAN are orbiting (-2).
const totalTransfers =
  transfersBetween(you, crossingPoint) +
  transfersBetween(san, crossingPoint) -
  2

console.log('Total transfers: ', totalTransfers)
