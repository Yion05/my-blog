import bpy, math, sys
from pathlib import Path
from mathutils import Vector
name=sys.argv[sys.argv.index('--')+1]
out=Path.cwd()/'public/pictures/modeling'
scene=bpy.context.scene
for o in list(scene.objects):
 if o.type != 'MESH' or not len(o.data.polygons): bpy.data.objects.remove(o,do_unlink=True)
meshes=list(scene.objects)
for o in meshes:
 for p in o.data.polygons:p.use_smooth=True
verts=[o.matrix_world@Vector(v) for o in meshes for v in o.bound_box]
lo=Vector([min(v[i] for v in verts) for i in range(3)]);hi=Vector([max(v[i] for v in verts) for i in range(3)])
center=(lo+hi)/2; h=hi.z-lo.z
bpy.ops.object.empty_add();root=bpy.context.object;root.name=name.title()+' Turntable'
for o in meshes:o.parent=root
root.rotation_euler.z=0;root.keyframe_insert(data_path='rotation_euler',frame=1)
root.rotation_euler.z=2*math.pi;root.keyframe_insert(data_path='rotation_euler',frame=241)
scene.frame_set(1)
bpy.ops.object.camera_add(location=center+Vector((h*1.5,-h*3.4,h*.8)))
cam=bpy.context.object;cam.name='Showcase Camera';cam.rotation_euler=(center-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=h*2.8;scene.camera=cam
for label,offset,power,size,color in [('Key',(-2,-3,4),300,3,(1,.88,.74)),('Fill',(3,-1,2),200,2,(.65,.8,1)),('Rim',(0,3,3),400,2,(1,.74,.45))]:
 bpy.ops.object.light_add(type='AREA',location=center+Vector(offset)*h)
 light=bpy.context.object;light.name=label;light.data.energy=power*h*h;light.data.shape='DISK';light.data.size=size*h;light.data.color=color;light.rotation_euler=(center-light.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.mesh.primitive_plane_add(size=h*200,location=(center.x,center.y,lo.z-.012*h));floor=bpy.context.object;floor.name='Studio Floor'
m=bpy.data.materials.new('Slate studio');m.diffuse_color=(.025,.034,.055,1);m.use_nodes=True;m.node_tree.nodes.get('Principled BSDF').inputs['Base Color'].default_value=(.025,.034,.055,1);m.node_tree.nodes.get('Principled BSDF').inputs['Roughness'].default_value=.8;floor.data.materials.append(m)
scene.world.color=(.12,.12,.12);scene.render.engine='CYCLES';scene.cycles.samples=24;scene.cycles.use_denoising=True
scene.render.resolution_x=1920;scene.render.resolution_y=1080;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.filepath=str(out/(name+'.png'));scene.view_settings.view_transform='AgX'
scene.frame_start=1;scene.frame_end=240;scene.render.fps=24
bpy.ops.file.pack_all()
for a in bpy.context.screen.areas:
 if a.type=='VIEW_3D':a.spaces.active.region_3d.view_perspective='CAMERA'
bpy.ops.wm.save_as_mainfile(filepath=str(Path('C:/Users/user/.codex/visualizations/2026/11/04/01a1a74b-2c59-7fd0-a666-29443e71175b')/(name+'-showcase.blend')))
bpy.ops.render.render(write_still=True)
