import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'

const AnimatedBlob = ({ position = [0, 0, 0], scale = 1, morphTarget = 0 }) => {
  const meshRef = useRef()
  const [geometry, setGeometry] = useState(null)

  useEffect(() => {
    // Create blob geometry with multiple morph targets
    const geo = new THREE.SphereGeometry(1, 64, 64)
    
    // Add morph targets for different food shapes
    const pizzaShape = new Float32Array(geo.attributes.position.count * 3)
    const ramenShape = new Float32Array(geo.attributes.position.count * 3)
    const cupcakeShape = new Float32Array(geo.attributes.position.count * 3)
    
    for (let i = 0; i < geo.attributes.position.count; i++) {
      const x = geo.attributes.position.getX(i)
      const y = geo.attributes.position.getY(i)
      const z = geo.attributes.position.getZ(i)
      
      // Pizza shape (flattened)
      pizzaShape[i * 3] = x * 1.5
      pizzaShape[i * 3 + 1] = y * 0.3
      pizzaShape[i * 3 + 2] = z * 1.5
      
      // Ramen shape (wavy)
      ramenShape[i * 3] = x + Math.sin(y * 3) * 0.2
      ramenShape[i * 3 + 1] = y + Math.sin(x * 2) * 0.1
      ramenShape[i * 3 + 2] = z + Math.cos(x * 2) * 0.2
      
      // Cupcake shape (conical)
      cupcakeShape[i * 3] = x * (1 + y * 0.5)
      cupcakeShape[i * 3 + 1] = y * 1.2
      cupcakeShape[i * 3 + 2] = z * (1 + y * 0.5)
    }
    
    geo.morphAttributes.position = [
      new THREE.BufferAttribute(pizzaShape, 3),
      new THREE.BufferAttribute(ramenShape, 3),
      new THREE.BufferAttribute(cupcakeShape, 3)
    ]
    
    setGeometry(geo)
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      
      // Animate morph targets
      if (meshRef.current.morphTargetInfluences) {
        meshRef.current.morphTargetInfluences[0] = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
        meshRef.current.morphTargetInfluences[1] = Math.sin(state.clock.elapsedTime * 0.7) * 0.2
        meshRef.current.morphTargetInfluences[2] = Math.sin(state.clock.elapsedTime * 0.3) * 0.4
      }
    }
  })

  const { morphTargetInfluences } = useSpring({
    morphTargetInfluences: [0, 0, 0],
    config: { mass: 1, tension: 280, friction: 120 }
  })

  if (!geometry) return null

  return (
    <animated.mesh
      ref={meshRef}
      position={position}
      scale={scale}
      geometry={geometry}
    >
      <meshStandardMaterial
        color="#E6E6FA"
        transparent
        opacity={0.8}
        metalness={0.1}
        roughness={0.2}
        emissive="#E6E6FA"
        emissiveIntensity={0.2}
      />
    </animated.mesh>
  )
}

export default AnimatedBlob 