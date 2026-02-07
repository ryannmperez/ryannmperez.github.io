"""
Render alpha-synuclein PET scaffolds using PyMOL.

Ball-and-stick representation, transparent background,
24 frames per molecule (15° rotation each = 360°).

Carbon atoms colored per molecule:
  BV-21    → #58a6ff (blue)
  TZ61-84  → #a371f7 (purple)
  BF-2846  → #f778ba (pink)

Standard heteroatom colors: O=red, N=blue, S=yellow, I=purple

Run in manim_env:
  conda run -n manim_env python scripts/render_scaffolds.py
"""

import os
import pymol
from pymol import cmd

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SDF_DIR = os.path.join(SCRIPT_DIR, "frames", "sdf")
OUTPUT_BASE = os.path.join(SCRIPT_DIR, "frames", "scaffolds")

NUM_FRAMES = 72
ROTATION_STEP = 360.0 / NUM_FRAMES  # 5°
RESOLUTION = 500  # render resolution per frame

MOLECULES = {
    "BV-21": [0.345, 0.651, 1.000],      # #58a6ff
    "TZ61-84": [0.639, 0.443, 0.969],    # #a371f7
    "BF-2846": [0.969, 0.471, 0.729],    # #f778ba
}


def hex_to_rgb_list(hex_color: str) -> list:
    h = hex_color.lstrip("#")
    return [int(h[i:i+2], 16) / 255.0 for i in (0, 2, 4)]


def render_molecule(name: str, carbon_rgb: list):
    sdf_path = os.path.join(SDF_DIR, f"{name}.sdf")
    out_dir = os.path.join(OUTPUT_BASE, name)
    os.makedirs(out_dir, exist_ok=True)

    cmd.reinitialize()

    # Scene settings
    cmd.set("ray_opaque_background", 0)
    cmd.set("ray_trace_mode", 1)
    cmd.set("antialias", 2)
    cmd.set("ray_shadows", 0)
    cmd.set("ambient", 0.45)
    cmd.set("direct", 0.65)
    cmd.set("specular", 0.4)
    cmd.set("ray_trace_gain", 0.1)
    cmd.bg_color("black")
    cmd.set("opaque_background", 0)

    # Load SDF
    cmd.load(sdf_path, name)

    # Remove hydrogens for cleaner look
    cmd.remove("hydro")

    # Ball-and-stick representation
    cmd.hide("everything")
    cmd.show("sticks", name)
    cmd.show("spheres", name)
    cmd.set("stick_radius", 0.18, name)
    cmd.set("sphere_scale", 0.35, name)

    # Color carbons with molecule accent color
    cmd.set_color(f"{name}_carbon", carbon_rgb)
    cmd.color(f"{name}_carbon", f"{name} and elem C")

    # Standard heteroatom colors
    cmd.color("red", f"{name} and elem O")
    cmd.color("tv_blue", f"{name} and elem N")
    cmd.color("tv_yellow", f"{name} and elem S")
    cmd.color("purple", f"{name} and elem I")

    # Zoom out enough so molecule fits at all rotation angles
    cmd.zoom(name, buffer=4.0)
    cmd.clip("atoms", 20)

    # Render rotation frames
    for i in range(NUM_FRAMES):
        if i > 0:
            cmd.turn("y", ROTATION_STEP)
        output_path = os.path.join(out_dir, f"frame_{i:03d}.png")
        cmd.ray(RESOLUTION, RESOLUTION)
        cmd.png(output_path, dpi=150)
        print(f"  {name} frame {i+1}/{NUM_FRAMES}")


def main():
    os.makedirs(OUTPUT_BASE, exist_ok=True)
    print("Rendering scaffold frames...")
    for name, rgb in MOLECULES.items():
        print(f"\n  Molecule: {name}")
        render_molecule(name, rgb)
    print("\nDone!")


if __name__ == "__main__":
    pymol.finish_launching(["pymol", "-cq"])
    main()
    cmd.quit()
