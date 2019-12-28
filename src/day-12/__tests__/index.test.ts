import { Moon, Vector3, Simulation } from '..'

describe('Simulation', () => {
  const moons = [
    new Moon(new Vector3(-1, 0, 2)),
    new Moon(new Vector3(2, -10, -7)),
    new Moon(new Vector3(4, -8, 8)),
    new Moon(new Vector3(3, 5, -1))
  ]

  it('steps correctly', () => {
    const sim = new Simulation(moons)
    const expected = [
      [
        Moon.parse('pos=<x=-1, y=  0, z= 2>, vel=<x= 0, y= 0, z= 0>'),
        Moon.parse('pos=<x= 2, y=-10, z=-7>, vel=<x= 0, y= 0, z= 0>'),
        Moon.parse('pos=<x= 4, y= -8, z= 8>, vel=<x= 0, y= 0, z= 0>'),
        Moon.parse('pos=<x= 3, y=  5, z=-1>, vel=<x= 0, y= 0, z= 0>')
      ],
      [
        Moon.parse('pos=<x= 2, y=-1, z= 1>, vel=<x= 3, y=-1, z=-1>'),
        Moon.parse('pos=<x= 3, y=-7, z=-4>, vel=<x= 1, y= 3, z= 3>'),
        Moon.parse('pos=<x= 1, y=-7, z= 5>, vel=<x=-3, y= 1, z=-3>'),
        Moon.parse('pos=<x= 2, y= 2, z= 0>, vel=<x=-1, y=-3, z= 1>')
      ],
      [
        Moon.parse('pos=<x= 5, y=-3, z=-1>, vel=<x= 3, y=-2, z=-2>'),
        Moon.parse('pos=<x= 1, y=-2, z= 2>, vel=<x=-2, y= 5, z= 6>'),
        Moon.parse('pos=<x= 1, y=-4, z=-1>, vel=<x= 0, y= 3, z=-6>'),
        Moon.parse('pos=<x= 1, y=-4, z= 2>, vel=<x=-1, y=-6, z= 2>')
      ],
      [
        Moon.parse('pos=<x= 5, y=-6, z=-1>, vel=<x= 0, y=-3, z= 0>'),
        Moon.parse('pos=<x= 0, y= 0, z= 6>, vel=<x=-1, y= 2, z= 4>'),
        Moon.parse('pos=<x= 2, y= 1, z=-5>, vel=<x= 1, y= 5, z=-4>'),
        Moon.parse('pos=<x= 1, y=-8, z= 2>, vel=<x= 0, y=-4, z= 0>')
      ],
      [
        Moon.parse('pos=<x= 2, y=-8, z= 0>, vel=<x=-3, y=-2, z= 1>'),
        Moon.parse('pos=<x= 2, y= 1, z= 7>, vel=<x= 2, y= 1, z= 1>'),
        Moon.parse('pos=<x= 2, y= 3, z=-6>, vel=<x= 0, y= 2, z=-1>'),
        Moon.parse('pos=<x= 2, y=-9, z= 1>, vel=<x= 1, y=-1, z=-1>')
      ],
      [
        Moon.parse('pos=<x=-1, y=-9, z= 2>, vel=<x=-3, y=-1, z= 2>'),
        Moon.parse('pos=<x= 4, y= 1, z= 5>, vel=<x= 2, y= 0, z=-2>'),
        Moon.parse('pos=<x= 2, y= 2, z=-4>, vel=<x= 0, y=-1, z= 2>'),
        Moon.parse('pos=<x= 3, y=-7, z=-1>, vel=<x= 1, y= 2, z=-2>')
      ],
      [
        Moon.parse('pos=<x=-1, y=-7, z= 3>, vel=<x= 0, y= 2, z= 1>'),
        Moon.parse('pos=<x= 3, y= 0, z= 0>, vel=<x=-1, y=-1, z=-5>'),
        Moon.parse('pos=<x= 3, y=-2, z= 1>, vel=<x= 1, y=-4, z= 5>'),
        Moon.parse('pos=<x= 3, y=-4, z=-2>, vel=<x= 0, y= 3, z=-1>')
      ],
      [
        Moon.parse('pos=<x= 2, y=-2, z= 1>, vel=<x= 3, y= 5, z=-2>'),
        Moon.parse('pos=<x= 1, y=-4, z=-4>, vel=<x=-2, y=-4, z=-4>'),
        Moon.parse('pos=<x= 3, y=-7, z= 5>, vel=<x= 0, y=-5, z= 4>'),
        Moon.parse('pos=<x= 2, y= 0, z= 0>, vel=<x=-1, y= 4, z= 2>')
      ],
      [
        Moon.parse('pos=<x= 5, y= 2, z=-2>, vel=<x= 3, y= 4, z=-3>'),
        Moon.parse('pos=<x= 2, y=-7, z=-5>, vel=<x= 1, y=-3, z=-1>'),
        Moon.parse('pos=<x= 0, y=-9, z= 6>, vel=<x=-3, y=-2, z= 1>'),
        Moon.parse('pos=<x= 1, y= 1, z= 3>, vel=<x=-1, y= 1, z= 3>')
      ],
      [
        Moon.parse('pos=<x= 5, y= 3, z=-4>, vel=<x= 0, y= 1, z=-2>'),
        Moon.parse('pos=<x= 2, y=-9, z=-3>, vel=<x= 0, y=-2, z= 2>'),
        Moon.parse('pos=<x= 0, y=-8, z= 4>, vel=<x= 0, y= 1, z=-2>'),
        Moon.parse('pos=<x= 1, y= 1, z= 5>, vel=<x= 0, y= 0, z= 2>')
      ],
      [
        Moon.parse('pos=<x= 2, y= 1, z=-3>, vel=<x=-3, y=-2, z= 1>'),
        Moon.parse('pos=<x= 1, y=-8, z= 0>, vel=<x=-1, y= 1, z= 3>'),
        Moon.parse('pos=<x= 3, y=-6, z= 1>, vel=<x= 3, y= 2, z=-3>'),
        Moon.parse('pos=<x= 2, y= 0, z= 4>, vel=<x= 1, y=-1, z=-1>')
      ]
    ]

    for (let i = 0; i < expected.length; i++) {
      expect(sim.moons).toEqual(expected[i])
      sim.step()
    }
  })

  it('calculates total energy', () => {
    const sim = new Simulation(moons)

    for (let i = 0; i < 10; i++) {
      sim.step()
    }

    expect(sim.totalEnergy).toEqual(179)
  })
})
