import { useState } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { SpotLight, OrbitControls } from '@react-three/drei'

import Instanciation from '../components/Instanciation'
import { DashedCircle } from '../components/Lines'
import TexturedPlane from '../components/TexturedPlane'
import bottomUrl from '../public/bottom.png'

const WorkScene = (props) => {
  const { camera, renderer, mouse } = useThree()
  const [x, setX] = useState(0)

  return (
    <>
      <OrbitControls />
      {false ? (
        <>
          <mesh receiveShadow scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="grey" />
          </mesh>
          <mesh receiveShadow scale={[0.5, 0.5, 0.5]} position={[-3, 0, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="grey" />
          </mesh>

          <TexturedPlane imageUrl={bottomUrl} opacity={0.3} scale={[6, 6, 6]} rotation={[Math.PI / 2, 0, 0]} position={[0, -1, 0]} />
        <DashedCircle items={64} rotation={[0, Math.PI / 8, 0]} dashLength={10} speed={1} color={'red'} position={[0, -1, 0]} radius={2.35} />
        </>
      ) : null}
      <>
      <SpotLight
            castShadow
            distance={20}
            intensity={0.1}
            angle={THREE.MathUtils.degToRad(45)}
            color={'#fadcb9'}
            position={[0, 5, 0]}
            volumetric={true}
            debug={true}
          />
        <Instanciation number={10} position={[-1, -1, -1]} />
      </>
    </>
  )
}

export default WorkScene
