import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import * as THREE from 'three'
import './rocket-transition.css'

const destinations = { journey: 'My Journey', hobbies: 'Hobbies', portfolio: 'Portfolio' }

// Procedural geometry stays sharp at any viewport size; no model download.
function createFlight(canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' })
    renderer.setClearColor('#000000', 0)
    renderer.setPixelRatio(1)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(43, 1, .1, 180)
    camera.position.set(0, .8, 11)
    camera.lookAt(0, .3, 0)
    const rocket = new THREE.Group()
    scene.add(rocket)
    const metal = new THREE.MeshStandardMaterial({ color: '#dce8f0', metalness: .72, roughness: .29 })
    const dark = new THREE.MeshStandardMaterial({ color: '#1a2940', metalness: .65, roughness: .3 })
    const cyan = new THREE.MeshStandardMaterial({ color: '#55eaff', emissive: '#13c6f4', emissiveIntensity: .8, metalness: .3, roughness: .2 })
    const mesh = (geometry, material, x = 0, y = 0, z = 0) => {
        const object = new THREE.Mesh(geometry, material)
        object.position.set(x, y, z)
        rocket.add(object)
        return object
    }
    const outline = [[.36,-1.65],[.5,-1.4],[.58,-.8],[.58,.8],[.54,1.25],[.4,1.7],[.2,2.1],[0,2.4]]
    mesh(new THREE.LatheGeometry(outline.map(([x,y]) => new THREE.Vector2(x,y)), 64), metal)
    for (const y of [-1.2, -.9, 1.05]) mesh(new THREE.CylinderGeometry(.59,.59,.055,48), y === -.9 ? cyan : dark, 0,y)
    mesh(new THREE.CylinderGeometry(.32,.46,.35,48), dark,0,-1.72)
    const nozzle = mesh(new THREE.TorusGeometry(.34,.045,12,48),cyan,0,-1.91)
    nozzle.rotation.x = Math.PI / 2
    const windowRim = mesh(new THREE.TorusGeometry(.235,.055,16,48), dark,0,.52,.565)
    windowRim.rotation.x = -.05
    const windowGlass = mesh(new THREE.SphereGeometry(.215,32,20), new THREE.MeshStandardMaterial({ color:'#072e50',emissive:'#048cc1',emissiveIntensity:.6,metalness:.7,roughness:.12 }),0,.52,.59)
    windowGlass.scale.z = .32
    const finShape = new THREE.Shape()
    finShape.moveTo(.44,-.5); finShape.lineTo(1.05,-1.5); finShape.lineTo(1.05,-1.95); finShape.lineTo(.4,-1.4); finShape.closePath()
    const finGeometry = new THREE.ExtrudeGeometry(finShape,{depth:.09,bevelEnabled:true,bevelSize:.03,bevelThickness:.02,bevelSegments:1,steps:1})
    for (let i=0;i<4;i++) {
        const fin = mesh(finGeometry, i % 2 ? dark : metal)
        fin.rotation.y = i * Math.PI / 2
    }
    const exhaust = new THREE.Group()
    exhaust.position.y = -1.9
    rocket.add(exhaust)
    for (const [radius,length,color,opacity] of [[.32,2.5,'#157dff',.25],[.21,1.9,'#39ddff',.6],[.11,1.35,'#efffff',.95]]) {
        const flame = new THREE.Mesh(new THREE.ConeGeometry(radius,length,32),new THREE.MeshBasicMaterial({color,transparent:true,opacity,depthWrite:false,blending:THREE.AdditiveBlending}))
        flame.rotation.z = Math.PI
        flame.position.y = -length / 2
        exhaust.add(flame)
    }
    scene.add(new THREE.HemisphereLight('#cdeaff','#202037',2))
    const key = new THREE.DirectionalLight('#fff1d6',5); key.position.set(-4,5,7); scene.add(key)
    const rim = new THREE.DirectionalLight('#288cff',5); rim.position.set(4,1,-3); scene.add(rim)
    const engine = new THREE.PointLight('#29d9ff',8,7); engine.position.y=-2; rocket.add(engine)
    const state={power:0}
    const resize=()=>{
        const size=canvas.clientWidth || 320
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1,2))
        renderer.setSize(size,size,false)
        camera.aspect=1
        camera.position.set(0,.4,10)
        camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize',resize)
    let frame, stopped=false
    const contextLost=event=>{ event.preventDefault(); stopped=true; canvas.style.visibility='hidden'; cancelAnimationFrame(frame) }
    canvas.addEventListener('webglcontextlost',contextLost)
    const render=now=>{
        if(stopped)return
        frame=requestAnimationFrame(render)
        if(document.hidden)return
        exhaust.scale.y=state.power*(.96+Math.sin(now*.047)*.04)
        exhaust.visible=state.power>.01
        engine.intensity=state.power*9
        renderer.render(scene,camera)
    }
    renderer.render(scene,camera)
    frame=requestAnimationFrame(render)
    return {rocket,state,dispose(){
        stopped=true; cancelAnimationFrame(frame)
        window.removeEventListener('resize',resize)
        canvas.removeEventListener('webglcontextlost',contextLost)
        const geometries=new Set(),materials=new Set()
        scene.traverse(object=>{if(object.geometry)geometries.add(object.geometry); if(object.material)materials.add(object.material)})
        geometries.forEach(item=>item.dispose()); materials.forEach(item=>item.dispose())
        // React StrictMode can immediately reuse this canvas for a second setup.
        // Dispose GPU resources without forcibly losing that reusable context.
        renderer.dispose()
    }}
}

