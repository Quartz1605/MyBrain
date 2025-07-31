import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Model } from '@/Energybrian.jsx'

export default function BrainViewer() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Suspense fallback={null}>
        <Model scale={1.5} />
        <OrbitControls />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  )
}