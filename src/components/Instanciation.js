import * as THREE from 'three'
import React from 'react'
import { useRef, useMemo, useLayoutEffect } from 'react'
import niceColors from 'nice-color-palettes'

import { useSprings } from '@react-spring/three'

import mapRange from '../utils/mapRange'

import { createNoise3D } from 'simplex-noise'
import useInterval from '../utils/useInterval'

let time = 0
const o = new THREE.Object3D()
const c = new THREE.Color()

export default function Instanciation({ number = 1000, size = [0.15, 0.15, 0.15], maxSize=10, ...props }) {

  const ref = useRef()
  const colors = useMemo(() => new Float32Array(Array.from({ number }, () => c.set(niceColors[0][Math.floor(Math.random() * 5)]).toArray()).flat()), [number])

  const array = Array.from(Array(number).keys())
  const noise3D = createNoise3D()
  // import the noise functions you need
  const random = (i) => {
    const x = (i % number) / 5
    const y = Math.floor(i / number) / 5

    const value = mapRange(noise3D(x, y, time / 12), -1, 1, 0, maxSize)

    return {
      scale: [1, value, 1]
    }
  }

  const randomBetweenIntergers = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [springs, set] = useSprings(
    number * number,
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


  useLayoutEffect(() => {
    let i = 0
    const root = Math.round(Math.pow(number, 1 / 3))
    const halfRoot = root / 2
    for (let x = 0; x < root; x++)
      for (let y = 0; y < root; y++)
        for (let z = 0; z < root; z++) {
          const id = i++
          // o.rotation.set(Math.random(), Math.random(), Math.random())
          o.position.set(halfRoot - x + Math.random(), 0, halfRoot - z + Math.random())
          o.updateMatrix()
          ref.current.setMatrixAt(id, o.matrix)
        }
    ref.current.instanceMatrix.needsUpdate = true
    // Re-use geometry + instance matrix
    // outlines.current.geometry = ref.current.geometry
  //  outlines.current.instanceMatrix = ref.current.instanceMatrix
  }, [number])
  return (
    <group {...props}>
      <instancedMesh ref={ref} args={[null, null, number]}>
        <boxGeometry args={size}>
          <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
        </boxGeometry>
        <meshLambertMaterial vertexColors toneMapped={false} />
      </instancedMesh>
      {/* <instancedMesh ref={outlines} args={[null, null, number]}>
        <meshEdgesMaterial transparent polygonOffset polygonOffsetFactor={-10} size={size} color="black" thickness={0.001} smoothness={0.005} />
      </instancedMesh> */}
    </group>
  )
}
