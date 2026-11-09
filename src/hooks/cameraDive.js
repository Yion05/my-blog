import { createDiveOptics } from './diveOptics'

/** All scenery phases are appended to the same timeline as the foreground orbit. */
export function addCameraDive(timeline, cinema, { reducedMotion, camera, onPhase }) {
    if (!cinema) return { render() {}, dispose() {} }
    const { live, dive, stars, blackout } = cinema
    const elements = [live, dive, stars, blackout]
    const styles = elements.map(element => element.getAttribute('style'))
    cinema.capture()
    const optics = reducedMotion ? null : createDiveOptics(dive)
    let finished = false
    const blackAt = reducedMotion ? .35 : 4.15
    const revealAt = blackAt + (reducedMotion ? .15 : .35)
    const revealDuration = reducedMotion ? .55 : 1.35
    const render = () => {
        if (finished) return
        if (optics) optics.render(camera)
        else dive.style.transform = `scale(${camera.zoom}) rotate(${camera.bank}rad)`
    }
    render()
    timeline.addLabel('capture', 0).addLabel('diskOrbit', .8).addLabel('plunge', 2.6)
    timeline.addLabel('blackout', blackAt).addLabel('otherSide', revealAt)
    timeline.call(() => onPhase?.('diving'), [], 0)
    timeline.set(dive, { autoAlpha: optics ? 0 : 1, scale: 1, force3D: true, transformOrigin: 'center center', willChange: 'transform' }, 0)
    timeline.set(live, { autoAlpha: 0 }, 0)
    if (!reducedMotion) {
        timeline.to(camera, { zoom: 1.055, bank: -.018, flow: .5, duration: .8, ease: 'sine.inOut' }, 0)
        timeline.to(camera, { zoom: 1.18, bank: .035, flow: 2.2, lens: .28, duration: 1.8, ease: 'power1.in' }, .8)
        timeline.to(camera, { zoom: 1.9, bank: .065, flow: 3.6, lens: 1, rush: .65, duration: .65, ease: 'power2.in' }, 'plunge')
        timeline.to(camera, { zoom: 36, bank: 0, lens: .2, rush: 1, duration: .9, ease: 'expo.in' }, 3.25)
    }
    // No flash: the expanding dark center leads into a fully opaque black frame.
    timeline.to(blackout, { autoAlpha: 1, duration: .3, ease: 'power2.in' }, blackAt - .3)
    timeline.set(dive, { autoAlpha: 0, scale: 1, willChange: 'auto' }, 'blackout')
    timeline.call(() => {
        finished = true
        optics?.dispose()
        dive.width = dive.height = 1
        onPhase?.('blackout')
    }, [], 'blackout')
    timeline.set(stars, { autoAlpha: 1 }, 'otherSide')
    timeline.call(() => onPhase?.('stars'), [], 'otherSide')
    timeline.to(blackout, { autoAlpha: 0, duration: revealDuration, ease: 'sine.inOut' }, 'otherSide')
    timeline.addLabel('arrived', revealAt + revealDuration)
    return { render, dispose(interrupted) {
        optics?.dispose()
        if (interrupted) elements.forEach((element, i) => {
            if (styles[i] === null) element.removeAttribute('style')
            else element.setAttribute('style', styles[i])
        })
    } }
}
