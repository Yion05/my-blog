// Add your files under public/pictures or public/videos, then add media here.
// Photo: { id: 'poster', type: 'image', src: '/pictures/poster.jpg', title: 'Poster design', alt: 'Describe the artwork' }
// Video: { id: 'demo', type: 'video', src: '/videos/demo.mp4', title: 'Project demo', poster: '/pictures/demo.jpg' }
export const skillShowcases = [
    { id: 'modeling', icon: 'fa-cube', title: '3D Modeling', category: '3D ART', accent: '#fbad67', tag: 'Blender', media: [
        { id: 'eevee-render', type: 'image', src: '/pictures/modeling/eevee.png', title: 'Eevee — Blender studio render', alt: 'Textured Eevee model under soft studio lighting', description: 'Original model presented with smooth shading and a three-light studio setup.' },
        { id: 'eevee-360', type: 'model', src: '/pictures/modeling/eevee.glb', title: 'Eevee — interactive 360°', description: 'Actual model geometry · Slow turntable · Drag to inspect' },
        { id: 'pikachu-render', type: 'image', src: '/pictures/modeling/pikachu.png', title: 'Pikachu — Blender studio render', alt: 'Textured Pikachu model under soft studio lighting', description: 'Original model presented with smooth shading and a three-light studio setup.' },
        { id: 'pikachu-360', type: 'model', src: '/pictures/modeling/pikachu.glb', title: 'Pikachu — interactive 360°', description: 'Actual model geometry · Slow turntable · Drag to inspect' },
        { id: 'eevee-workspace', type: 'image', src: '/pictures/modeling/eevee-blender-workspace.png', title: 'Eevee — Blender workspace', alt: 'Actual Blender workspace showing Eevee with separate named mesh parts and the studio setup', description: 'Blender workspace capture: model parts, camera, lighting, and turntable timeline.' },
        { id: 'pikachu-workspace', type: 'image', src: '/pictures/modeling/pikachu-blender-workspace.png', title: 'Pikachu — Blender materials', alt: 'Actual Blender Shading workspace showing Pikachu and connected texture and material nodes', description: 'Blender workspace capture: the model, component hierarchy, and texture/material nodes.' },
    ] },
    { id: 'games', icon: 'fa-gamepad', title: 'Game Development', category: 'INTERACTIVE', accent: '#a78bfa', tag: 'Unity / C#', preview: '/pictures/wildwood/sunset-user.png', media: [
        { id: 'wildwood-film', type: 'video', src: '/videos/wildwood/sunset-showcase.mp4', poster: '/pictures/wildwood/forest-film-cover.jpg', title: 'Wildwood — forest showcase', description: 'A cinematic pan captured inside the running Unity scene · Full HD · 30 fps.' },
        { id: 'wildwood-sunset', type: 'image', src: '/pictures/wildwood/sunset-user.png', title: 'Wildwood — sunset', alt: 'Low sun against an orange sky above the Wildwood forest, with the gameplay HUD visible', description: 'Sunset over Wildwood’s forest and hills, captured in game.' },
        { id: 'wildwood-vista', type: 'image', src: '/pictures/wildwood/forest-vista.jpg', title: 'Wildwood — forest vista', alt: 'A wide view of the Wildwood environment at sunset', description: 'A second view of the forest and long evening shadows.' },
        { id: 'wildwood-player', type: 'image', src: '/pictures/wildwood/gameplay.jpg', title: 'Wildwood — gameplay view', alt: 'Wildwood first-person forest view and survival HUD at sunset', description: 'The in-game camera, equipment slots and survival indicators.' },
        { id: 'wildwood-inventory', type: 'image', src: '/pictures/wildwood/inventory.jpg', title: 'Wildwood — inventory & crafting', alt: 'Wildwood inventory and crafting interface in the running game', description: 'The game’s inventory, crafting and survivor interface.' },
        { id: 'wildwood-unity', type: 'image', src: '/pictures/wildwood/unity-workspace-user.png', title: 'Wildwood — Unity workspace', alt: 'Wildwood inventory and crafting interface in Unity, with the scene hierarchy and day/night settings visible', description: 'Unity 6 workspace showing the inventory, crafting interface, and day/night controls.' },
    ] },
]
