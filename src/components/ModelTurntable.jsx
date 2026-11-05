import { Box3, Vector3 } from 'three'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls, useGLTF } from '@react-three/drei'

function Model({ src, wireframe }) {
    const gltf = useGLTF(src)
    const scene = useMemo(() => {
        const copy = gltf.scene.clone(true)
        copy.traverse(object => {
            if (object.isMesh) object.material = Array.isArray(object.material)
                ? object.material.map(material => material.clone()) : object.material.clone()
        })
        return copy
    }, [gltf.scene])
    const invalidate = useThree(state => state.invalidate)
    useEffect(() => {
        const materials = new Set()
        scene.traverse(object => {
            if (object.isMesh) (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material))
        })
        materials.forEach(material => { material.wireframe = wireframe; material.needsUpdate = true })
        invalidate()
        return () => materials.forEach(material => { material.wireframe = false })
    }, [scene, wireframe, invalidate])
    const framing = useMemo(() => {
        scene.updateMatrixWorld(true)
        const box = new Box3().setFromObject(scene)
        const size = box.getSize(new Vector3())
        const center = box.getCenter(new Vector3())
        return { scale: 2 / Math.max(size.x, size.y, size.z), offset: center.negate().toArray() }
    }, [scene])
    return <group scale={framing.scale}><primitive object={scene} position={framing.offset} /></group>
}

function MiniModel({ active }) {
    const group = useRef(null)
    useFrame((_, delta) => {
        if (active && group.current) group.current.rotation.y += Math.min(delta, 0.05) * 0.28
    })
    return <group ref={group}><Model src="/pictures/modeling/eevee.glb" wireframe={false} /></group>
}

export function EeveeCardCanvas({ active }) {
    return <Canvas frameloop={active ? 'always' : 'demand'} dpr={1} camera={{ position: [2, .8, 4.4], fov: 35 }}
        gl={{ alpha: true, antialias: true }} events={() => ({ enabled: false, priority: 0 })}>
        <ambientLight intensity={1.8} />
        <directionalLight position={[-3, 4, 5]} intensity={3} />
        <directionalLight position={[3, 2, -2]} intensity={2} color="#ffcf99" />
        <Suspense fallback={null}><MiniModel active={active} /></Suspense>
    </Canvas>
}

export default function ModelTurntable({ src }) {
    const [rotating, setRotating] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const [wireframe, setWireframe] = useState(false)
    const [visible, setVisible] = useState(!document.hidden)
    useEffect(() => {
        const update = () => setVisible(!document.hidden)
        document.addEventListener('visibilitychange', update)
        return () => document.removeEventListener('visibilitychange', update)
    }, [])
    return <div style={{ width: '100%' }}>
        <div style={{ height: 'min(52vh, 440px)', minHeight: 260 }}>
            <Canvas frameloop={rotating && visible ? 'always' : 'demand'} dpr={[1, 1.5]} camera={{ position: [2, 1, 5], fov: 40 }} gl={{ antialias: true }}>
                <color attach="background" args={['#101522']} />
                <ambientLight intensity={1.5} />
                <directionalLight position={[-3, 4, 5]} intensity={3} />
                <directionalLight position={[3, 2, -2]} intensity={2} color="#9abfff" />
                <Suspense fallback={<Html center><span style={{ color: 'white', whiteSpace: 'nowrap' }}>Loading model…</span></Html>}>
                    <Model src={src} wireframe={wireframe} />
                </Suspense>
                <OrbitControls makeDefault autoRotate={rotating && visible} autoRotateSpeed={0.7} enablePan={false} />
            </Canvas>
        </div>
        <div className="gallery-picker" style={{ paddingTop: 12, alignItems: 'center' }}>
            <button type="button" onClick={() => setRotating(value => !value)}>{rotating ? 'Pause rotation' : 'Rotate model'}</button>
            <button type="button" aria-pressed={wireframe} onClick={() => setWireframe(value => !value)}>Wireframe</button>
            <span className="gallery-description">Drag to inspect · Pinch or scroll to zoom</span>
        </div>
    </div>
}
