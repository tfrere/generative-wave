import React from 'react'
import { Edges } from '@react-three/drei'
import { useSprings, animated } from '@react-spring/three'

import mapRange from '../utils/mapRange'

import { createNoise3D } from 'simplex-noise'
import useInterval from '../utils/useInterval'

let time = 0

export default function City(props) {
  const array = Array.from(Array(props.number).keys())
  const noise3D = createNoise3D()

  // import the noise functions you need
  //console.log(mapRange(noise2D(10, 10), 0, 1, 0, props.maxSize))
  const random = (i) => {
    const x = (i % props.number) / 5
    const y = Math.floor(i / props.number) / 5

    const value = mapRange(noise3D(x, y, time / 12), -1, 1, 0, props.maxSize)

    return {
      scale: [1, value, 1]
    }
  }

  const [springs, set] = useSprings(
    props.number * props.number,
    (i) => ({
      from: random(i),
      time: 0,
      config: { loop: true } // , ...config.wobbly
    }),
    []
  )

  useInterval(() => {
    set((i) => ({ ...random(i) }))
    time++
  }, 100)

  // scale={[0.5, 0.5, 0.5]}
  return (
    <group position={props.position}>
      {array.map((spring, x) => {
        return array.map((spring, y) => {
          const index = x + y * props.number
          return (
            <animated.group key={index} {...springs[index]}>
              <animated.mesh scale={[props.gap, props.maxSize, props.gap]} position={[y * props.gap, props.maxSize / 2, x * props.gap]}>
                <boxGeometry args={[0.4, 1, 0.4]} />
                <meshBasicMaterial transparent opacity={0} />
                <Edges>
                  <lineBasicMaterial color={'red'} toneMapped={false} />
                </Edges>
              </animated.mesh>
            </animated.group>
          )
        })
      })}
    </group>
  )
}
