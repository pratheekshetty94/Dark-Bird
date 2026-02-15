'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// Custom 3D Scene - Dark Bird branded neural network / AI orb (Background only)
function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRotation = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene setup
    const scene = new THREE.Scene()

    // Camera - positioned to see the orb on the right side
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(2, 0, 5)

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Brand colors
    const accentColor = new THREE.Color(0xE85A3F) // Dark Bird accent orange
    const goldColor = new THREE.Color(0xFFC430)   // Gold
    const creamColor = new THREE.Color(0xFAF6EF)  // Cream

    // ===== MAIN TORUS KNOT - Central glowing element =====
    const torusKnotGeometry = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32, 2, 3)
    const torusKnotMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: accentColor },
        uColor2: { value: goldColor },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        uniform float uTime;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vUv = uv;

          // Subtle morphing
          vec3 pos = position;
          float wave = sin(pos.x * 4.0 + uTime) * 0.02 +
                       sin(pos.y * 3.0 + uTime * 1.3) * 0.02 +
                       sin(pos.z * 5.0 + uTime * 0.7) * 0.02;
          pos += normal * wave;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;

        void main() {
          // Fresnel for edge glow
          vec3 viewDir = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);

          // Flowing color gradient
          float colorMix = sin(vPosition.y * 2.0 + vPosition.x + uTime * 0.5) * 0.5 + 0.5;
          vec3 baseColor = mix(uColor1, uColor2, colorMix);

          // Add fresnel glow
          vec3 finalColor = mix(baseColor, vec3(1.0), fresnel * 0.5);

          float alpha = 0.3 + fresnel * 0.6;
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })

    const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
    torusKnot.position.set(1.5, 0, 0) // Position on the right
    scene.add(torusKnot)

    // ===== WIREFRAME OVERLAY =====
    const wireframeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: accentColor },
      },
      vertexShader: `
        varying vec3 vPosition;
        uniform float uTime;

        void main() {
          vPosition = position;
          vec3 pos = position;
          float wave = sin(pos.x * 4.0 + uTime) * 0.02 +
                       sin(pos.y * 3.0 + uTime * 1.3) * 0.02 +
                       sin(pos.z * 5.0 + uTime * 0.7) * 0.02;
          pos += normal * wave;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;

        void main() {
          float pulse = sin(uTime * 2.0) * 0.15 + 0.85;
          gl_FragColor = vec4(uColor * pulse, 0.25);
        }
      `,
      transparent: true,
      wireframe: true,
    })

    const wireframe = new THREE.Mesh(torusKnotGeometry.clone(), wireframeMaterial)
    wireframe.position.copy(torusKnot.position)
    wireframe.scale.setScalar(1.02)
    scene.add(wireframe)

    // ===== OUTER GLOW SPHERE =====
    const glowGeometry = new THREE.SphereGeometry(2.2, 32, 32)
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: accentColor },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;
        uniform vec3 uColor;

        void main() {
          vec3 viewDir = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 5.0);
          float pulse = sin(uTime * 1.5) * 0.15 + 0.85;
          gl_FragColor = vec4(uColor, fresnel * 0.12 * pulse);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })

    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial)
    glowSphere.position.copy(torusKnot.position)
    scene.add(glowSphere)

    // ===== INNER CORE - Pulsing energy core =====
    const coreGeometry = new THREE.IcosahedronGeometry(0.25, 2)
    const coreMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: goldColor },
      },
      vertexShader: `
        uniform float uTime;

        void main() {
          vec3 pos = position;
          pos *= 1.0 + sin(uTime * 4.0) * 0.15;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;

        void main() {
          float pulse = sin(uTime * 4.0) * 0.3 + 0.7;
          gl_FragColor = vec4(uColor * (1.2 + pulse * 0.5), 0.95);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    core.position.copy(torusKnot.position)
    scene.add(core)

    // ===== ORBITING PARTICLES =====
    const particleCount = 150
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    const colorPalette = [accentColor, goldColor, creamColor]

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      const radius = 2.0 + Math.random() * 1.5

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta) + 1.5
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      sizes[i] = Math.random() * 4 + 1

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;

        void main() {
          vColor = color;
          vec3 pos = position;

          float centerX = 1.5;
          float angle = uTime * 0.15 + pos.x * 0.3;
          float distFromCenter = length(vec2(pos.x - centerX, pos.z));
          pos.x = centerX + cos(angle) * distFromCenter;
          pos.z = sin(angle) * distFromCenter;
          pos.y += sin(uTime * 0.4 + pos.y * 2.0) * 0.15;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (250.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
          gl_FragColor = vec4(vColor, alpha * 0.85);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // ===== CONNECTING LINES =====
    const lineCount = 30
    const lineGeometry = new THREE.BufferGeometry()
    const linePositions = new Float32Array(lineCount * 6)

    for (let i = 0; i < lineCount; i++) {
      const theta1 = Math.random() * Math.PI * 2
      const phi1 = Math.acos((Math.random() * 2) - 1)
      const r1 = 1.8 + Math.random() * 0.5

      const theta2 = theta1 + (Math.random() - 0.5) * 1.5
      const phi2 = phi1 + (Math.random() - 0.5) * 1.0
      const r2 = 1.8 + Math.random() * 0.5

      linePositions[i * 6] = r1 * Math.sin(phi1) * Math.cos(theta1) + 1.5
      linePositions[i * 6 + 1] = r1 * Math.sin(phi1) * Math.sin(theta1)
      linePositions[i * 6 + 2] = r1 * Math.cos(phi1)

      linePositions[i * 6 + 3] = r2 * Math.sin(phi2) * Math.cos(theta2) + 1.5
      linePositions[i * 6 + 4] = r2 * Math.sin(phi2) * Math.sin(theta2)
      linePositions[i * 6 + 5] = r2 * Math.cos(phi2)
    }

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const lineMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: accentColor },
      },
      vertexShader: `
        uniform float uTime;

        void main() {
          vec3 pos = position;
          float centerX = 1.5;
          float angle = uTime * 0.1;
          float distFromCenter = length(vec2(pos.x - centerX, pos.z));
          pos.x = centerX + cos(angle + pos.y) * distFromCenter;
          pos.z = sin(angle + pos.y) * distFromCenter;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;

        void main() {
          float pulse = sin(uTime * 3.0) * 0.3 + 0.7;
          gl_FragColor = vec4(uColor, 0.15 * pulse);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // ===== FLOATING RINGS =====
    const ringGeometry = new THREE.TorusGeometry(2.5, 0.02, 16, 100)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.2,
    })

    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial)
    ring1.position.set(1.5, 0, 0)
    ring1.rotation.x = Math.PI / 2
    scene.add(ring1)

    const ring2 = new THREE.Mesh(ringGeometry.clone(), ringMaterial.clone())
    ring2.position.set(1.5, 0, 0)
    ring2.rotation.x = Math.PI / 3
    ring2.rotation.y = Math.PI / 4
    scene.add(ring2)

    // Mouse handler
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: ((event.clientX - rect.left) / width) * 2 - 1,
        y: -((event.clientY - rect.top) / height) * 2 + 1,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation loop
    const clock = new THREE.Clock()
    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      torusKnotMaterial.uniforms.uTime.value = time
      wireframeMaterial.uniforms.uTime.value = time
      glowMaterial.uniforms.uTime.value = time
      coreMaterial.uniforms.uTime.value = time
      particleMaterial.uniforms.uTime.value = time
      lineMaterial.uniforms.uTime.value = time

      targetRotation.current.x += (mouseRef.current.y * 0.3 - targetRotation.current.x) * 0.05
      targetRotation.current.y += (mouseRef.current.x * 0.3 - targetRotation.current.y) * 0.05

      torusKnot.rotation.x = targetRotation.current.x + time * 0.1
      torusKnot.rotation.y = targetRotation.current.y + time * 0.15
      torusKnot.rotation.z = time * 0.05

      wireframe.rotation.copy(torusKnot.rotation)
      glowSphere.rotation.y = time * 0.05

      core.rotation.x = time * 0.8
      core.rotation.y = time * 0.6

      ring1.rotation.z = time * 0.1
      ring2.rotation.z = -time * 0.08

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      torusKnotGeometry.dispose()
      torusKnotMaterial.dispose()
      wireframeMaterial.dispose()
      glowMaterial.dispose()
      coreMaterial.dispose()
      particleMaterial.dispose()
      lineMaterial.dispose()
      ringMaterial.dispose()
      particleGeometry.dispose()
      lineGeometry.dispose()
      glowGeometry.dispose()
      coreGeometry.dispose()
      ringGeometry.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
    />
  )
}

// Export as background-only component (no text overlay)
export default function LabsHero() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full">
      {isMounted && <ThreeScene />}
    </div>
  )
}
