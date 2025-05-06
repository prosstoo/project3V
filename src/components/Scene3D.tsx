import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'

const Cube = () => {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  )
}

const Scene3D = () => {
  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Cube />
      <OrbitControls />
    </Canvas>
  )
}

export default Scene3D