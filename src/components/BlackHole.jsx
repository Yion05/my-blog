import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector2 } from 'three'

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

// Original curved-ray approximation, not a full general-relativistic solver.
// Rays cross a 3D disk; bending produces the upper and lower disk images.
// Rendering reference: https://ebruneton.github.io/black_hole_shader/
const fragmentShader = `
    varying vec2 vUv;
    uniform vec2 uSize;
    uniform float uRadius;
    uniform float uTime;

    float hash(vec2 p) {
        vec3 q = fract(vec3(p.xyx) * 0.1031);
        q += dot(q, q.yzx + 33.33);
        return fract((q.x + q.y) * q.z);
    }
    float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
                   mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
    }
    float turbulence(vec2 p) {
        float f = noise(p) * 0.5;
        f += noise(p * 2.03 + 17.1) * 0.27;
        f += noise(p * 4.07 - 9.2) * 0.15;
        f += noise(p * 8.13 + 3.6) * 0.08;
        return f;
    }
    vec3 diskRadiance(vec3 hit, vec3 direction) {
        float r = length(hit.xz);
        float angle = atan(hit.z, hit.x);
        float orbit = uTime * 0.18 / pow(r / 3.0, 1.5);
        // Periodic angular coordinates avoid a seam at atan's branch cut.
        vec2 flow = vec2(cos(angle - orbit), sin(angle - orbit));
        float cloud = turbulence(vec2(r * 5.5, 0.0) + flow * 9.0);
        float filaments = turbulence(vec2(r * 22.0, 0.0) + flow * 16.0 + cloud * 2.0);
        float fine = noise(vec2(r * 48.0, 0.0) + flow * 35.0);
        float density = pow(0.25 + cloud * 0.7 + filaments * 0.65, 2.2);
        density *= 0.65 + fine * 0.65;
        float inner = smoothstep(2.85, 3.25, r);
        float outer = 1.0 - smoothstep(6.0, 12.0, r);
        float heat = pow(3.0 / max(r, 3.0), 2.3);
        float beaming = 1.0 + 0.32 * dot(normalize(vec3(-hit.z, 0.0, hit.x)), direction);
        float grazing = 1.0 / max(0.35, abs(direction.y));
        vec3 warm = mix(vec3(1.0, 0.34, 0.12), vec3(1.0, 0.79, 0.58), pow(heat, 0.55));
        return warm * density * inner * outer * heat * beaming * grazing * 1.9;
    }
    vec3 acceleration(vec3 p, float momentumSquared) {
        float r2 = max(dot(p, p), 0.25);
        return -1.5 * momentumSquared * p / (r2 * r2 * sqrt(r2));
    }
    void main() {
        vec2 screen = (vUv - 0.5) * uSize;
        vec2 p = screen / uRadius;
        // A modest camera roll gives the disk depth while keeping the hole centered.
        p = mat2(0.989, -0.148, 0.148, 0.989) * p;
        vec3 origin = vec3(0.0, 3.0, 18.0);
        vec3 forward = normalize(-origin);
        vec3 right = vec3(1.0, 0.0, 0.0);
        vec3 up = normalize(cross(right, forward));
        vec3 velocity = normalize(forward * length(origin) + (right * p.x + up * p.y) * 2.6);
        vec3 position = origin;
        vec3 angularMomentum = cross(position, velocity);
        float momentumSquared = dot(angularMomentum, angularMomentum);
        vec3 light = vec3(0.0);
        float transmission = 1.0;
        float captured = 0.0;

        // Adaptive integration: fine steps near the photon orbit, large steps far away.
        // Only shade disk crossings, rather than sampling expensive noise every step.
        for (int step = 0; step < 96; step++) {
            float radius = length(position);
            if (radius < 1.0) { captured = 1.0; break; }
            if (radius > 26.0) break;
            float distance = clamp(radius * 0.12, 0.075, 1.8);
            vec3 force = acceleration(position, momentumSquared);
            vec3 next = position + velocity * distance + force * (0.5 * distance * distance);
            vec3 nextVelocity = velocity + (force + acceleration(next, momentumSquared)) * (0.5 * distance);
            if (position.y * next.y < 0.0) {
                float fraction = position.y / (position.y - next.y);
                vec3 hit = mix(position, next, fraction);
                float diskRadius = length(hit.xz);
                if (diskRadius > 2.85 && diskRadius < 12.0) {
                    light += diskRadiance(hit, normalize(velocity)) * transmission;
                    transmission *= 0.35;
                }
            }
            position = next;
            velocity = nextVelocity;
            if (transmission < 0.08) break;
        }

        // Broad scattering around the photon ring, plus an anti-aliased narrow rim.
        float radius = length(p);
        float ringRadius = 1.025;
        float edgeDistance = abs(radius - ringRadius);
        float rimWidth = max(fwidth(radius) * 1.2, 0.0025);
        float rim = exp(-pow(edgeDistance / rimWidth, 2.0));
        float upper = smoothstep(-0.4, 0.6, p.y);
        float halo = exp(-edgeDistance * 12.0) * (0.09 + upper * 0.12);
        halo += exp(-edgeDistance * 3.8) * 0.035;
        // The captured interior stays dark: diffuse glow only reaches its very edge.
        halo *= mix(1.0, smoothstep(0.82, 1.03, radius) * 0.4, captured);
        light += vec3(1.0, 0.73, 0.51) * (halo + rim * 0.45);

        // Preserve the original centered text by shading only the background beneath it.
        float textWidth = uSize.x / uSize.y < 0.85 ? 0.65 : 0.27;
        vec2 textRegion = vec2(screen.x / (uSize.x * textWidth), (screen.y + uSize.y * 0.025) / (uSize.y * 0.23));
        float textShade = exp(-pow(abs(textRegion.x), 6.0) - pow(abs(textRegion.y), 6.0));
        light *= 1.0 - textShade * 0.92;
        vec3 color = vec3(1.0) - exp(-light * 1.35);
        float alpha = max(captured, clamp(max(max(light.r, light.g), light.b) * 2.0, 0.0, 1.0));
        if (alpha < 0.002) discard;
        gl_FragColor = vec4(color / max(alpha, 0.001), alpha);
    }
`

export default function BlackHole({ still }) {
    const { viewport, invalidate } = useThree()
    const material = useRef()
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uSize: { value: new Vector2(1, 1) },
        uRadius: { value: 1 },
    }), [])
    useLayoutEffect(() => {
        const active = material.current.uniforms
        active.uSize.value.set(viewport.width, viewport.height)
        active.uRadius.value = Math.min(viewport.height * 0.265, viewport.width * 0.38)
        invalidate()
    }, [viewport.width, viewport.height, invalidate])
    useFrame((_, delta) => {
        if (!still) material.current.uniforms.uTime.value += Math.min(delta, 0.1)
    })
    return (
        <mesh>
            <planeGeometry args={[viewport.width * 1.05, viewport.height * 1.05]} />
            <shaderMaterial key={fragmentShader} ref={material} vertexShader={vertexShader} fragmentShader={fragmentShader}
                uniforms={uniforms} transparent depthWrite={false} toneMapped={false} />
        </mesh>
    )
}
