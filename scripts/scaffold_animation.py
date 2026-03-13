"""
Alpha-Synuclein PET Scaffold Animation — Manim Scene

Shows 3 drug scaffolds (BV-21, TZ61-84, BF-2846) side-by-side,
all rotating 360° simultaneously. Title permanently at the bottom.
Seamless loop — no fade in/out.

Render:
  conda run -n manim_env manim -r 640,360 --fps 15 scripts/scaffold_animation.py ScaffoldScene
"""

from manim import *
import os
import glob as glob_module

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SCAFFOLDS_DIR = os.path.join(SCRIPT_DIR, "frames", "scaffolds")

# Portfolio website palette
BG_COLOR = "#0a0f1a"
CARD_BG = "#111827"
BORDER_COLOR = "#30363d"
TEXT_PRIMARY = "#f5f0e8"
TEXT_MUTED = "#8b949e"
TEAL = "#2dd4bf"
GOLD = "#d4a574"
ROSE = "#c9787c"

MOLECULES = [
    {"name": "BV-21", "color": TEAL},
    {"name": "TZ61-84", "color": GOLD},
    {"name": "BF-2846", "color": ROSE},
]

POSITIONS = [LEFT * 3.8, ORIGIN, RIGHT * 3.8]


class ScaffoldScene(Scene):
    def construct(self):
        self.camera.background_color = BG_COLOR

        # ── Permanent title at the bottom ──
        title = Text(
            "Alpha-Synuclein PET Scaffolds",
            font_size=38,
            color=TEAL,
            weight=BOLD,
        )
        subtitle = Text(
            "for Machine Learning",
            font_size=28,
            color=TEXT_PRIMARY,
        )
        title.to_edge(DOWN, buff=0.55)
        subtitle.next_to(title, DOWN, buff=0.12)

        # ── Load all frames ──
        all_frames = {}
        for mol in MOLECULES:
            pattern = os.path.join(SCAFFOLDS_DIR, mol["name"], "frame_*.png")
            all_frames[mol["name"]] = sorted(glob_module.glob(pattern))

        num_frames = min(len(f) for f in all_frames.values() if f)

        # ── Build initial images and labels ──
        images = []
        labels = []
        for mol, pos in zip(MOLECULES, POSITIONS):
            frames = all_frames[mol["name"]]
            img = ImageMobject(frames[0]).set(height=4.2)
            img.move_to(pos + UP * 0.8)

            lbl = Text(mol["name"], font_size=24, color=mol["color"], weight=BOLD)
            lbl.next_to(img, DOWN, buff=0.15)

            images.append(img)
            labels.append(lbl)

        # ── Add everything immediately (no fade) ──
        self.add(title, subtitle)
        for img, lbl in zip(images, labels):
            self.add(img, lbl)

        # Hold first frame briefly
        self.wait(0.3)

        # ── Single slow rotation ──
        prev_images = list(images)
        for fi in range(1, num_frames):
            new_images = []
            for mi, mol in enumerate(MOLECULES):
                frames = all_frames[mol["name"]]
                new_img = ImageMobject(frames[fi]).set(height=4.2)
                new_img.move_to(POSITIONS[mi] + UP * 0.8)
                new_images.append(new_img)

            for old in prev_images:
                self.remove(old)
            for new in new_images:
                self.add(new)
            self.wait(1 / 9)
            prev_images = new_images

        self.wait(0.3)
