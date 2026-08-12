# Generates the flagpole shaft + finial for the scroll-driven showcase
# (components/home/FlagpoleModel.tsx) directly in Blender -- no AI
# generator, no account, no paywall. The object is simple enough (a
# tapered cylinder + a small sphere) that hand-modeling it beats relying
# on an AI tool's guesswork, and Blender exports glTF/GLB natively for
# free regardless of plan.
#
# The flag itself is NOT part of this model on purpose -- it's built
# procedurally in code (components/home/WavingFlag.tsx: real-time ripple,
# guaranteed-correct UAE flag colors/proportions) rather than as part of
# the mesh. AI 3D generators are unreliable at thin cloth geometry anyway,
# so this split was the plan from the start, not a workaround.
#
# How to use:
#   1. Install Blender (free, blender.org) if you don't have it.
#   2. Open Blender, click the "Scripting" tab along the top.
#   3. Open this file (or paste its contents) into the text editor pane.
#   4. Click "Run Script" (or Alt+P) -- this clears the scene and builds
#      the pole + finial with a brushed-aluminum / gold material already
#      applied.
#   5. Optional: tweak proportions or colors in the Properties panel if
#      you want a different look before exporting.
#   6. File > Export > glTF 2.0 (.glb/.gltf), format ".glb" (binary),
#      leave the default export settings (Apply Modifiers stays checked),
#      save as flagpole.glb.
#   7. Send that file over, or drop it into public/models/flagpole.glb
#      yourself -- either way, the only code change needed afterward is
#      flipping FLAGPOLE_MODEL_PATH in FlagpoleModel.tsx to that path.

import bpy

# Clear the default scene (cube, etc.)
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete()

# --- Flagpole shaft: a tapered cylinder (a "cone" with two different
# radii is a frustum -- exactly a tapered pole). Base sits at world
# origin, pole rises 6m.
POLE_HEIGHT = 6.0
bpy.ops.mesh.primitive_cone_add(
    vertices=48,
    radius1=0.09,  # base radius, ~18cm diameter
    radius2=0.03,  # top radius, ~6cm diameter
    depth=POLE_HEIGHT,
    location=(0, 0, POLE_HEIGHT / 2),
)
pole = bpy.context.object
pole.name = "FlagpoleShaft"

# Slight bevel so edges read as manufactured metal, not a raw CSG
# primitive -- a real extruded/machined pole always has some edge radius.
bevel = pole.modifiers.new(name="Bevel", type="BEVEL")
bevel.width = 0.004
bevel.segments = 3

bpy.ops.object.shade_smooth()

mat_aluminum = bpy.data.materials.new(name="BrushedAluminum")
mat_aluminum.use_nodes = True
bsdf = mat_aluminum.node_tree.nodes["Principled BSDF"]
bsdf.inputs["Base Color"].default_value = (0.78, 0.79, 0.81, 1.0)
bsdf.inputs["Metallic"].default_value = 0.85
bsdf.inputs["Roughness"].default_value = 0.35
pole.data.materials.append(mat_aluminum)

# --- Finial: small ball on top, matching the placeholder's proportions
# in FlagpoleModel.tsx.
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.045, location=(0, 0, POLE_HEIGHT + 0.05))
finial = bpy.context.object
finial.name = "Finial"
bpy.ops.object.shade_smooth()

mat_gold = bpy.data.materials.new(name="GoldFinial")
mat_gold.use_nodes = True
bsdf_gold = mat_gold.node_tree.nodes["Principled BSDF"]
bsdf_gold.inputs["Base Color"].default_value = (0.83, 0.68, 0.21, 1.0)
bsdf_gold.inputs["Metallic"].default_value = 0.9
bsdf_gold.inputs["Roughness"].default_value = 0.25
finial.data.materials.append(mat_gold)

# Join into a single object for a clean, simple export.
bpy.ops.object.select_all(action="DESELECT")
pole.select_set(True)
finial.select_set(True)
bpy.context.view_layer.objects.active = pole
bpy.ops.object.join()
pole.name = "Flagpole"

print("Flagpole shaft + finial built. Now: File > Export > glTF 2.0 (.glb).")
