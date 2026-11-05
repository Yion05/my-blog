import bpy,sys
from pathlib import Path
name=sys.argv[sys.argv.index('--')+1]
for img in bpy.data.images:
 if img.size[0]>1024: img.scale(1024,1024)
bpy.ops.object.select_all(action='DESELECT')
for o in bpy.context.scene.objects:
 if o.type=='MESH' and o.name!='Studio Floor':o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(Path.cwd()/'public/pictures/modeling'/(name+'.glb')),use_selection=True,export_animations=False,export_image_format='JPEG',export_jpeg_quality=85)
