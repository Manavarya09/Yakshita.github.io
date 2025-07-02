import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Cylinder, Sphere, Box } from '@react-three/drei'

const FloatingObjects = () => {
  const spoonRef = useRef()
  const testTubeRef = useRef()
  const whiskRef = useRef()
  const bowlRef = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (spoonRef.current) {
      spoonRef.current.rotation.x = Math.sin(time * 0.5) * 0.2
      spoonRef.current.rotation.z = time * 0.3
      spoonRef.current.position.y = Math.sin(time * 0.8) * 0.5
    }
    
    if (testTubeRef.current) {
      testTubeRef.current.rotation.y = time * 0.4
      testTubeRef.current.position.x = Math.sin(time * 0.6) * 0.3
    }
    
    if (whiskRef.current) {
      whiskRef.current.rotation.x = time * 0.7
      whiskRef.current.position.z = Math.sin(time * 0.9) * 0.4
    }
    
    if (bowlRef.current) {
      bowlRef.current.rotation.y = time * 0.2
      bowlRef.current.position.y = Math.sin(time * 0.5) * 0.3
    }
  })

  return (
    <group>
      {/* Spoon */}
      <group ref={spoonRef} position={[3, 2, 0]}>
        <Cylinder args={[0.05, 0.05, 2, 8]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#F0FFF0" metalness={0.8} roughness={0.2} />
        </Cylinder>
        <Sphere args={[0.15, 8, 8]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#F0FFF0" metalness={0.8} roughness={0.2} />
        </Sphere>
      </group>

      {/* Test Tube */}
      <group ref={testTubeRef} position={[-3, 1, 2]}>
        <Cylinder args={[0.1, 0.1, 1.5, 8]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#E0F6FF" transparent opacity={0.7} />
        </Cylinder>
        <Sphere args={[0.1, 8, 8]} position={[0, -0.75, 0]}>
          <meshStandardMaterial color="#E0F6FF" transparent opacity={0.7} />
        </Sphere>
      </group>

      {/* Whisk */}
      <group ref={whiskRef} position={[2, -1, 3]}>
        <Cylinder args={[0.02, 0.02, 1.2, 8]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#FFE4E1" metalness={0.6} roughness={0.3} />
        </Cylinder>
        {[...Array(8)].map((_, i) => (
          <Cylinder
            key={i}
            args={[0.01, 0.01, 0.3, 4]}
            position={[
              Math.cos((i * Math.PI * 2) / 8) * 0.1,
              0.2,
              Math.sin((i * Math.PI * 2) / 8) * 0.1
            ]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <meshStandardMaterial color="#FFE4E1" metalness={0.6} roughness={0.3} />
          </Cylinder>
        ))}
      </group>

      {/* Bowl */}
      <group ref={bowlRef} position={[-2, -2, -2]}>
        <Cylinder args={[0.8, 0.6, 0.4, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#FFE5D9" metalness={0.3} roughness={0.7} />
        </Cylinder>
      </group>
    </group>
  )
}

export default FloatingObjects 