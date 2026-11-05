// Add your files under public/pictures or public/videos, then add media here.
// Photo: { id: 'poster', type: 'image', src: '/pictures/poster.jpg', title: 'Poster design', alt: 'Describe the artwork' }
// Video: { id: 'demo', type: 'video', src: '/videos/demo.mp4', title: 'Project demo', poster: '/pictures/demo.jpg' }
export const skillShowcases = [
    { id: 'design', icon: 'fa-pen-nib', title: 'Graphic Design', category: 'VISUAL DESIGN', accent: '#e879f9', tag: 'Design', media: [] },
    { id: 'modeling', icon: 'fa-cube', title: '3D Modeling', category: '3D ART', accent: '#fbad67', tag: 'Blender', media: [
        { id: 'eevee-render', type: 'image', src: '/pictures/modeling/eevee.png', title: 'Eevee — Blender studio render', alt: 'Textured Eevee model under soft studio lighting', description: 'Original model presented with smooth shading and a three-light studio setup.' },
        { id: 'eevee-360', type: 'model', src: '/pictures/modeling/eevee.glb', title: 'Eevee — interactive 360°', description: 'Actual model geometry · Slow turntable · Drag to inspect' },
        { id: 'pikachu-render', type: 'image', src: '/pictures/modeling/pikachu.png', title: 'Pikachu — Blender studio render', alt: 'Textured Pikachu model under soft studio lighting', description: 'Original model presented with smooth shading and a three-light studio setup.' },
        { id: 'pikachu-360', type: 'model', src: '/pictures/modeling/pikachu.glb', title: 'Pikachu — interactive 360°', description: 'Actual model geometry · Slow turntable · Drag to inspect' },
        { id: 'eevee-workspace', type: 'image', src: '/pictures/modeling/eevee-blender-workspace.png', title: 'Eevee — Blender workspace', alt: 'Actual Blender workspace showing Eevee with separate named mesh parts and the studio setup', description: 'Blender workspace capture: model parts, camera, lighting, and turntable timeline.' },
        { id: 'pikachu-workspace', type: 'image', src: '/pictures/modeling/pikachu-blender-workspace.png', title: 'Pikachu — Blender materials', alt: 'Actual Blender Shading workspace showing Pikachu and connected texture and material nodes', description: 'Blender workspace capture: the model, component hierarchy, and texture/material nodes.' },
    ] },
    { id: 'security', icon: 'fa-shield-halved', title: 'Security Technology', category: 'TECHNOLOGY', accent: '#67e8f9', tag: 'Security Tech', media: [] },
    { id: 'games', icon: 'fa-gamepad', title: 'Game Development', category: 'INTERACTIVE', accent: '#a78bfa', tag: 'Unity / C#', media: [] },
]
