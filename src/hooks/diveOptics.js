// Short-lived postprocess over ONE captured frame; the expensive landing scene
// can be disposed immediately. No ongoing renderer survives the transition.
export function createDiveOptics(snapshot) {
    const canvas = document.createElement('canvas')
    canvas.className = 'cinema-warp'
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' })
    if (!gl) return null
    const compile = (type, source) => {
        const shader = gl.createShader(type)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            gl.deleteShader(shader)
            throw new Error('Transition shader unavailable')
        }
        return shader
    }
    let vertex, fragment, program, texture, buffer, disposed = false
    const dispose = () => {
        if (disposed) return
        disposed = true
        canvas.remove()
        if (texture) gl.deleteTexture(texture)
        if (buffer) gl.deleteBuffer(buffer)
        if (program) gl.deleteProgram(program)
        if (vertex) gl.deleteShader(vertex)
        if (fragment) gl.deleteShader(fragment)
        gl.getExtension('WEBGL_lose_context')?.loseContext()
        canvas.width = canvas.height = 1
    }
    try {
        vertex = compile(gl.VERTEX_SHADER, `attribute vec2 position; varying vec2 uv;
            void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`)
        fragment = compile(gl.FRAGMENT_SHADER, `precision highp float;
            varying vec2 uv; uniform sampler2D scene;
            uniform float aspect, zoom, bank, flow, lens, rush, hole;
            mat2 rotation(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}
            vec3 sampleScene(vec2 p){
                vec2 coord=p/vec2(aspect,1.)+.5;
                return texture2D(scene,clamp(coord,0.,1.)).rgb;
            }
            void main(){
                vec2 p=(uv-.5)*vec2(aspect,1.);
                p=rotation(bank)*p/zoom;
                float r=length(p);
                // Differential flow along the projected disk; protect the black core.
                vec2 disk=rotation(-.148)*p;
                float equator=exp(-abs(disk.y+.035)*12.);
                disk.y=(disk.y+.035)/.28;
                float dr=length(disk);
                float band=smoothstep(hole*.95,hole*1.4,dr)*(1.-smoothstep(hole*2.,hole*3.8,dr));
                band*=smoothstep(hole*1.05,hole*1.55,r)*equator;
                // Texture advection stays subtle so the photon ring remains round.
                disk=rotation(flow*.012*band)*disk;
                disk.y=disk.y*.28-.035;
                vec2 flowed=rotation(.148)*disk;
                p=mix(p,flowed,clamp(flow,0.,1.));
                // A restrained radial lens shear and chromatic rim during acceleration.
                float rim=exp(-abs(r-hole)*24.);
                p*=1.+lens*.045*rim;
                vec2 separation=normalize(p+vec2(.00001))*lens*.0018;
                vec3 color=vec3(sampleScene(p+separation).r,sampleScene(p).g,sampleScene(p-separation).b);
                color=mix(color,(color+sampleScene(p*(1.+rush*.04))+sampleScene(p*(1.+rush*.08)))/3.,rush*.65);
                float vignette=1.-lens*.22*smoothstep(.15,.8,length((uv-.5)*vec2(aspect,1.)));
                gl_FragColor=vec4(color*vignette,1.);
            }`)
        program = gl.createProgram()
        gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Transition shader unavailable')
        gl.useProgram(program)
        buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW)
        const location = gl.getAttribLocation(program, 'position')
        gl.enableVertexAttribArray(location); gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0)
        texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, snapshot)
        const uniforms = Object.fromEntries(['aspect','zoom','bank','flow','lens','rush','hole'].map(name => [name,gl.getUniformLocation(program,name)]))
        snapshot.parentNode.appendChild(canvas)
        const render = state => {
            if (disposed) return
            const width = window.innerWidth, height = window.innerHeight
            // Cap fill cost on phones; no enormous raster allocation during zoom.
            const dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1 : 1.5)
            const w = Math.round(width*dpr), h = Math.round(height*dpr)
            if (canvas.width !== w || canvas.height !== h) { canvas.width=w; canvas.height=h; gl.viewport(0,0,w,h) }
            const values = { ...state, aspect: width/height, hole: Math.min(.265,width/height*.38) }
            for (const name in uniforms) gl.uniform1f(uniforms[name],values[name])
            gl.drawArrays(gl.TRIANGLES,0,6)
        }
        return { render, dispose }
    } catch {
        dispose()
        return null // The compositor-only zoom is the WebGL-unavailable fallback.
    }
}
