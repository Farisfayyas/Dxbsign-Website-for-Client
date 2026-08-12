# Renders the 90-frame WebP turntable sequence for the "Apple AirPods
# style" scroll showcase (components/home/FlagpoleFrameSequence.tsx),
# picking up where scripts/generate-placeholder-flagpole.py left off.
#
# What this script adds on top of the existing pole:
#   1. A UAE flag mesh with the same wind-ripple animation used in the
#      earlier real-time version (components/home/WavingFlag.tsx's sine-
#      wave formula, ported here so the two look the same), except now
#      it's evaluated per rendered frame and lit properly by Cycles
#      instead of live WebGL -- this is what actually fixes the flat/
#      plastic "every pixel visible" look, not a limitation of the shape
#      itself.
#   2. A simple 3-point studio light rig (key/fill/rim), which is the
#      single biggest reason the real-time version looked cheap: it had
#      no environment/reflection lighting at all.
#   3. A camera that orbits the pole on a fixed turntable -- same
#      composition goal as before (the flag fills most of the frame, the
#      pole crops out of frame below), except now it's an exact, baked
#      camera position instead of live FOV/aspect-ratio math that has to
#      keep working across every possible screen size. That fixed framing
#      is also why the crop bug reported live can't recur here.
#
# How to use:
#   1. If you still have the Blender session open from the earlier
#      script (the one with the "Flagpole" object in it), just run this
#      script directly in the Scripting tab -- it builds on that object.
#   2. If not: File > Import > glTF 2.0, pick flagpole.glb, THEN run this
#      script.
#   3. Run Script (Alt+P). This will take a while -- 90 frames at decent
#      Cycles quality is not instant, expect several minutes depending on
#      your machine. Blender's UI may look unresponsive while rendering;
#      that's normal.
#   4. Frames land in a "flagpole_frames" folder next to your .blend file
#      (or next to this script if the file hasn't been saved yet), named
#      frame-001.webp through frame-090.webp.
#   5. Zip that folder and send it over -- I'll drop it into
#      public/images/flagpole-frames/ and the swap is done, same as the
#      GLB step.
#
# If your Blender version's WebP export isn't available for some reason,
# change OUTPUT_FORMAT to 'PNG' below and send the PNGs instead -- I can
# batch-convert to WebP on this end with the sharp-based pipeline this
# project already uses (scripts/compress-images.mjs).
#
# Updated after seeing the first 20 rendered frames: fixed a washed-out
# pink flag (Blender's default AgX view transform was desaturating the
# red) and a blocky/faceted look on the flag surface (it was never told
# to smooth-shade). Safe to just hit Run Script again in the same
# session you already have open -- it cleans up anything it created on
# the previous run before rebuilding, so there's no need to re-import
# the GLB or start fresh.

import bpy
import math
import os
import mathutils

# === CONFIG ===
FRAME_COUNT = 90
OUTPUT_FORMAT = "WEBP"  # fallback: "PNG"
RESOLUTION = (1200, 1500)  # portrait -- matches the pole+flag composition better than landscape, and letterboxes cleanly on wide desktop screens without needing to be cropped
SAMPLES = 128  # Cycles sample count -- decent quality without an extreme render time; raise if you have time to spare and want less noise
POLE_TOP_Z = 6.0  # must match scripts/generate-placeholder-flagpole.py's POLE_HEIGHT
FLAG_CENTER_Z = POLE_TOP_Z - 0.37  # same relative offset the real-time version used
# 7.3, not the original 2.9 -- solved so the flag hits exactly 50% of the
# frame's width (25%-75%, centered) at its most face-on moment in the
# turntable. The flag (2.0 wide x 1.2 tall, wider than tall) doesn't
# match this portrait 1200x1500 frame's own proportions, so hitting an
# exact width target means pulling the camera back at the same lens
# angle rather than zooming in -- zooming in enough to do it at the old
# distance would need a ~85 degree fisheye-wide FOV, which would visibly
# distort the pole's straight edges. One real consequence worth knowing:
# because the flag is proportionally wider than the frame is, filling
# exactly half the WIDTH means it only fills about a quarter of the
# HEIGHT -- there'll be visibly more open space above/below the flag
# than before. If that reads as too much empty space once rendered, the
# fix is RESOLUTION below (a less tall/more square frame), not this
# distance -- say so and it's a quick change.
CAMERA_DISTANCE = 7.3
CAMERA_HEIGHT = FLAG_CENTER_Z  # level with the flag's vertical center, same framing logic as before

