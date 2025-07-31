import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Stars, useProgress, Html } from '@react-three/drei'
import { Model } from '@/Energybrian.jsx'
import * as THREE from 'three'

// Loading component
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
        <div className="text-purple-600 font-semibold">{progress.toFixed(0)}% loaded</div>
      </div>
    </Html>
  )
}

// Floating particles component
function FloatingParticles() {
  const points = useRef()
  const particleCount = 100
  
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    
    // Purple to pink gradient colors
    colors[i * 3] = 0.7 + Math.random() * 0.3
    colors[i * 3 + 1] = 0.3 + Math.random() * 0.4
    colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
  }
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05
      points.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.6} />
    </points>
  )
}

// Enhanced brain model wrapper with animations
function EnhancedBrainModel() {
  const modelRef = useRef()
  
  useFrame((state) => {
    if (modelRef.current) {
      // Keep model centered and add gentle floating animation
      modelRef.current.position.x = 0
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      modelRef.current.position.z = 0
      modelRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })
  
  return (
    <Float
      speed={1}
      rotationIntensity={0.1}
      floatIntensity={0.2}
    >
      <group ref={modelRef} position={[0, 0, 0]}>
        <Model scale={0.4} />
      </group>
    </Float>
  )
}

export default function StyledBrainViewer() {
  return (
    <div className="w-full h-full relative">
      <Canvas 
        camera={{ 
          position: [0, 0, 6], 
          fov: 45,
          near: 0.1,
          far: 1000
        }} 
        style={{ 
          background: 'transparent'
        }}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} color="#f3e8ff" />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.5} 
          color="#ffffff"
          castShadow 
          shadow-mapSize-width={2048} 
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#e879f9" />
        <pointLight position={[5, -5, 5]} intensity={0.6} color="#c084fc" />
        
        {/* Stars background */}
        <Stars 
          radius={100} 
          depth={50} 
          count={1000} 
          factor={4} 
          saturation={0.5} 
          fade 
          speed={0.5}
        />
        
        <Suspense fallback={<Loader />}>
          {/* Floating particles */}
          <FloatingParticles />
          
          {/* Enhanced brain model */}
          <EnhancedBrainModel />
          
          {/* Environment lighting */}
          <Environment 
            preset="sunset" 
            background={false}
            intensity={0.6}
          />
          
          {/* Controls */}
          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            maxDistance={12} 
            minDistance={4}
            autoRotate={true}
            autoRotateSpeed={0.3}
            enableDamping={true}
            dampingFactor={0.05}
            maxPolarAngle={Math.PI * 0.75}
            minPolarAngle={Math.PI * 0.25}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 animate-gradient-x" />
    </div>
  )
}