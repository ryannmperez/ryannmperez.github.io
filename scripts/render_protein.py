"""
Render protein frames using PyMOL for the HintToken animation.

Uses Trp-cage (PDB: 1L2Y) — a small 20-residue protein.
Generates rotation frames with and without mutation-site highlighting.
"""

import os
import sys

# PyMOL must be imported and launched in headless mode
import pymol
from pymol import cmd

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
HIGHLIGHTED_DIR = os.path.join(SCRIPT_DIR, "frames", "highlighted")
PLAIN_DIR = os.path.join(SCRIPT_DIR, "frames", "plain")
NUM_FRAMES = 20
RESOLUTION = 400
MUTATION_RESIDUE = 5  # Residue to highlight as mutation site


def setup_scene():
    """Common scene setup for both render passes."""
    cmd.reinitialize()
    cmd.set("ray_opaque_background", 0)  # Transparent background
    cmd.set("ray_trace_mode", 1)  # Better quality
    cmd.set("antialias", 2)
    cmd.set("ray_shadows", 0)  # Clean look without shadows
    cmd.set("ambient", 0.5)
    cmd.set("direct", 0.6)
    cmd.set("specular", 0.3)
    cmd.set("ray_trace_gain", 0.1)

    # Fetch protein
    cmd.fetch("1L2Y", type="pdb")
    # Use only the first state (NMR structures have multiple states)
    cmd.set("state", 1)
    # Remove solvent
    cmd.remove("solvent")
    # Show cartoon representation
    cmd.hide("everything")
    cmd.show("cartoon", "1L2Y")
    # Zoom to fit
    cmd.zoom("1L2Y", buffer=2)


def render_highlighted():
    """Render protein with mutation site highlighted in yellow."""
    setup_scene()

    # Color protein light blue
    cmd.color("lightblue", "1L2Y")

    # Highlight mutation residue in yellow
    mutation_sel = f"resi {MUTATION_RESIDUE}"
    cmd.color("yellow", mutation_sel)

    # Add transparent yellow sphere around mutation site
    cmd.show("spheres", mutation_sel)
    cmd.set("sphere_transparency", 0.55, mutation_sel)
    cmd.set("sphere_scale", 1.2, mutation_sel)
    cmd.color("yellow", f"{mutation_sel} and name CA")

    # Also show sticks for the highlighted residue for more detail
    cmd.show("sticks", mutation_sel)
    cmd.set("stick_radius", 0.15, mutation_sel)
    cmd.color("tv_yellow", f"{mutation_sel} and rep sticks")

    # Render rotation frames
    for i in range(NUM_FRAMES):
        angle = (360.0 / NUM_FRAMES) * i
        cmd.turn("y", 360.0 / NUM_FRAMES if i > 0 else 0)
        output_path = os.path.join(HIGHLIGHTED_DIR, f"frame_{i:03d}.png")
        cmd.ray(RESOLUTION, RESOLUTION)
        cmd.png(output_path, dpi=150)
        print(f"  Highlighted frame {i+1}/{NUM_FRAMES}")


def render_plain():
    """Render protein with uniform coloring (no highlight)."""
    setup_scene()

    # Color protein uniform gray/light blue
    cmd.color("gray70", "1L2Y")

    # Render rotation frames
    for i in range(NUM_FRAMES):
        angle = (360.0 / NUM_FRAMES) * i
        cmd.turn("y", 360.0 / NUM_FRAMES if i > 0 else 0)
        output_path = os.path.join(PLAIN_DIR, f"frame_{i:03d}.png")
        cmd.ray(RESOLUTION, RESOLUTION)
        cmd.png(output_path, dpi=150)
        print(f"  Plain frame {i+1}/{NUM_FRAMES}")


def main():
    # Ensure output dirs exist
    os.makedirs(HIGHLIGHTED_DIR, exist_ok=True)
    os.makedirs(PLAIN_DIR, exist_ok=True)

    print("Rendering highlighted protein frames...")
    render_highlighted()

    print("Rendering plain protein frames...")
    render_plain()

    print(f"Done! Frames saved to {HIGHLIGHTED_DIR} and {PLAIN_DIR}")


if __name__ == "__main__":
    # Launch PyMOL in headless mode
    pymol.finish_launching(["pymol", "-cq"])
    main()
    cmd.quit()
