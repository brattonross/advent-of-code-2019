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

const orbits = toAdjacencyList(
  readInput(path.resolve(__dirname, './input.txt')).split('\n')
)

console.log('Total Orbits: ', totalOrbits(orbits))
