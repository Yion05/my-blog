import { Component, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import BlackHole from './BlackHole'
import Meteor from './Meteor'

function randomSequence(seed) {
    let value = seed >>> 0
    return () => ((value = (value * 1664525 + 1013904223) >>> 0) / 4294967296)
}

const starVertex = `
    attribute float aSize;
    attribute float aPhase;
    attribute vec3 aColor;
    uniform float uTime;
    uniform float uPixelRatio;
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
        vec4 view = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * view;
        gl_PointSize = clamp(aSize * uPixelRatio * (45.0 / -view.z), 1.0, 15.0);
        vColor = aColor;
        vAlpha = 0.65 + 0.35 * sin(uTime * 0.6 + aPhase);
    }
`
const starFragment = `
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        if (r > 1.0) discard;
        float glow = exp(-r * r * 5.0) * (1.0 - smoothstep(0.2, 1.0, r));
        gl_FragColor = vec4(vColor, glow * vAlpha);
    }
`

function Starfield({ still }) {
    const ref = useRef()
    const { gl } = useThree()
    const data = useMemo(() => {
        const random = randomSequence(725)
        const count = 2600
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        const sizes = new Float32Array(count)
        const phases = new Float32Array(count)
        const palette = ['#cbdcff', '#8aafff', '#ffe1c4', '#ffffff'].map(c => new THREE.Color(c))
        for (let i = 0; i < count; i++) {
            positions.set([(random() - 0.5) * 190, (random() - 0.5) * 110, -12 - random() * 95], i * 3)
            palette[Math.floor(random() * palette.length)].toArray(colors, i * 3)
            sizes[i] = 0.7 + Math.pow(random(), 4) * 6
            phases[i] = random() * Math.PI * 2
        }
        return { positions, colors, sizes, phases, count }
    }, [])
    const uniforms = useMemo(() => ({ uTime: { value: 0 }, uPixelRatio: { value: gl.getPixelRatio() } }), [gl])
    useFrame((_, delta) => {
        if (still) return
        uniforms.uTime.value += Math.min(delta, 0.05)
        ref.current.rotation.z += Math.min(delta, 0.05) * 0.0015
    })
    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" array={data.positions} count={data.count} itemSize={3} />
                <bufferAttribute attach="attributes-aColor" array={data.colors} count={data.count} itemSize={3} />
                <bufferAttribute attach="attributes-aSize" array={data.sizes} count={data.count} itemSize={1} />
                <bufferAttribute attach="attributes-aPhase" array={data.phases} count={data.count} itemSize={1} />
            </bufferGeometry>
            <shaderMaterial uniforms={uniforms} vertexShader={starVertex} fragmentShader={starFragment}
                transparent depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
    )
}

function Asteroids({ still }) {
    const ref = useRef()
    const { viewport } = useThree()
    const rocks = useMemo(() => {
        const random = randomSequence(42)
        return Array.from({ length: 12 }, (_, i) => ({
            x: (i % 2 ? 1 : -1) * (0.34 + random() * 0.2),
            y: (random() - 0.5) * 1.2,
            z: -4 + random() * 8,
            size: 0.025 + random() * 0.11,
            rotation: [random() * 6, random() * 6, random() * 6],
        }))
    }, [])
    useFrame((_, delta) => {
        if (still) return
        ref.current.children.forEach((rock, i) => {
            rock.rotation.y += Math.min(delta, 0.05) * (0.05 + i * 0.008)
            rock.rotation.x += Math.min(delta, 0.05) * 0.035
        })
    })
    return (
        <group ref={ref}>
            {rocks.map((rock, i) => (
                <mesh key={i} position={[rock.x * viewport.width, rock.y * viewport.height, rock.z]}
                    rotation={rock.rotation} scale={[rock.size, rock.size * 0.75, rock.size * 1.2]}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#74839b" roughness={0.9} metalness={0.25} flatShading />
                </mesh>
            ))}
        </group>
    )
}

function CameraRig({ still }) {
    const pointer = useRef({ x: 0, y: 0 })
    useEffect(() => {
        if (still || !window.matchMedia('(pointer: fine)').matches) return
        const move = event => {
            pointer.current = { x: event.clientX / window.innerWidth - 0.5, y: event.clientY / window.innerHeight - 0.5 }
        }
        const reset = () => { pointer.current = { x: 0, y: 0 } }
        window.addEventListener('pointermove', move)
        window.addEventListener('blur', reset)
        return () => {
            window.removeEventListener('pointermove', move)
            window.removeEventListener('blur', reset)
        }
    }, [still])
    useFrame(({ camera }, delta) => {
        const smoothing = 1 - Math.exp(-Math.min(delta, 0.05) * 2)
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, still ? 0 : pointer.current.x * 0.65, smoothing)
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, still ? 0 : -pointer.current.y * 0.45, smoothing)
        camera.lookAt(0, 0, 0)
    })
    return null
}

class SceneBoundary extends Component {
    state = { failed: false }
    static getDerivedStateFromError() { return { failed: true } }
    render() { return this.state.failed ? null : this.props.children }
}

// Capture immediately after a render: no preserveDrawingBuffer cost on every frame.
function CaptureBridge({ captureRef }) {
    const { gl, scene, camera } = useThree()
    useEffect(() => {
        if (!captureRef) return
        captureRef.current = destination => {
            const context = destination.getContext('2d', { alpha: false })
            if (!context) return false
            gl.render(scene, camera)
            destination.width = gl.domElement.width
            destination.height = gl.domElement.height
            context.fillStyle = '#000'
            context.fillRect(0, 0, destination.width, destination.height)
            context.drawImage(gl.domElement, 0, 0)
            return true
        }
        return () => { captureRef.current = null }
    }, [gl, scene, camera, captureRef])
    return null
}

export default function ThreeBackground({ landing = true, paused = false, captureRef }) {
    const reducedMotion = useReducedMotion()
    const [sceneReady, setSceneReady] = useState(false)
    const [visible, setVisible] = useState(!document.hidden)
    useEffect(() => {
        const update = () => setVisible(!document.hidden)
        document.addEventListener('visibilitychange', update)
        return () => document.removeEventListener('visibilitychange', update)
    }, [])
    return (
        <div className={`space-background ${landing ? '' : 'space-background--quiet'} ${sceneReady ? 'space-background--ready' : ''}`} aria-hidden="true">
            <div className="space-fallback"><div className="space-fallback__ring" /></div>
            <SceneBoundary>
                <Canvas camera={{ position: [0, 0, 24], fov: 50, near: 0.1, far: 180 }}
                    onCreated={() => setSceneReady(true)}
                    dpr={[1, 2]} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
                    frameloop={visible && !reducedMotion && !paused ? 'always' : 'demand'} fallback={null}
                    events={() => ({ enabled: false, priority: 0 })}>
                    <ambientLight intensity={0.35} color="#7186c0" />
                    <directionalLight position={[6, 3, 5]} intensity={3} color="#ffcd9b" />
                    <directionalLight position={[-8, -2, 3]} intensity={1.8} color="#699cff" />
                    <Starfield still={reducedMotion} />
                    <BlackHole still={reducedMotion} />
                    <Asteroids still={reducedMotion} />
                    {[0, 1, 2].map(i => <Meteor key={i} index={i} still={reducedMotion} />)}
                    <CameraRig still={reducedMotion} />
                    <CaptureBridge captureRef={captureRef} />
                </Canvas>
            </SceneBoundary>
            <div className="space-vignette" />
        </div>
    )
}
