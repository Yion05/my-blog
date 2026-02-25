import { useRef, useMemo, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

/* ═══════════════════════════════════════════
   STARFIELD
   Dense, slowly rotating star cloud
   ═══════════════════════════════════════════ */
function Starfield() {
    const ref = useRef()
    const positions = useMemo(() => {
        const arr = new Float32Array(8000 * 3)
        for (let i = 0; i < 8000 * 3; i++) {
            arr[i] = (Math.random() - 0.5) * 600
        }
        return arr
    }, [])

    const sizes = useMemo(() => {
        const arr = new Float32Array(8000)
        for (let i = 0; i < 8000; i++) {
            arr[i] = Math.random() * 1.5 + 0.3
        }
        return arr
    }, [])

    useFrame(({ clock }) => {
        ref.current.rotation.y -= 0.00012
        ref.current.rotation.x += 0.00004
    })

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" array={positions} count={8000} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial color="#ccccdd" size={0.6} transparent opacity={0.8} sizeAttenuation />
        </points>
    )
}

/* ═══════════════════════════════════════════
   TWINKLING STARS
   A second layer of bright stars that twinkle
   ═══════════════════════════════════════════ */
function TwinklingStars() {
    const ref = useRef()
    const count = 400

    const { positions, baseOpacities } = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const baseOpacities = new Float32Array(count)
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 500
            positions[i * 3 + 1] = (Math.random() - 0.5) * 500
            positions[i * 3 + 2] = (Math.random() - 0.5) * 500
            baseOpacities[i] = Math.random()
        }
        return { positions, baseOpacities }
    }, [])

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        const mat = ref.current.material
        mat.opacity = 0.5 + Math.sin(t * 1.5) * 0.3
        ref.current.rotation.y += 0.00005
    })

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial color="#ffffff" size={1.5} transparent opacity={0.8} sizeAttenuation />
        </points>
    )
}

/* ═══════════════════════════════════════════
   MOON
   Large textured moon with surface displacement
   ═══════════════════════════════════════════ */
function Moon() {
    const meshRef = useRef()
    const [moonTexture, displacementTexture] = useLoader(THREE.TextureLoader, [
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/ldem_3_8bit.jpg',
    ])

    useFrame(() => {
        meshRef.current.rotation.y += 0.0004
        meshRef.current.rotation.x += 0.00008
    })

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <sphereGeometry args={[8, 64, 64]} />
            <meshPhongMaterial
                map={moonTexture}
                displacementMap={displacementTexture}
                displacementScale={0.1}
                color="#ffffff"
                shininess={5}
            />
        </mesh>
    )
}

/* ═══════════════════════════════════════════
   NEBULA CLOUDS
   Colorful translucent spheres simulating nebulae
   ═══════════════════════════════════════════ */
function NebulaClouds() {
    const groupRef = useRef()

    const nebulae = useMemo(() => {
        return [
            { pos: [-60, 20, -120], scale: 40, color: '#3311aa', opacity: 0.04 },
            { pos: [80, -10, -150], scale: 55, color: '#aa1155', opacity: 0.035 },
            { pos: [-30, -30, -100], scale: 35, color: '#114488', opacity: 0.04 },
            { pos: [50, 40, -130], scale: 45, color: '#7722cc', opacity: 0.03 },
            { pos: [-80, 10, -160], scale: 50, color: '#cc4400', opacity: 0.025 },
            { pos: [20, -50, -110], scale: 38, color: '#2244aa', opacity: 0.035 },
        ]
    }, [])

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        groupRef.current.rotation.y = Math.sin(t * 0.02) * 0.05
    })

    return (
        <group ref={groupRef}>
            {nebulae.map((n, i) => (
                <mesh key={i} position={n.pos}>
                    <sphereGeometry args={[n.scale, 24, 24]} />
                    <meshBasicMaterial color={n.color} transparent opacity={n.opacity} side={THREE.BackSide} />
                </mesh>
            ))}
        </group>
    )
}

/* ═══════════════════════════════════════════
   SHOOTING STARS
   Occasional bright streaks across the sky
   ═══════════════════════════════════════════ */
