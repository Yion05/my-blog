// Screen-space projection of a contracting, tilted disk. Shared by every carrier:
// objects move in the same orbital direction instead of spinning independently.
export function accretionPosition({ x, y, index, width, height, capture, orbit, infall }) {
    const tilt = -0.148
    const c = Math.cos(tilt), s = Math.sin(tilt)
    const diskRadius = Math.min(width * 0.40, height * 0.43)
    const flatten = 0.28
    const localX = x * c + y * s
    const localY = -x * s + y * c
    const initialAngle = Math.atan2(localY / flatten, localX || 0.001)
    const angle = initialAngle + orbit + index * 0.035 * capture
    const radius = diskRadius * (1 - orbit * 0.055) * (1 - infall)
    const diskX = Math.cos(angle) * radius
    const diskY = Math.sin(angle) * radius * flatten
    const px = diskX * c - diskY * s
    const py = diskX * s + diskY * c + height * 0.035 * (1 - infall)
    return {
        x: x * (1 - capture) + px * capture,
        y: y * (1 - capture) + py * capture,
        depth: Math.sin(angle),
        tangent: Math.atan2(Math.cos(angle) * flatten, -Math.sin(angle)) + tilt,
    }
}
