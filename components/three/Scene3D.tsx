'use client'

import { useRef, Suspense, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, useProgress, Html } from '@react-three/drei'
import * as THREE from 'three'

// Loading component
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-white font-mono text-sm">
        {progress.toFixed(0)}%
      </div>
    </Html>
  )
}

// Glowing ring geometry - simplified for mobile
function GlowRing({
  radius = 2,
  tube = 0.02,
  color = '#ffffff',
  emissive = '#E85A3F',
  rotationSpeed = 0.5,
  floatIntensity = 0.5,
  isMobile = false
}: {
  radius?: number
  tube?: number
  color?: string
  emissive?: string
  rotationSpeed?: number
  floatIntensity?: number
  isMobile?: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Reduced segments for mobile
  const segments = isMobile ? 32 : 64
  const radialSegments = isMobile ? 64 : 128

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={floatIntensity}>
      <mesh ref={meshRef}>
        <torusGeometry args={[radius, tube, segments, radialSegments]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={isMobile ? 1 : 2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  )
}

// Glowing sphere with backlight effect
function BacklitSphere({ scrollProgress = 0, isMobile = false }: { scrollProgress?: number; isMobile?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  // Reduced segments for mobile
  const sphereSegments = isMobile ? 32 : 64

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      const scale = 1 + scrollProgress * 0.5
      meshRef.current.scale.setScalar(scale)
    }

    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      glowRef.current.scale.setScalar(1.2 * pulse)
    }
  })

  return (
    <group position={[viewport.width * 0.15, 0, 0]}>
      {/* Backlight glow */}
      <mesh ref={glowRef} position={[0, 0, -1]}>
        <sphereGeometry args={[1.5, sphereSegments, sphereSegments]} />
        <meshBasicMaterial
          color="#E85A3F"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, sphereSegments, sphereSegments]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={1}
        />
      </mesh>

      {/* Rim light effect - reduced intensity on mobile */}
      <pointLight position={[0, 0, -2]} intensity={isMobile ? 3 : 5} color="#E85A3F" distance={10} />
      {!isMobile && <pointLight position={[2, 2, -1]} intensity={2} color="#ffffff" distance={8} />}
    </group>
  )
}

// Floating particles - fewer on mobile
function Particles({ count = 100, isMobile = false }: { count?: number; isMobile?: boolean }) {
  const points = useRef<THREE.Points>(null)
  const geometryRef = useRef<THREE.BufferGeometry>(null)

  // Reduce particle count on mobile
  const actualCount = isMobile ? Math.floor(count / 3) : count

  useEffect(() => {
    if (geometryRef.current) {
      const positions = new Float32Array(actualCount * 3)
      for (let i = 0; i < actualCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      }
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    }
  }, [actualCount])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02
      points.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={isMobile ? 0.03 : 0.02}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

// Main scene component
function SceneContent({ scrollProgress, isMobile }: { scrollProgress: number; isMobile: boolean }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      <BacklitSphere scrollProgress={scrollProgress} isMobile={isMobile} />

      {/* Fewer rings on mobile */}
      <GlowRing radius={2.5} rotationSpeed={0.3} floatIntensity={0.3} isMobile={isMobile} />
      {!isMobile && (
        <>
          <GlowRing radius={3} rotationSpeed={-0.2} floatIntensity={0.2} emissive="#8b5cf6" isMobile={isMobile} />
          <GlowRing radius={3.5} tube={0.01} rotationSpeed={0.15} floatIntensity={0.4} emissive="#06ffa5" isMobile={isMobile} />
        </>
      )}

      <Particles count={150} isMobile={isMobile} />

      <Environment preset="night" />
    </>
  )
}

// Exported Scene3D component
export default function Scene3D() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    // Check if mobile/low-power device
    const checkDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches

      // Check for low memory (if available)
      const isLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4

      setIsMobile(hasTouch || isSmallScreen || hasCoarsePointer)

      // Don't render 3D on very low-end devices
      if (isLowMemory && isSmallScreen) {
        setShouldRender(false)
      }
    }

    checkDevice()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const progress = Math.min(scrollY / windowHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Don't render 3D on very low-end devices
  if (!shouldRender) {
    return (
      <div className="absolute inset-0 z-0 bg-black">
        {/* Fallback gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 70% 50%, rgba(232, 90, 63, 0.15) 0%, transparent 50%)',
          }}
        />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower DPR on mobile
        gl={{
          antialias: !isMobile, // Disable antialiasing on mobile
          alpha: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
          failIfMajorPerformanceCaveat: true, // Don't render if GPU is too slow
        }}
        frameloop={isMobile ? 'demand' : 'always'} // Only render on demand for mobile
        performance={{ min: 0.5 }} // Allow frame rate to drop to save resources
      >
        <Suspense fallback={<Loader />}>
          <SceneContent scrollProgress={scrollProgress} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  )
}