export default function RocketTransition({ destination, source, onArrive, onComplete }) {
    const shellRef=useRef(null),labelRef=useRef(null),spriteRef=useRef(null),canvasRef=useRef(null),fallbackRef=useRef(null)
    const callbacks=useRef({onArrive,onComplete})
    callbacks.current={onArrive,onComplete}
    useLayoutEffect(()=>{
        const button=source.element, shell=shellRef.current, sprite=spriteRef.current
        const disabled=button.getAttribute('aria-disabled')
        button.classList.add('rocket-launch-source')
        button.setAttribute('aria-disabled','true')
        let flight,finished=false
        const finish=()=>{if(!finished){finished=true;callbacks.current.onArrive();callbacks.current.onComplete()}}
        const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
        canvasRef.current.style.visibility='visible'
        fallbackRef.current.style.display=''
        if(!reduced){try{flight=createFlight(canvasRef.current);fallbackRef.current.style.display='none'}catch(error){canvasRef.current.style.visibility='hidden';console.warn('Using lightweight rocket fallback.',error)}}
        const timeline=gsap.timeline({onComplete:finish})
        let centerX=source.rect.left+source.rect.width/2,centerY=source.rect.top+source.rect.height/2
        const position=()=>{
            if(timeline.time()>.65)return
            const rect=button.getBoundingClientRect()
            centerX=rect.left+rect.width/2;centerY=rect.top+rect.height/2
            gsap.set([shell,sprite],{left:centerX,top:centerY})
        }
        gsap.set(shell,{width:source.rect.width,height:source.rect.height,opacity:1,scaleX:1,scaleY:1,borderRadius:0})
        gsap.set([shell,sprite],{left:centerX,top:centerY,xPercent:-50,yPercent:-50})
        gsap.set(labelRef.current,{opacity:1})
        gsap.set(sprite,{opacity:0,scale:.3,x:0,y:0,rotation:0})
        if(flight)flight.rocket.rotation.set(.1,-.3,-Math.PI/2)
        if(reduced){
            timeline.to(shell,{opacity:0,duration:.18})
        }else{
            timeline.to(labelRef.current,{opacity:0,duration:.16},0)
                .to(shell,{scaleX:.45,scaleY:.55,borderRadius:40,duration:.4,ease:'power2.inOut'},.08)
                .to(shell,{opacity:0,duration:.22},.32)
                .to(sprite,{opacity:1,scale:1,duration:.45,ease:'power2.out'},.18)
            if(flight)timeline.to(flight.state,{power:1.1,duration:.5},.45)
            timeline.to(sprite,{x:30,y:-12,rotation:-12,duration:.4,ease:'power1.inOut'},.7)
                .to(sprite,{x:()=>window.innerWidth-centerX+280,y:()=>-Math.min(240,centerY*.45),scale:.55,duration:1.1,ease:'power3.in'},1.1)
            if(flight)timeline.to(flight.state,{power:1.5,duration:.8},1.1)
        }
        const skip=event=>{if(event.key==='Escape'){timeline.kill();finish()}}
        window.addEventListener('keydown',skip)
        window.addEventListener('scroll',position,{passive:true})
        return ()=>{
            timeline.kill();flight?.dispose()
            window.removeEventListener('keydown',skip);window.removeEventListener('scroll',position)
            button.classList.remove('rocket-launch-source')
            if(disabled===null)button.removeAttribute('aria-disabled');else button.setAttribute('aria-disabled',disabled)
        }
    },[])
    return createPortal(<div className="rocket-transition">
        <span className="sr-only" role="status">Flying to {destinations[destination]}</span>
        <div ref={shellRef} className="rocket-button-shell" aria-hidden="true"><span ref={labelRef}>{source.label}</span></div>
        <div ref={spriteRef} className="rocket-sprite" aria-hidden="true">
            <canvas ref={canvasRef} className="rocket-canvas" />
            <svg ref={fallbackRef} className="rocket-fallback" viewBox="0 0 320 320">
                <defs><linearGradient id="rocket-metal" x2="0" y2="1"><stop stopColor="#f3fbff"/><stop offset=".5" stopColor="#9ab7c9"/><stop offset="1" stopColor="#405b75"/></linearGradient></defs>
                <path d="M105 146 L48 160 L105 174Z" fill="#50e6ff"/>
                <path d="M124 145 L112 114 L160 141 M124 175 L112 206 L160 179" fill="#68869e"/>
                <path d="M105 145 Q202 125 240 160 Q202 195 105 175Z" fill="url(#rocket-metal)"/>
                <circle cx="182" cy="160" r="12" fill="#12405c" stroke="#62e8ff" strokeWidth="4"/>
            </svg>
        </div>
    </div>,document.body)
}