blend_dir = os.path.dirname(bpy.data.filepath) or os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(blend_dir, "flagpole_frames")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Safe to re-run in the same Blender session (e.g. after tweaking a
# setting above and running again) -- clears out anything this script
# itself created on a previous run first, so re-running never leaves
# duplicate flags/lights/cameras stacked on top of each other. Doesn't
# touch "Flagpole" or anything from generate-placeholder-flagpole.py.
for name in ("Flag", "KeyLight", "FillLight", "RimLight", "TurntableCam"):
    obj = bpy.data.objects.get(name)
    if obj:
        bpy.data.objects.remove(obj, do_unlink=True)

# --- Render settings ---
scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.samples = SAMPLES
scene.cycles.use_denoising = True
scene.render.resolution_x = RESOLUTION[0]
scene.render.resolution_y = RESOLUTION[1]
scene.render.film_transparent = True  # composites over the site's own background, exactly like the live WebGL version did
scene.render.image_settings.file_format = OUTPUT_FORMAT
if OUTPUT_FORMAT == "WEBP":
    scene.render.image_settings.quality = 88
    scene.render.image_settings.color_mode = "RGBA"

# Blender 4.x's default view transform (AgX) is a filmic/cinematic tone
# curve -- great for realistic lighting, but it desaturates and lightens
# saturated colors on the way to the render, which is exactly why the
# flag's red rendered as a washed-out pink/salmon instead of the actual
# color set below. "Standard" renders colors close to their literal
# values instead, which is what a flat-color branded object like a flag
# actually needs -- color accuracy over cinematic mood.
scene.view_settings.view_transform = "Standard"

# --- UAE flag mesh ---
# Same proportions as WavingFlag.tsx: width 2.0, height 1.2, hoist
# (pole-side) edge pinned at local x=0. Built as a fresh grid so per-
# frame vertex displacement (the ripple) is simple array math, same as
# the JS version.
FLAG_WIDTH = 2.0
FLAG_HEIGHT = 1.2
SEG_X = 32
SEG_Y = 20

flag_mesh = bpy.data.meshes.new("FlagMesh")
flag_obj = bpy.data.objects.new("Flag", flag_mesh)
bpy.context.collection.objects.link(flag_obj)

verts = []
uvs = []
for j in range(SEG_Y + 1):
    v = j / SEG_Y
    y = (v - 0.5) * FLAG_HEIGHT
    for i in range(SEG_X + 1):
        u = i / SEG_X
        x = u * FLAG_WIDTH
        verts.append((x, y, 0.0))
        uvs.append((u, v))

faces = []
for j in range(SEG_Y):
    for i in range(SEG_X):
        a = j * (SEG_X + 1) + i
        b = a + 1
        c = a + (SEG_X + 1)
        d = c + 1
        faces.append((a, b, d, c))

flag_mesh.from_pydata(verts, [], faces)
flag_mesh.update()

# Blender defaults new meshes to flat shading -- each of the 32x20 grid
# faces above would render as its own uniform-lit facet, with a visible
# hard edge between every one of them. Since the ripple animation tilts
# each face at a slightly different angle every frame, that reads as
# exactly the blocky, low-poly "every pixel visible" look reported live
# -- not a resolution problem, a shading-mode one. Smooth shading blends
# lighting across shared vertices instead, the standard fix.
for poly in flag_mesh.polygons:
    poly.use_smooth = True

uv_layer = flag_mesh.uv_layers.new(name="UVMap")
for poly in flag_mesh.polygons:
    for li in poly.loop_indices:
        vi = flag_mesh.loops[li].vertex_index
        uv_layer.data[li].uv = uvs[vi]

# Position: hoist edge at the pole surface, vertical center at the same
# height the real-time version used.
flag_obj.location = (0.045, 0.0, FLAG_CENTER_Z)
flag_obj.rotation_euler = (math.radians(90), 0, 0)  # mesh was built in the XY plane; rotate so it stands upright (X=hoist->fly, Z=up)

# --- UAE flag material: same exact proportions/colors as the procedural
# canvas texture in WavingFlag.tsx (red hoist-side quarter, green/white/
# black horizontal thirds across the rest) -- built from an image so it
# renders and lights properly under Cycles, rather than a flat vertex-
# color hack.
flag_img = bpy.data.images.new("UaeFlagTexture", width=512, height=307, alpha=False)
pixels = [0.0] * (512 * 307 * 4)
hoist_w = int(512 * 0.25)
stripe_h = 307 / 3
red = (0.808, 0.067, 0.149, 1.0)
green = (0.0, 0.451, 0.184, 1.0)
white = (1.0, 1.0, 1.0, 1.0)
black = (0.0, 0.0, 0.0, 1.0)
for y in range(307):
    for x in range(512):
        idx = (y * 512 + x) * 4
        if x < hoist_w:
            col = red
        elif y < stripe_h:
            col = green
        elif y < stripe_h * 2:
            col = white
        else:
            col = black
        pixels[idx : idx + 4] = col
flag_img.pixels = pixels
flag_img.pack()

flag_mat = bpy.data.materials.new(name="UaeFlag")
flag_mat.use_nodes = True
flag_mat.use_backface_culling = False
nodes = flag_mat.node_tree.nodes
links = flag_mat.node_tree.links
bsdf = nodes["Principled BSDF"]
bsdf.inputs["Roughness"].default_value = 0.65
bsdf.inputs["Metallic"].default_value = 0.0
tex_node = nodes.new("ShaderNodeTexImage")
tex_node.image = flag_img
links.new(tex_node.outputs["Color"], bsdf.inputs["Base Color"])
flag_obj.data.materials.append(flag_mat)

# --- Ripple animation: same 3-wave formula as WavingFlag.tsx, driven by
# frame index instead of a live clock. Applied once per rendered frame,
# below, right before that frame renders.
RIPPLE_AMPLITUDE = 0.1


def apply_ripple(t: float):
    mesh = flag_obj.data
    for k, v in enumerate(mesh.vertices):
        x, y, _ = verts[k]
        taper = x / FLAG_WIDTH
        wave1 = math.sin(x * 5.5 - t * 2.6 + y * 1.4)
        wave2 = math.sin(x * 8.5 - t * 4.1 + y * 0.6) * 0.5
        wave3 = math.sin(x * 3.2 - t * 1.7 + y * 2.4) * 0.35
        sag = -0.05 * taper * taper
        v.co.z = (wave1 + wave2 + wave3) * RIPPLE_AMPLITUDE * taper + sag
    mesh.update()


# --- Studio 3-point light rig -- this is the fix for the flat/plastic
# look: the live WebGL version had two directional lights and nothing
# else, no reflections, no soft falloff.
def add_area_light(name, location, energy, size):
    light_data = bpy.data.lights.new(name=name, type="AREA")
    light_data.energy = energy
    light_data.size = size
    obj = bpy.data.objects.new(name=name, object_data=light_data)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    return obj


def point_at(obj, target):
    direction = mathutils.Vector(target) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


# The camera aims at the flag's own horizontal center, not the pole's
# axis (x=0) -- aiming at the pole is exactly why the flag rendered off
# to one side instead of centered: the flag extends outward from the
# pole, it isn't centered on it. This target stays fixed in world space
# for the whole orbit below (the pole+flag never move; only the camera
# circles around the pole's own axis, which is the physically correct
# way for a flagpole to "rotate in place") -- pointing at this fixed
# point every frame is what keeps the flag centered in every single
# frame, not just some of them.
FLAG_CENTER_X = 0.045 + FLAG_WIDTH / 2
target_point = (FLAG_CENTER_X, 0, FLAG_CENTER_Z)
key = add_area_light("KeyLight", (2.6, -2.6, FLAG_CENTER_Z + 2.0), 900, 2.0)
fill = add_area_light("FillLight", (-3.0, -1.0, FLAG_CENTER_Z + 0.5), 300, 3.0)
rim = add_area_light("RimLight", (0, 2.8, FLAG_CENTER_Z + 1.5), 500, 1.5)
for light in (key, fill, rim):
    point_at(light, target_point)

# A soft neutral world background lights up reflections a little further
# without needing a downloaded HDRI -- keeps metal from reading as flat.
world = scene.world or bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes.get("Background")
if bg:
    bg.inputs[0].default_value = (0.65, 0.68, 0.72, 1.0)
    bg.inputs[1].default_value = 0.4

# --- Camera: fixed turntable orbit around the vertical (Z) axis, same
# "flag fills the frame, pole crops below" composition as the real-time
# version, just baked exactly instead of computed live per aspect ratio.
camera_data = bpy.data.cameras.new("TurntableCam")
camera_data.lens_unit = "FOV"
camera_data.angle = math.radians(38)
camera_obj = bpy.data.objects.new("TurntableCam", camera_data)
bpy.context.collection.objects.link(camera_obj)
scene.camera = camera_obj

for frame_i in range(FRAME_COUNT):
    angle = (frame_i / FRAME_COUNT) * 2 * math.pi
    x = CAMERA_DISTANCE * math.sin(angle)
    y = -CAMERA_DISTANCE * math.cos(angle)
    camera_obj.location = (x, y, CAMERA_HEIGHT)
    point_at(camera_obj, target_point)

    apply_ripple(frame_i / FRAME_COUNT * 2 * math.pi * 3)  # a few ripple cycles over the full turn so it doesn't look static

    ext = "webp" if OUTPUT_FORMAT == "WEBP" else "png"
    scene.render.filepath = os.path.join(OUTPUT_DIR, f"frame-{frame_i + 1:03d}.{ext}")
    bpy.ops.render.render(write_still=True)
    print(f"Rendered frame {frame_i + 1}/{FRAME_COUNT}")

print(f"Done -- {FRAME_COUNT} frames written to {OUTPUT_DIR}")
