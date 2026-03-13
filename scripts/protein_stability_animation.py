"""
Protein Stability Prediction Animation — Manim Scene

Full story from Li, Perez et al. (IJMS 2025):
1. Protein sequence with mutation → ProtT5 encoder → embeddings
2. Three prediction tasks: ΔG stability, GFP fluorescence, complex ΔΔG
3. PLM rapid screening → FEP refinement pipeline for complex stability
4. Applications
"""

from manim import *
import numpy as np

# ── Color palette (matches portfolio site) ──
BG_COLOR = "#0a0f1a"
CARD_BG = "#111827"
BORDER_COLOR = "#30363d"
TEXT_PRIMARY = "#f5f0e8"
TEXT_MUTED = "#8b949e"
TEAL = "#2dd4bf"
GOLD = "#d4a574"
ROSE = "#c9787c"
GREEN = "#3fb950"
RED = "#f85149"
BLUE = "#58a6ff"
PURPLE = "#a371f7"
FEP_ORANGE = "#f59e0b"


class ProteinStabilityScene(Scene):
    def construct(self):
        self.camera.background_color = BG_COLOR

        self.part_a_title_and_mutation()
        self.part_b_model_pipeline()
        self.part_c_three_tasks()
        self.part_d_fep_refinement()
        self.part_e_applications()

    # ─────────────────────────────────────────────────────────────
    # Part A: Title + Wild-type sequence with mutation
    # ─────────────────────────────────────────────────────────────
    def part_a_title_and_mutation(self):
        title = Text("Protein Stability Prediction", font_size=42, color=TEAL, weight=BOLD)
        subtitle = Text(
            "Fine-tuned PLMs and Free Energy Perturbation",
            font_size=22, color=TEXT_MUTED,
        )
        title.to_edge(UP, buff=0.4)
        subtitle.next_to(title, DOWN, buff=0.15)
        self.play(Write(title), FadeIn(subtitle, shift=UP * 0.2), run_time=1.2)

        # Wild-type sequence
        residues = ["L", "E", "V", "L", "F", "Q", "G", "P"]
        wt_label = Text("Wild-type", font_size=22, color=TEXT_MUTED)

        letters = VGroup()
        boxes = VGroup()
        for r in residues:
            box = RoundedRectangle(
                width=0.6, height=0.7, corner_radius=0.08,
                color=BORDER_COLOR, fill_color=CARD_BG, fill_opacity=0.8,
                stroke_width=1.5,
            )
            letter = Text(r, font_size=32, color=TEXT_PRIMARY, font="Monospace", weight=BOLD)
            letter.move_to(box.get_center())
            letters.add(letter)
            boxes.add(box)

        seq_group = VGroup(*[VGroup(b, l) for b, l in zip(boxes, letters)])
        seq_group.arrange(RIGHT, buff=0.08)
        seq_group.move_to(UP * 0.3)
        wt_label.next_to(seq_group, LEFT, buff=0.4)

        self.play(
            FadeIn(wt_label),
            LaggedStart(*[FadeIn(s, shift=DOWN * 0.15) for s in seq_group], lag_ratio=0.08),
            run_time=1.0,
        )
        self.wait(0.3)

        # Highlight mutation site (position 4: F)
        mut_idx = 4
        highlight = SurroundingRectangle(
            seq_group[mut_idx], color=ROSE, buff=0.05, corner_radius=0.1, stroke_width=2.5,
        )
        mut_arrow = Arrow(
            seq_group[mut_idx].get_bottom() + DOWN * 0.8,
            seq_group[mut_idx].get_bottom() + DOWN * 0.05,
            buff=0, color=ROSE, stroke_width=4, tip_length=0.2,
        )
        mut_text = Text("F → A", font_size=26, color=ROSE, weight=BOLD)
        mut_text.next_to(mut_arrow, DOWN, buff=0.1)

        self.play(Create(highlight), GrowArrow(mut_arrow), FadeIn(mut_text), run_time=0.7)
        self.wait(0.3)

        # Swap the residue
        new_letter = Text("A", font_size=32, color=ROSE, font="Monospace", weight=BOLD)
        new_letter.move_to(letters[mut_idx].get_center())
        old_letter = letters[mut_idx]
        self.play(
            FadeOut(old_letter, shift=UP * 0.3),
            FadeIn(new_letter, shift=DOWN * 0.3),
            boxes[mut_idx].animate.set_stroke(color=ROSE, width=2),
            run_time=0.5,
        )
        letters.submobjects[mut_idx] = new_letter
        seq_group[mut_idx].submobjects[1] = new_letter

        mut_label = Text("Mutant", font_size=22, color=ROSE)
        mut_label.move_to(wt_label.get_center())
        self.play(
            FadeOut(wt_label), FadeIn(mut_label),
            FadeOut(mut_arrow), FadeOut(mut_text), FadeOut(highlight),
            run_time=0.5,
        )
        self.wait(0.3)

        self.title = title
        self.subtitle = subtitle
        self.seq_group = seq_group
        self.mut_label = mut_label

    # ─────────────────────────────────────────────────────────────
    # Part B: ProtT5 encoder → embeddings → regression head → output
    # ─────────────────────────────────────────────────────────────
    def part_b_model_pipeline(self):
        # Compact everything into a horizontal pipeline — shift right so sequence isn't clipped
        self.play(
            FadeOut(self.title), FadeOut(self.subtitle),
            self.seq_group.animate.scale(0.65).move_to(LEFT * 4.8 + UP * 0.2),
            self.mut_label.animate.scale(0.65).move_to(LEFT * 4.8 + DOWN * 0.6),
            run_time=0.7,
        )

        # ProtT5 encoder box
        encoder_box = RoundedRectangle(
            width=2.4, height=1.6, corner_radius=0.12,
            color=TEAL, fill_color=CARD_BG, fill_opacity=0.9, stroke_width=2,
        )
        encoder_box.move_to(LEFT * 1.5 + UP * 0.2)
        encoder_label = Text("ProtT5", font_size=24, color=TEAL, weight=BOLD)
        encoder_label.move_to(encoder_box.get_center())

        arr1 = Arrow(
            self.seq_group.get_right(), encoder_box.get_left(),
            buff=0.1, color=TEXT_MUTED, stroke_width=2.5, tip_length=0.15,
        )

        self.play(FadeIn(encoder_box), FadeIn(encoder_label), GrowArrow(arr1), run_time=0.6)

        # Processing pulse
        pulse = RoundedRectangle(
            width=0.2, height=1.2, corner_radius=0.08,
            color=TEAL, fill_opacity=0.4, stroke_width=0,
        )
        pulse.move_to(encoder_box.get_left() + RIGHT * 0.2)
        self.add(pulse)
        self.play(
            pulse.animate.move_to(encoder_box.get_right() + LEFT * 0.2).set_opacity(0),
            run_time=0.6, rate_func=linear,
        )
        self.remove(pulse)

        # Embedding heatmap (compact)
        emb_group = VGroup()
        np.random.seed(42)
        for i in range(8):
            col = VGroup()
            for j in range(4):
                val = np.random.uniform(0.15, 0.95)
                base_color = ROSE if i == 4 else TEAL
                color = interpolate_color(ManimColor(CARD_BG), ManimColor(base_color), val)
                cell = Square(
                    side_length=0.17, color=BORDER_COLOR, fill_color=color,
                    fill_opacity=0.9, stroke_width=0.3,
                )
                col.add(cell)
            col.arrange(DOWN, buff=0.01)
            emb_group.add(col)
        emb_group.arrange(RIGHT, buff=0.03)
        emb_group.move_to(RIGHT * 1.2 + UP * 0.2)

        arr2 = Arrow(
            encoder_box.get_right(), emb_group.get_left(),
            buff=0.1, color=TEXT_MUTED, stroke_width=2.5, tip_length=0.15,
        )
        emb_lbl = Text("Embeddings", font_size=14, color=TEXT_MUTED)
        emb_lbl.next_to(emb_group, DOWN, buff=0.1)

        self.play(GrowArrow(arr2), FadeIn(emb_group, shift=LEFT * 0.2), FadeIn(emb_lbl), run_time=0.7)

        # Regression head
        reg_box = RoundedRectangle(
            width=2.0, height=1.6, corner_radius=0.12,
            color=GOLD, fill_color=CARD_BG, fill_opacity=0.9, stroke_width=2,
        )
        reg_box.move_to(RIGHT * 3.8 + UP * 0.2)
        reg_label = Text("Regression\nHead", font_size=14, color=GOLD, weight=BOLD)
        reg_label.move_to(reg_box.get_center() + UP * 0.5)

        # Mini neural net — shifted down to avoid label overlap
        layer_cfgs = [(3, -0.35), (4, 0), (2, 0.35)]
        nn_nodes = VGroup()
        nn_lines = VGroup()
        all_layers = []
        for n_nodes, lx in layer_cfgs:
            layer = VGroup()
            spacing = 0.2
            start_y = -(n_nodes - 1) * spacing / 2
            for ni in range(n_nodes):
                node = Circle(radius=0.06, color=GOLD, fill_opacity=0.5, stroke_width=1)
                node.move_to(reg_box.get_center() + DOWN * 0.25 + RIGHT * lx + UP * (start_y + ni * spacing))
                layer.add(node)
            all_layers.append(layer)
            nn_nodes.add(layer)
        for li in range(len(all_layers) - 1):
            for n1 in all_layers[li]:
                for n2 in all_layers[li + 1]:
                    nn_lines.add(Line(n1.get_center(), n2.get_center(), color=BORDER_COLOR, stroke_width=0.5, stroke_opacity=0.4))

        arr3 = Arrow(
            emb_group.get_right(), reg_box.get_left(),
            buff=0.1, color=TEXT_MUTED, stroke_width=2.5, tip_length=0.15,
        )

        self.play(
            GrowArrow(arr3), FadeIn(reg_box), FadeIn(reg_label),
            FadeIn(nn_lines), FadeIn(nn_nodes),
            run_time=0.7,
        )

        # Pulse through neural net
        for layer in all_layers:
            self.play(
                *[node.animate.set_fill(opacity=0.95).scale(1.3) for node in layer],
                rate_func=there_and_back, run_time=0.2,
            )

        # Output value
        ddg_val = Text("→ ΔG / ΔΔG", font_size=20, color=TEXT_PRIMARY, weight=BOLD)
        ddg_val.next_to(reg_box, RIGHT, buff=0.15)
        out_arr = None  # no separate arrow needed, text has arrow glyph

        self.play(FadeIn(ddg_val), run_time=0.5)
        self.wait(0.6)

        self.pipeline_mobs = Group(
            self.seq_group, self.mut_label, arr1, encoder_box, encoder_label,
            arr2, emb_group, emb_lbl, arr3, reg_box, reg_label,
            nn_lines, nn_nodes, ddg_val,
        )

    # ─────────────────────────────────────────────────────────────
    # Part C: Three prediction tasks
    # ─────────────────────────────────────────────────────────────
    def part_c_three_tasks(self):
        self.play(FadeOut(self.pipeline_mobs), run_time=0.6)

        section_title = Text("Three Prediction Tasks", font_size=34, color=TEAL, weight=BOLD)
        section_title.to_edge(UP, buff=0.45)
        self.play(FadeIn(section_title), run_time=0.4)

        # Task 1: Protein Stability (ΔG)
        t1_box = RoundedRectangle(
            width=3.4, height=2.8, corner_radius=0.12,
            color=TEAL, fill_color=CARD_BG, fill_opacity=0.9, stroke_width=1.5,
        )
        t1_title = Text("Protein\nStability", font_size=20, color=TEAL, weight=BOLD)
        t1_metric = Text("R² = 0.60", font_size=18, color=TEXT_PRIMARY)
        t1_data = Text("~700K mutants", font_size=14, color=TEXT_MUTED)
        t1_output = Text("ΔG", font_size=28, color=TEAL, weight=BOLD)
        t1_content = VGroup(t1_title, t1_output, t1_metric, t1_data).arrange(DOWN, buff=0.15)
        t1_content.move_to(t1_box.get_center())
        t1 = VGroup(t1_box, t1_content)

        # Task 2: GFP Fluorescence
        t2_box = RoundedRectangle(
            width=3.4, height=2.8, corner_radius=0.12,
            color=GREEN, fill_color=CARD_BG, fill_opacity=0.9, stroke_width=1.5,
        )
        t2_title = Text("GFP\nFluorescence", font_size=20, color=GREEN, weight=BOLD)
        t2_metric = Text("F1 = 0.95", font_size=18, color=TEXT_PRIMARY)
        t2_data = Text("Bright / Dark", font_size=14, color=TEXT_MUTED)
        t2_output = Text("Classification", font_size=20, color=GREEN, weight=BOLD)
        t2_content = VGroup(t2_title, t2_output, t2_metric, t2_data).arrange(DOWN, buff=0.15)
        t2_content.move_to(t2_box.get_center())
        t2 = VGroup(t2_box, t2_content)

        # Task 3: Complex Stability (ΔΔG)
        t3_box = RoundedRectangle(
            width=3.4, height=2.8, corner_radius=0.12,
            color=PURPLE, fill_color=CARD_BG, fill_opacity=0.9, stroke_width=1.5,
        )
        t3_title = Text("Complex\nStability", font_size=20, color=PURPLE, weight=BOLD)
        t3_metric = Text("F1 = 0.73", font_size=18, color=TEXT_PRIMARY)
        t3_data = Text("SKEMPI 2.0", font_size=14, color=TEXT_MUTED)
        t3_output = Text("ΔΔG", font_size=28, color=PURPLE, weight=BOLD)
        t3_content = VGroup(t3_title, t3_output, t3_metric, t3_data).arrange(DOWN, buff=0.15)
        t3_content.move_to(t3_box.get_center())
        t3 = VGroup(t3_box, t3_content)

        tasks = VGroup(t1, t2, t3).arrange(RIGHT, buff=0.4)
        tasks.move_to(DOWN * 0.3)

        self.play(
            LaggedStart(
                FadeIn(t1, shift=UP * 0.3),
                FadeIn(t2, shift=UP * 0.3),
                FadeIn(t3, shift=UP * 0.3),
                lag_ratio=0.2,
            ),
            run_time=1.2,
        )
        self.wait(1.0)

        # Highlight complex stability task — it leads into FEP
        self.play(
            t1_box.animate.set_stroke(opacity=0.3),
            t1_content.animate.set_opacity(0.3),
            t2_box.animate.set_stroke(opacity=0.3),
            t2_content.animate.set_opacity(0.3),
            t3_box.animate.set_stroke(color=FEP_ORANGE, width=2.5),
            run_time=0.6,
        )

        refine_label = Text(
            "PLM identifies stabilizing mutations → refine with FEP",
            font_size=18, color=FEP_ORANGE,
        )
        refine_label.to_edge(DOWN, buff=0.4)
        self.play(FadeIn(refine_label, shift=UP * 0.15), run_time=0.6)
        self.wait(0.8)

        self.tasks_mobs = Group(section_title, tasks, refine_label)

    # ─────────────────────────────────────────────────────────────
    # Part D: PLM screening → FEP refinement
    # ─────────────────────────────────────────────────────────────
    def part_d_fep_refinement(self):
        self.play(FadeOut(self.tasks_mobs), run_time=0.6)

        section_title = Text("PLM → FEP Refinement Pipeline", font_size=32, color=TEAL, weight=BOLD)
        section_title.to_edge(UP, buff=0.4)
        self.play(FadeIn(section_title), run_time=0.4)

        # ── Layout: two boxes centered with small gap, arrow between ──
        box_w, box_h = 4.8, 3.2
        gap = 1.4  # space between boxes (arrow lives here)
        total_w = box_w * 2 + gap
        left_cx = -total_w / 2 + box_w / 2
        right_cx = total_w / 2 - box_w / 2
        box_y = DOWN * 0.35

        # Stage 1: PLM rapid screen
        plm_box = RoundedRectangle(
            width=box_w, height=box_h, corner_radius=0.15,
            color=TEAL, fill_color=CARD_BG, fill_opacity=0.9, stroke_width=2,
        )
        plm_box.move_to(LEFT * abs(left_cx) + box_y)
        plm_title = Text("PLM Screen", font_size=26, color=TEAL, weight=BOLD)
        plm_title.next_to(plm_box, UP, buff=0.08)

        plm_subtitle = Text("Rapid · Sequence-only", font_size=17, color=TEXT_MUTED)
        plm_subtitle.move_to(plm_box.get_center() + UP * 1.05)

        # Mutation list — bigger text
        mutations = [
            ("A27K", GREEN, "Stabilizing"),
            ("D36N", RED, "Destabilizing"),
            ("A27K_D36D", GREEN, "Stabilizing"),
            ("I18L", RED, "Destabilizing"),
        ]
        mut_rows = VGroup()
        for mut_name, color, label_text in mutations:
            name = Text(mut_name, font_size=20, color=TEXT_PRIMARY, font="Monospace")
            verdict = Text(label_text, font_size=18, color=color)
            row = VGroup(name, verdict).arrange(RIGHT, buff=0.35)
            mut_rows.add(row)
        mut_rows.arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        mut_rows.move_to(plm_box.get_center() + DOWN * 0.1)

        self.play(FadeIn(plm_box), FadeIn(plm_title), FadeIn(plm_subtitle), run_time=0.5)
        self.play(
            LaggedStart(*[FadeIn(r, shift=RIGHT * 0.2) for r in mut_rows], lag_ratio=0.12),
            run_time=1.0,
        )
        self.wait(0.4)

        # Highlight stabilizing
        stab_highlight_1 = SurroundingRectangle(mut_rows[0], color=GREEN, buff=0.06, corner_radius=0.06, stroke_width=1.5)
        stab_highlight_2 = SurroundingRectangle(mut_rows[2], color=GREEN, buff=0.06, corner_radius=0.06, stroke_width=1.5)
        self.play(Create(stab_highlight_1), Create(stab_highlight_2), run_time=0.5)

        # Arrow between boxes
        funnel_arrow = Arrow(
            plm_box.get_right() + RIGHT * 0.1,
            plm_box.get_right() + RIGHT * (gap - 0.1),
            buff=0, color=FEP_ORANGE, stroke_width=4, tip_length=0.2,
        )
        funnel_label = Text("Top\nhits", font_size=18, color=FEP_ORANGE, weight=BOLD)
        funnel_label.next_to(funnel_arrow, UP, buff=0.05)

        self.play(GrowArrow(funnel_arrow), FadeIn(funnel_label), run_time=0.6)

        # Stage 2: FEP refinement
        fep_box = RoundedRectangle(
            width=box_w, height=box_h, corner_radius=0.15,
            color=FEP_ORANGE, fill_color=CARD_BG, fill_opacity=0.9, stroke_width=2,
        )
        fep_box.move_to(RIGHT * abs(right_cx) + box_y)
        fep_title = Text("FEP Refinement", font_size=26, color=FEP_ORANGE, weight=BOLD)
        fep_title.next_to(fep_box, UP, buff=0.08)

        fep_subtitle = Text("Accurate · Structure-based", font_size=17, color=TEXT_MUTED)
        fep_subtitle.move_to(fep_box.get_center() + UP * 1.05)

        # FEP results table — bigger text, from Table 2
        header = VGroup(
            Text("Mutant", font_size=16, color=TEXT_MUTED, font="Monospace"),
            Text("Exp.", font_size=16, color=TEXT_MUTED),
            Text("FEP", font_size=16, color=FEP_ORANGE),
        ).arrange(RIGHT, buff=0.55)

        row1 = VGroup(
            Text("A27K", font_size=18, color=TEXT_PRIMARY, font="Monospace"),
            Text("-5.03", font_size=18, color=TEXT_PRIMARY),
            Text("-6.68", font_size=18, color=FEP_ORANGE),
        ).arrange(RIGHT, buff=0.45)

        row2 = VGroup(
            Text("A27K..", font_size=18, color=TEXT_PRIMARY, font="Monospace"),
            Text("-9.56", font_size=18, color=TEXT_PRIMARY),
            Text("-10.9", font_size=18, color=FEP_ORANGE),
        ).arrange(RIGHT, buff=0.4)

        row3 = VGroup(
            Text("I18L", font_size=18, color=TEXT_PRIMARY, font="Monospace"),
            Text("-4.41", font_size=18, color=TEXT_PRIMARY),
            Text("-0.40", font_size=18, color=FEP_ORANGE),
        ).arrange(RIGHT, buff=0.45)

        fep_table = VGroup(header, row1, row2, row3).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        fep_table.move_to(fep_box.get_center() + DOWN * 0.05)

        err_note = Text("FEP error: 1.3–4.0 kcal/mol", font_size=15, color=GREEN)
        err_note.next_to(fep_table, DOWN, buff=0.15)

        self.play(FadeIn(fep_box), FadeIn(fep_title), FadeIn(fep_subtitle), run_time=0.5)
        self.play(FadeIn(fep_table), run_time=0.8)
        self.play(FadeIn(err_note), run_time=0.4)
        self.wait(0.6)

        # Bottom summary
        summary = Text(
            "PLM screens fast  →  FEP refines accurately",
            font_size=22, color=TEXT_PRIMARY,
        )
        summary.to_edge(DOWN, buff=0.3)
        self.play(FadeIn(summary, shift=UP * 0.15), run_time=0.6)
        self.wait(2.0)

        self.fep_mobs = Group(
            section_title, plm_box, plm_title, plm_subtitle, mut_rows,
            stab_highlight_1, stab_highlight_2,
            funnel_arrow, funnel_label,
            fep_box, fep_title, fep_subtitle, fep_table, err_note,
            summary,
        )

    # ─────────────────────────────────────────────────────────────
    # Part E: Applications
    # ─────────────────────────────────────────────────────────────
    def part_e_applications(self):
        self.play(FadeOut(self.fep_mobs), run_time=0.6)

        app_title = Text("Applications", font_size=36, color=TEAL, weight=BOLD)
        app_title.to_edge(UP, buff=0.6)
        self.play(FadeIn(app_title), run_time=0.4)

        applications = [
            ("Mutant Library Design", TEAL),
            ("Enzyme Optimization", GOLD),
            ("Antibody Engineering", ROSE),
            ("Biologic Lifetimes", BLUE),
            ("Protein Materials", PURPLE),
        ]

        app_items = VGroup()
        for app_text, color in applications:
            dot = Circle(radius=0.06, color=color, fill_opacity=1, stroke_width=0)
            label = Text(app_text, font_size=26, color=TEXT_PRIMARY)
            row = VGroup(dot, label).arrange(RIGHT, buff=0.25)
            app_items.add(row)

        app_items.arrange(DOWN, buff=0.35, aligned_edge=LEFT)
        app_items.move_to(ORIGIN)

        self.play(
            LaggedStart(
                *[FadeIn(item, shift=RIGHT * 0.3) for item in app_items],
                lag_ratio=0.12,
            ),
            run_time=1.2,
        )
        self.wait(0.6)

        tagline = Text(
            "Language models + physics for protein engineering",
            font_size=22, color=TEXT_MUTED,
        )
        tagline.to_edge(DOWN, buff=0.5)
        self.play(FadeIn(tagline, shift=UP * 0.2), run_time=0.6)
        self.wait(2.0)

        all_mobs = Group(*self.mobjects)
        self.play(FadeOut(all_mobs), run_time=1.0)
        self.wait(0.3)
