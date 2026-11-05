import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertex = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`
const fragment = `
    varying vec2 vUv;
    uniform float uOpacity;
    void main() {
        // The bright head is at x=0; the tail gets narrower and fades behind it.
        float taper = pow(1.0 - vUv.x, 1.8);
        float width = mix(0.15, 0.015, vUv.x);
        float d = abs(vUv.y - 0.5);
        float core = exp(-pow(d / width, 2.0) * 2.0);
        float glow = exp(-pow(d / (width * 2.4), 2.0) * 2.0) * 0.2;
        vec3 color = mix(vec3(1.0, 0.97, 0.91), vec3(0.48, 0.66, 0.9), vUv.x);
        gl_FragColor = vec4(color, (core + glow) * taper * uOpacity);
    }
`

export default function Meteor({ index, still }) {
    const ref = useRef()
    const elapsed = useRef(-index * 3.7)
    const cycle = useRef(-1)
    const trajectory = useRef({ x: 0.5, y: 0.5, dx: -1, dy: -0.6 })
    const { viewport, camera } = useThree()
    const uniforms = useMemo(() => ({ uOpacity: { value: 0 } }), [])
    const duration = 1.05 + index * 0.13
    const period = 10 + index * 2.3
    const depth = 2 + index * 1.4
    const length = 1.6 + index * 0.45

    useFrame((_, delta) => {
        if (still) { ref.current.visible = false; return }
        // Ignore a tab-resume gap; normal frame times retain real-time speed.
        if (delta < 0.5) elapsed.current += delta
        if (elapsed.current < 0) { ref.current.visible = false; return }
        const currentCycle = Math.floor(elapsed.current / period)
        const age = elapsed.current % period
        if (cycle.current !== currentCycle) {
            cycle.current = currentCycle
            const seed = Math.sin((currentCycle + 1) * 127.1 + index * 311.7) * 43758.5453
            const random = seed - Math.floor(seed)
            trajectory.current = {
                x: 0.05 + random * 0.6,
                y: 0.52 + index * 0.06,
                dx: -(0.55 + random * 0.3),
                dy: -(0.7 + random * 0.15),
            }
        }
        ref.current.visible = age < duration
        if (!ref.current.visible) return
        const progress = age / duration
        const path = trajectory.current
        // Measure the viewport at this meteor's depth so screen speed is consistent.
        const view = viewport.getCurrentViewport(camera, [0, 0, depth])
        ref.current.position.set((path.x + path.dx * progress) * view.width,
            (path.y + path.dy * progress) * view.height, depth)
        ref.current.rotation.z = Math.atan2(-path.dy * view.height, -path.dx * view.width)
        uniforms.uOpacity.value = Math.min(1, progress / 0.07, (1 - progress) / 0.18)
    })
    return (
        <group ref={ref} visible={false}>
            <mesh position={[length / 2, 0, 0]}>
                <planeGeometry args={[length, 0.12]} />
                <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms}
                    transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
            </mesh>
        </group>
    )
}
