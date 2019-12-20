import {
  Node,
  toAdjacencyList,
  totalOrbits,
  crossAt,
  transfersBetween
} from '..'

const relationships = [
  'COM)B',
  'B)C',
  'C)D',
  'D)E',
  'E)F',
  'B)G',
  'G)H',
  'D)I',
  'E)J',
  'J)K',
  'K)L',
  'K)YOU',
  'I)SAN'
]

const COM = { value: 'COM' }
const B = { value: 'B', next: COM }
const C = { value: 'C', next: B }
const D = { value: 'D', next: C }
const E = { value: 'E', next: D }
const F = { value: 'F', next: E }
const G = { value: 'G', next: B }
const H = { value: 'H', next: G }
const I = { value: 'I', next: D }
const J = { value: 'J', next: E }
const K = { value: 'K', next: J }
const L = { value: 'L', next: K }
const YOU = { value: 'YOU', next: K }
const SAN = { value: 'SAN', next: I }

const AdjacencyList = [COM, B, C, D, E, F, G, H, I, J, K, L, YOU, SAN]

test('toAdjacencyList', () => {
  const expected: Node<string>[] = AdjacencyList

  const actual = toAdjacencyList(relationships)

  expect(actual).toEqual(expected)
})

test('totalOrbits', () => {
  const expected = 54

  const actual = totalOrbits(AdjacencyList)

  expect(actual).toEqual(expected)
})

test('crossAt', () => {
  const expected = D

  const actual = crossAt(YOU, SAN)

  expect(actual).toEqual(expected)
})

test('transfersBetween', () => {
  const cases = [
    { expected: 4, from: YOU, to: D },
    { expected: 2, from: SAN, to: D }
  ]

  for (const tc of cases) {
    const actual = transfersBetween(tc.from, tc.to)

    expect(actual).toEqual(tc.expected)
  }
})
