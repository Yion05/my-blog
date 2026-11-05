/** Append scenery phases to the SAME timeline that already controls the UI pull. */
export function addCameraDive(timeline, cinema, { reducedMotion, onPhase }) {
    if (!cinema) return () => {}
    const { live, dive, stars, blackout } = cinema
    const elements = [live, dive, stars, blackout]
    const styles = elements.map(element => element.getAttribute('style'))
    cinema.capture()

    const diveAt = reducedMotion ? 0 : 1.1
    const blackAt = reducedMotion ? 0.35 : 3.35
    const revealAt = blackAt + (reducedMotion ? 0.15 : 0.45)
    const revealDuration = reducedMotion ? 0.55 : 1.6

    timeline.addLabel('pull', 0)
    timeline.addLabel('dive', diveAt)
    timeline.addLabel('blackout', blackAt)
    timeline.addLabel('otherSide', revealAt)
    timeline.call(() => onPhase?.('diving'), [], 0)
    timeline.set(dive, { autoAlpha: 1, scale: 1, force3D: true, transformOrigin: 'center center', willChange: 'transform' }, 0)
    timeline.set(live, { autoAlpha: 0 }, 0)
    if (!reducedMotion) {
        timeline.to(dive, { scale: 36, duration: blackAt - diveAt, ease: 'expo.in', force3D: true }, 'dive')
    }

    // A true opaque-black frame, including the old scanline, on every aspect ratio.
    timeline.to(blackout, { autoAlpha: 1, duration: 0.35, ease: 'power2.in' }, blackAt - 0.35)
    timeline.set(dive, { autoAlpha: 0, scale: 1, willChange: 'auto' }, 'blackout')
    timeline.call(() => {
        onPhase?.('blackout') // Unmount the heavy WebGL scene while it is covered.
        dive.width = dive.height = 1 // Release the captured texture; it is no longer visible.
    }, [], 'blackout')

    // Hold the completely black screen before revealing a prepainted stars-only canvas.
    timeline.set(stars, { autoAlpha: 1 }, 'otherSide')
    timeline.call(() => onPhase?.('stars'), [], 'otherSide')
    timeline.to(blackout, { autoAlpha: 0, duration: revealDuration, ease: 'sine.inOut' }, 'otherSide')
    timeline.addLabel('arrived', revealAt + revealDuration)
    // The owning timeline's onComplete navigates AFTER this reveal, never on a timer.

    return () => {
        // Only used if interrupted before arrival. Successful completion retains stars.
        elements.forEach((element, index) => {
            if (styles[index] === null) element.removeAttribute('style')
            else element.setAttribute('style', styles[index])
        })
    }
}
