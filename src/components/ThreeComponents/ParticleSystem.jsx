import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ParticleSystem = ({ count = 1000, size = 0.02 }) => {
  const mesh = useRef()
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [count])

  const colors = useMemo(() => {
    const colors = new Float32Array(count * 3)
    const pastelColors = [
      [0.9, 0.9, 0.98], // lavender
      [0.94, 1.0, 0.94], // mint
      [1.0, 0.89, 0.88], // pink
      [0.88, 0.96, 1.0], // blue
      [1.0, 0.9, 0.85], // peach
    ]
    
    for (let i = 0; i < count; i++) {
      const color = pastelColors[Math.floor(Math.random() * pastelColors.length)]
      colors[i * 3] = color[0]
      colors[i * 3 + 1] = color[1]
      colors[i * 3 + 2] = color[2]
    }
    return colors
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.elapsedTime
      const positions = mesh.current.geometry.attributes.position.array
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        positions[i3] += Math.sin(time + i) * 0.001
        positions[i3 + 1] += Math.cos(time + i) * 0.001
        positions[i3 + 2] += Math.sin(time * 0.5 + i) * 0.001
      }
      
      mesh.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default ParticleSystem 