function ShootingStars() {
    const count = 8
    const refs = useRef([])

    const stars = useMemo(() => {
        return Array.from({ length: count }, () => ({
            x: (Math.random() - 0.5) * 200,
            y: Math.random() * 80 + 20,
            z: -50 - Math.random() * 100,
            speedX: -(1 + Math.random() * 2),
            speedY: -(0.5 + Math.random() * 1),
            length: 3 + Math.random() * 5,
            delay: Math.random() * 300,
            timer: Math.random() * 300,
        }))
    }, [])

    useFrame(() => {
        refs.current.forEach((mesh, i) => {
            if (!mesh) return
            const s = stars[i]
            s.timer++
            if (s.timer < s.delay) {
                mesh.visible = false
                return
            }
            mesh.visible = true
            mesh.position.x += s.speedX
            mesh.position.y += s.speedY
            if (mesh.position.y < -60 || mesh.position.x < -150) {
                mesh.position.x = (Math.random() - 0.5) * 200
                mesh.position.y = Math.random() * 80 + 30
                mesh.position.z = -50 - Math.random() * 100
                s.speedX = -(1 + Math.random() * 2)
                s.speedY = -(0.5 + Math.random() * 1)
                s.delay = Math.random() * 400
                s.timer = 0
                mesh.visible = false
            }
        })
    })

    return (
        <>
            {stars.map((s, i) => (
                <mesh
                    key={i}
                    ref={(el) => (refs.current[i] = el)}
                    position={[s.x, s.y, s.z]}
                    rotation={[0, 0, Math.atan2(s.speedY, s.speedX)]}
                >
                    <boxGeometry args={[s.length, 0.06, 0.06]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
                </mesh>
            ))}
        </>
    )
}

/* ═══════════════════════════════════════════
   GALAXY SPIRAL
   Slowly rotating flat disc of particles
   ═══════════════════════════════════════════ */
function GalaxySpiral() {
    const ref = useRef()
    const count = 3000

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 12
            const radius = (i / count) * 60 + Math.random() * 4
            arr[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 5
            arr[i * 3 + 1] = (Math.random() - 0.5) * 2
            arr[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 5
        }
        return arr
    }, [])

    useFrame(() => {
        ref.current.rotation.y += 0.0003
    })

    return (
        <points ref={ref} position={[70, 30, -180]} rotation={[0.5, 0, 0.3]}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial color="#8866dd" size={0.5} transparent opacity={0.4} sizeAttenuation />
        </points>
    )
}

/* ═══════════════════════════════════════════
   MOUSE PARALLAX CAMERA RIG
   Desktop-only subtle mouse tracking
   ═══════════════════════════════════════════ */
function CameraRig() {
    const { camera } = useThree()
    const mouse = useRef({ x: 0, y: 0 })

    const onMouseMove = useCallback((e) => {
        mouse.current.x = (e.clientX - window.innerWidth / 2) / window.innerWidth
        mouse.current.y = (e.clientY - window.innerHeight / 2) / window.innerHeight
    }, [])

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        if (!isTouchDevice) {
            window.addEventListener('mousemove', onMouseMove)
            return () => window.removeEventListener('mousemove', onMouseMove)
        }
    }, [onMouseMove])

    useFrame(() => {
        camera.position.x += (mouse.current.x * 4 - camera.position.x) * 0.02
        camera.position.y += (-mouse.current.y * 3 - camera.position.y) * 0.02
        camera.lookAt(0, 0, 0)
    })

    return null
}

/* ═══════════════════════════════════════════
   MAIN THREE BACKGROUND COMPONENT
   Galaxy / Outer Space Theme
   ═══════════════════════════════════════════ */
export default function ThreeBackground() {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >
            <Canvas
                camera={{ position: [0, 2, 30], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ alpha: true, antialias: false }}
                style={{ background: 'transparent', pointerEvents: 'none' }}
                events={() => ({ enabled: false, priority: 0 })}
            >
                <color attach="background" args={['#030010']} />
                <fog attach="fog" args={['#030010', 80, 250]} />

                {/* Lighting */}
                <ambientLight intensity={0.15} color="#6666aa" />
                <pointLight position={[20, 10, 40]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-30, -20, -20]} intensity={0.3} color="#4444ff" />

                <CameraRig />
                <Starfield />
                <TwinklingStars />
                <Moon />
                <NebulaClouds />
                <ShootingStars />
                <GalaxySpiral />
            </Canvas>
        </div>
    )
}
