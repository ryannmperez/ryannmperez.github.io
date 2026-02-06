"""
HintToken Learning Animation — Manim Scene

Tells the story of hint token augmentation for protein stability prediction:
1. Protein with highlighted mutation site vs. plain protein
2. Original sequence → mutated sequence (V→A)
3. Hint token insertion
4. Tokenization (vectors: [21 14 30 6 31 19 21])
5. Model input (ProtBERT) — vectors slide behind model
6. ΔΔG prediction comparison
"""

from manim import *
import os
import glob as glob_module

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
HIGHLIGHTED_DIR = os.path.join(SCRIPT_DIR, "frames", "highlighted")
PLAIN_DIR = os.path.join(SCRIPT_DIR, "frames", "plain")

# ── Portfolio website color palette ──
BG_COLOR = "#0d1117"
CARD_BG = "#161b22"
BORDER_COLOR = "#30363d"
TEXT_PRIMARY = "#c9d1d9"
TEXT_MUTED = "#8b949e"
ACCENT_BLUE = "#58a6ff"
ACCENT_PURPLE = "#a371f7"
ACCENT_PINK = "#f778ba"
ACCURATE_GREEN = "#3fb950"
INACCURATE_RED = "#f85149"
HINT_YELLOW = "#FFD700"


class HintTokenScene(Scene):
    def construct(self):
        self.camera.background_color = BG_COLOR

        highlighted_frames = self._load_frames(HIGHLIGHTED_DIR)
        plain_frames = self._load_frames(PLAIN_DIR)

        self.part_a_protein_intro(highlighted_frames, plain_frames)
        self.part_b_sequence_extraction()
        self.part_c_hint_token_insertion()
        self.part_d_tokenization()
        self.part_e_model_input()
        self.part_f_prediction_comparison()

    def _load_frames(self, directory):
        pattern = os.path.join(directory, "frame_*.png")
        return sorted(glob_module.glob(pattern))

    def _create_protein_image(self, frame_path, height=3.0):
        if frame_path and os.path.exists(frame_path):
            return ImageMobject(frame_path).set(height=height)
        return Circle(radius=height / 2, color=WHITE, fill_opacity=0.1)

    # ─────────────────────────────────────────────────────────────
    # Part A: Protein Introduction
    # ─────────────────────────────────────────────────────────────
    def part_a_protein_intro(self, highlighted_frames, plain_frames):
        title = Text("HintToken Learning", font_size=44, color=ACCENT_BLUE, weight=BOLD)
        subtitle = Text(
            "Improving ΔΔG Prediction with Hint Token Augmentation",
            font_size=24, color=TEXT_PRIMARY,
        )
        title.to_edge(UP, buff=0.35)
        subtitle.next_to(title, DOWN, buff=0.15)
        self.play(Write(title), FadeIn(subtitle, shift=UP * 0.2), run_time=1.5)

        left_pos = LEFT * 3
        right_pos = RIGHT * 3

        if highlighted_frames:
            left_protein = self._create_protein_image(highlighted_frames[0], height=3.0)
        else:
            left_protein = Circle(radius=1.5, color=ACCENT_PURPLE, fill_opacity=0.15)
        left_protein.move_to(left_pos + DOWN * 0.3)

        if plain_frames:
            right_protein = self._create_protein_image(plain_frames[0], height=3.0)
        else:
            right_protein = Circle(radius=1.5, color=TEXT_MUTED, fill_opacity=0.15)
        right_protein.move_to(right_pos + DOWN * 0.3)

        left_label = Text("With Hint Tokens", font_size=24, color=ACCENT_PURPLE, weight=BOLD)
        left_label.next_to(left_protein, DOWN, buff=0.3)
        right_label = Text("Without Hint Tokens", font_size=24, color=TEXT_MUTED, weight=BOLD)
        right_label.next_to(right_protein, DOWN, buff=0.3)

        glow = Circle(radius=1.6, color=ACCENT_PURPLE, fill_opacity=0.08, stroke_width=2)
        glow.move_to(left_protein.get_center())

        self.play(
            FadeIn(left_protein, shift=UP * 0.3),
            FadeIn(right_protein, shift=UP * 0.3),
            run_time=1.0,
        )
        self.play(Write(left_label), Write(right_label), FadeIn(glow), run_time=1.0)

        # Smooth rotation — swap frames without cross-fade to avoid flicker
        if highlighted_frames and len(highlighted_frames) > 1:
            prev_h = left_protein
            prev_p = right_protein
            # Use every frame for smooth rotation, short wait between swaps
            for i in range(1, len(highlighted_frames)):
                new_h = self._create_protein_image(highlighted_frames[i], height=3.0)
                new_h.move_to(left_pos + DOWN * 0.3)
                pi = min(i, len(plain_frames) - 1)
                new_p = self._create_protein_image(plain_frames[pi], height=3.0)
                new_p.move_to(right_pos + DOWN * 0.3)
                # Instant swap — no cross-fade, no flicker
                self.remove(prev_h, prev_p)
                self.add(new_h, new_p)
                self.wait(0.18)
                prev_h = new_h
                prev_p = new_p
            left_protein = prev_h
            right_protein = prev_p

        # Pulse glow
        self.play(
            glow.animate.scale(1.15).set_opacity(0.18),
            rate_func=there_and_back, run_time=0.8,
        )

        self.title = title
        self.subtitle = subtitle
        self.left_protein = left_protein
        self.right_protein = right_protein
        self.left_label = left_label
        self.right_label = right_label
        self.glow = glow

    # ─────────────────────────────────────────────────────────────
    # Part B: Sequence Extraction — show V→A mutation
    # ─────────────────────────────────────────────────────────────
    def part_b_sequence_extraction(self):
        # Fade out glow circle first, before moving proteins to corners
        self.play(FadeOut(self.glow), run_time=0.5)

        # Then shrink proteins to top corners
        self.play(
            self.left_protein.animate.scale(0.6).move_to(UP * 3.0 + LEFT * 5.0),
            self.right_protein.animate.scale(0.6).move_to(UP * 3.0 + RIGHT * 5.0),
            self.left_label.animate.scale(0.75).move_to(UP * 2.1 + LEFT * 5.0),
            self.right_label.animate.scale(0.75).move_to(UP * 2.1 + RIGHT * 5.0),
            FadeOut(self.title),
            FadeOut(self.subtitle),
            run_time=1.2,
        )

        # --- Show ORIGINAL sequence first: M D V F M ---
        original_residues = ["M", "D", "V", "F", "M"]
        mutation_idx = 2  # V at index 2

        orig_letters = VGroup()
        for r in original_residues:
            letter = Text(r, font_size=44, color=TEXT_PRIMARY, font="Monospace", weight=BOLD)
            orig_letters.add(letter)
        orig_letters.arrange(RIGHT, buff=0.4)
        orig_letters.move_to(UP * 0.5)

        orig_label = Text("Original Sequence", font_size=26, color=TEXT_MUTED)
        orig_label.next_to(orig_letters, UP, buff=0.35)

        self.play(FadeIn(orig_label), run_time=0.6)
        self.play(
            LaggedStart(*[FadeIn(l, shift=DOWN * 0.2) for l in orig_letters], lag_ratio=0.15),
            run_time=1.5,
        )
        self.wait(0.8)

        # --- Animate V→A mutation ---
        mutation_note = Text("V → A mutation at position 3", font_size=24, color=ACCENT_PINK)
        mutation_note.next_to(orig_letters, DOWN, buff=0.5)

        arrow_to_v = Arrow(
            mutation_note.get_top(), orig_letters[mutation_idx].get_bottom(),
            buff=0.1, color=ACCENT_PINK, stroke_width=6,
            max_tip_length_to_length_ratio=0.3,
            tip_length=0.25,
        )
        self.play(FadeIn(mutation_note), GrowArrow(arrow_to_v), run_time=1.0)
        self.wait(0.6)

        new_a = Text("A", font_size=44, color=ACCENT_PURPLE, font="Monospace", weight=BOLD)
        new_a.move_to(orig_letters[mutation_idx].get_center())
        self.play(
            FadeOut(orig_letters[mutation_idx], shift=UP * 0.3),
            FadeIn(new_a, shift=DOWN * 0.3),
            run_time=0.8,
        )
        orig_letters.submobjects[mutation_idx] = new_a

        self.wait(0.5)

        # --- Split into two paths ---
        self.play(
            FadeOut(mutation_note), FadeOut(arrow_to_v), FadeOut(orig_label),
            run_time=0.6,
        )

        self.play(orig_letters.animate.move_to(LEFT * 3.2 + UP * 0.5), run_time=0.8)

        mutated_residues = ["M", "D", "A", "F", "M"]
        right_letters = VGroup()
        for r in mutated_residues:
            letter = Text(r, font_size=44, color=TEXT_PRIMARY, font="Monospace", weight=BOLD)
            right_letters.add(letter)
        right_letters.arrange(RIGHT, buff=0.4)
        right_letters.move_to(RIGHT * 3.2 + UP * 0.5)

        left_seq_label = Text("Hint Token Path", font_size=24, color=ACCENT_PURPLE)
        left_seq_label.next_to(orig_letters, UP, buff=0.3)
        right_seq_label = Text("Standard Path", font_size=24, color=TEXT_MUTED)
        right_seq_label.next_to(right_letters, UP, buff=0.3)

        self.play(
            FadeIn(right_letters, shift=LEFT * 0.3),
            FadeIn(left_seq_label), FadeIn(right_seq_label),
            run_time=1.0,
        )
        self.wait(0.6)

        self.left_letters = orig_letters
        self.right_letters = right_letters
        self.left_seq_label = left_seq_label
        self.right_seq_label = right_seq_label

    # ─────────────────────────────────────────────────────────────
    # Part C: Hint Token Insertion
    # ─────────────────────────────────────────────────────────────
    def part_c_hint_token_insertion(self):
        mut_start = Text("[MUTₛ]", font_size=32, color=HINT_YELLOW, weight=BOLD)
        mut_end = Text("[MUTₑ]", font_size=32, color=HINT_YELLOW, weight=BOLD)

        a_pos = self.left_letters[2].get_center()

        tokens_and_letters = []
        for i, letter in enumerate(self.left_letters):
            if i == 2:
                tokens_and_letters.append(mut_start)
            tokens_and_letters.append(letter)
            if i == 2:
                tokens_and_letters.append(mut_end)

        buff_val = 0.18
        total_width = sum(m.width + buff_val for m in tokens_and_letters) - buff_val
        start_x = self.left_letters.get_center()[0] - total_width / 2
        current_x = start_x

        target_positions = []
        for m in tokens_and_letters:
            target_x = current_x + m.width / 2
            target_positions.append(
                np.array([target_x, self.left_letters.get_center()[1], 0])
            )
            current_x += m.width + buff_val

        mut_start.move_to(a_pos + LEFT * 3 + UP * 0.5).set_opacity(0)
        mut_end.move_to(a_pos + RIGHT * 3 + UP * 0.5).set_opacity(0)
        self.add(mut_start, mut_end)

        anims = []
        for mob, target in zip(tokens_and_letters, target_positions):
            if mob in (mut_start, mut_end):
                anims.append(mob.animate.move_to(target).set_opacity(1))
            else:
                anims.append(mob.animate.move_to(target))

        self.play(*anims, run_time=2.0)

        # Subtle glow — small, doesn't overlap text
        for token in [mut_start, mut_end]:
            glow = Circle(radius=0.25, color=HINT_YELLOW, fill_opacity=0.2, stroke_width=1)
            glow.move_to(token.get_center())
            self.play(FadeIn(glow), run_time=0.2)
            self.play(glow.animate.scale(1.5).set_opacity(0), run_time=0.4)
            self.remove(glow)

        aug_label = Text("Augmented with hint tokens", font_size=22, color=HINT_YELLOW)
        aug_label.next_to(VGroup(*tokens_and_letters), DOWN, buff=0.35)
        no_aug_label = Text("No augmentation", font_size=22, color=TEXT_MUTED)
        no_aug_label.next_to(self.right_letters, DOWN, buff=0.35)

        self.play(FadeIn(aug_label), FadeIn(no_aug_label), run_time=0.7)
        self.wait(1.0)

        self.mut_start = mut_start
        self.mut_end = mut_end
        self.aug_label = aug_label
        self.no_aug_label = no_aug_label
        self.augmented_tokens = tokens_and_letters

    # ─────────────────────────────────────────────────────────────
    # Part D: Tokenization — single vector per path
    # ─────────────────────────────────────────────────────────────
    def part_d_tokenization(self):
        # Single vector strings with yellow-highlighted hint token IDs
        left_vec_str = "[21  14  30  6  31  19  21]"
        right_vec_str = "[21  14  6  19  21]"

        left_vec = Text(
            left_vec_str, font_size=28, font="Monospace", weight=BOLD,
            color=TEXT_PRIMARY,
            t2c={"30": HINT_YELLOW, "31": HINT_YELLOW},
        )
        left_vec.move_to(LEFT * 3.2 + UP * 0.5)

        right_vec = Text(
            right_vec_str, font_size=28, font="Monospace", weight=BOLD,
            color=TEXT_PRIMARY,
        )
        right_vec.move_to(RIGHT * 3.2 + UP * 0.5)

        token_label = Text("Token Vectors", font_size=26, color=TEXT_MUTED)
        token_label.move_to(UP * 1.5)

        # Fade out labels, show token label
        self.play(
            FadeOut(self.aug_label), FadeOut(self.no_aug_label),
            FadeOut(self.left_seq_label), FadeOut(self.right_seq_label),
            FadeIn(token_label),
            run_time=1.0,
        )

        # Smooth morph from letter sequences to token vectors
        self.play(
            ReplacementTransform(VGroup(*self.augmented_tokens), left_vec),
            ReplacementTransform(self.right_letters, right_vec),
            run_time=2.0,
            rate_func=smooth,
        )

        # Brief glow on the full hint-token vector
        hint_glow = SurroundingRectangle(
            left_vec, color=HINT_YELLOW, buff=0.1, corner_radius=0.08,
            stroke_width=2,
        )
        self.play(Create(hint_glow), run_time=0.5)
        self.play(hint_glow.animate.set_opacity(0), run_time=0.6)
        self.remove(hint_glow)
        self.wait(0.5)

        self.left_vec = left_vec
        self.right_vec = right_vec
        self.token_label = token_label

    # ─────────────────────────────────────────────────────────────
    # Part E: Model Input — Neural Network ProtBERT
    # ─────────────────────────────────────────────────────────────
    def part_e_model_input(self):
        # ── Build neural network diagram ──
        model_box = RoundedRectangle(
            width=5.0, height=2.4, corner_radius=0.2,
            color=ACCENT_BLUE, fill_opacity=0.08, stroke_width=2,
        )
        model_box.move_to(DOWN * 1.5)

        # Label above the box so it doesn't overlap with nodes
        model_label = Text("ProtBERT", font_size=30, color=TEXT_PRIMARY, weight=BOLD)
        model_label.next_to(model_box, UP, buff=0.1)

        # Neural network: 3 layers of nodes with connections
        layer_sizes = [4, 6, 4]
        layer_x_positions = [-1.2, 0, 1.2]
        node_radius = 0.1
        nn_nodes = VGroup()
        nn_connections = VGroup()
        layers_nodes = []

        for li, (n_nodes, lx) in enumerate(zip(layer_sizes, layer_x_positions)):
            layer = VGroup()
            spacing = 0.35
            start_y = -(n_nodes - 1) * spacing / 2
            for ni in range(n_nodes):
                node = Circle(
                    radius=node_radius,
                    color=ACCENT_BLUE if li == 1 else ACCENT_PURPLE,
                    fill_opacity=0.5, stroke_width=1.5,
                )
                node.move_to(model_box.get_center() +
                             RIGHT * lx + UP * (start_y + ni * spacing))
                layer.add(node)
            layers_nodes.append(layer)
            nn_nodes.add(layer)

        for li in range(len(layers_nodes) - 1):
            for n1 in layers_nodes[li]:
                for n2 in layers_nodes[li + 1]:
                    line = Line(
                        n1.get_center(), n2.get_center(),
                        color=BORDER_COLOR, stroke_width=0.8, stroke_opacity=0.5,
                    )
                    nn_connections.add(line)

        nn_group = VGroup(nn_connections, nn_nodes)
        model_group = VGroup(model_box, model_label, nn_group)

        self.play(FadeIn(model_group, shift=UP * 0.3), run_time=1.0)
        self.wait(0.3)

        # ── Vectors shrink and disappear behind model ──
        self.play(
            self.left_vec.animate.move_to(model_box.get_center()).scale(0.3),
            self.right_vec.animate.move_to(model_box.get_center()).scale(0.3),
            FadeOut(self.token_label),
            run_time=1.5,
            rate_func=smooth,
        )
        self.play(FadeOut(self.left_vec), FadeOut(self.right_vec), run_time=0.3)

        # ── Neural network processing animation ──
        # Pulse connections bright, then pulse nodes layer by layer
        self.play(
            *[line.animate.set_stroke(opacity=0.8, color=ACCENT_BLUE) for line in nn_connections],
            rate_func=there_and_back, run_time=0.5,
        )
        for layer in layers_nodes:
            self.play(
                *[node.animate.set_fill(color=ACCENT_BLUE, opacity=0.95).scale(1.3) for node in layer],
                rate_func=there_and_back, run_time=0.3,
            )
        # Final flash — all nodes
        self.play(
            *[node.animate.set_fill(opacity=0.9) for layer in layers_nodes for node in layer],
            rate_func=there_and_back, run_time=0.3,
        )

        self.model_box = model_box
        self.model_group = model_group
        self.layers_nodes = layers_nodes
        self.nn_connections = nn_connections

    # ─────────────────────────────────────────────────────────────
    # Part F: ΔΔG Prediction Comparison — all on screen
    # ─────────────────────────────────────────────────────────────
    def part_f_prediction_comparison(self):
        # Move model up and clear corner proteins
        self.play(
            self.model_group.animate.shift(UP * 2.1),
            FadeOut(self.left_protein), FadeOut(self.right_protein),
            FadeOut(self.left_label), FadeOut(self.right_label),
            run_time=0.8,
        )

        box = self.model_box

        # Output arrows — prominent, from bottom
        out_left = Arrow(
            box.get_bottom() + LEFT * 1.5,
            box.get_bottom() + LEFT * 1.5 + DOWN * 1.0,
            buff=0.05, color=ACCENT_PURPLE, stroke_width=6,
            max_tip_length_to_length_ratio=0.25,
            tip_length=0.25,
        )
        out_right = Arrow(
            box.get_bottom() + RIGHT * 1.5,
            box.get_bottom() + RIGHT * 1.5 + DOWN * 1.0,
            buff=0.05, color=TEXT_MUTED, stroke_width=6,
            max_tip_length_to_length_ratio=0.25,
            tip_length=0.25,
        )
        self.play(GrowArrow(out_left), GrowArrow(out_right), run_time=0.8)

        # Results positioned below arrows
        result_y = out_left.get_bottom()[1] - 0.3

        # Left result — hint tokens (accurate)
        left_title = Text("With Hint Tokens", font_size=26, color=ACCENT_PURPLE, weight=BOLD)
        left_pred = Text("Predicted: -1.23 kcal/mol", font_size=24, color=TEXT_PRIMARY)
        left_actual = Text("Actual:       -1.31 kcal/mol", font_size=24, color=TEXT_MUTED)
        left_verdict = Text("✓ Accurate", font_size=26, color=ACCURATE_GREEN, weight=BOLD)
        left_title.move_to(np.array([-3, result_y, 0]))
        left_pred.next_to(left_title, DOWN, buff=0.12, aligned_edge=LEFT)
        left_actual.next_to(left_pred, DOWN, buff=0.08, aligned_edge=LEFT)
        left_verdict.next_to(left_actual, DOWN, buff=0.15)
        left_result = VGroup(left_title, left_pred, left_actual, left_verdict)

        # Right result — no hint tokens (less accurate)
        right_title = Text("Without Hint Tokens", font_size=26, color=TEXT_MUTED, weight=BOLD)
        right_pred = Text("Predicted: -0.45 kcal/mol", font_size=24, color=TEXT_PRIMARY)
        right_actual = Text("Actual:       -1.31 kcal/mol", font_size=24, color=TEXT_MUTED)
        right_verdict = Text("✗ Less Accurate", font_size=26, color=INACCURATE_RED, weight=BOLD)
        right_title.move_to(np.array([3, result_y, 0]))
        right_pred.next_to(right_title, DOWN, buff=0.12, aligned_edge=LEFT)
        right_actual.next_to(right_pred, DOWN, buff=0.08, aligned_edge=LEFT)
        right_verdict.next_to(right_actual, DOWN, buff=0.15)
        right_result = VGroup(right_title, right_pred, right_actual, right_verdict)

        self.play(
            FadeIn(left_result, shift=UP * 0.3),
            FadeIn(right_result, shift=UP * 0.3),
            run_time=1.2,
        )
        self.wait(0.8)

        # Final message
        final_text = Text(
            "Hint Tokens improve ΔΔG prediction accuracy",
            font_size=26, color=ACCENT_BLUE, weight=BOLD,
        )
        final_text.to_edge(DOWN, buff=0.25)

        self.play(Write(final_text), run_time=1.5)
        self.wait(2.0)

        # Fade everything for loop
        all_mobjects = Group(*self.mobjects)
        self.play(FadeOut(all_mobjects), run_time=1.2)
        self.wait(0.3)
