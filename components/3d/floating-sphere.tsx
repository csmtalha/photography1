'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, PerspectiveCamera, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function SphereContent() {
  const sphereRef = useRef<THREE.Mesh>(null)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const { camera } = useThree()
  
  // Load the texture
  const texture = useTexture('/hero_round.jpg')

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth) * 2 - 1)
      setMouseY(-(e.clientY / window.innerHeight) * 2 + 1)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x += 0.001
      sphereRef.current.rotation.y += 0.002
      
      // Subtle mouse tracking parallax
      camera.position.x = mouseX * 0.5
      camera.position.y = mouseY * 0.5
      camera.lookAt(0, 0, 0)
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3]} />
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#ffffff" />
      
      <Sphere ref={sphereRef} args={[1.5, 64, 64]}>
        <meshStandardMaterial
          map={texture}
          metalness={0.2}
          roughness={0.3}
        />
      </Sphere>
    </>
  )
}

export function FloatingSphere() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(hover: none)').matches)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return null // Disable 3D on mobile for performance
  }

  return (
    <div className="w-full h-96">
      <Canvas>
        <SphereContent />
      </Canvas>
    </div>
  )
}
