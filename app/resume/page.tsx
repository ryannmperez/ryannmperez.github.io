export default function Resume() {
  const skillTagColors = [
    'border-teal-500/30 text-teal-400 bg-teal-500/5',
    'border-amber-500/30 text-amber-400 bg-amber-500/5',
    'border-rose-500/30 text-rose-300 bg-rose-500/5',
    'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center justify-between mb-12">
        <div className="section-label flex-1 mr-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.15em] text-teal-400/50">CV</span>
            <h1 className="text-3xl font-bold gradient-text">Resume</h1>
          </div>
        </div>
        <a
          href="/resume.pdf"
          download
          className="btn-solid inline-flex items-center gap-2 rounded-lg px-5 py-2.5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </a>
      </div>

      <div className="gradient-card p-8 md:p-10">
        {/* Header */}
        <div className="pb-6 mb-6">
          <h2 className="text-2xl font-bold text-dark-text mb-2">Ryann M. Perez</h2>
          <p className="text-dark-muted mb-3">Computational Biologist</p>
          <div className="flex flex-wrap gap-4 text-sm text-dark-muted">
            <span>Philadelphia, PA</span>
            <a href="mailto:ryann.m.perez@gmail.com" className="text-teal-400 hover:text-teal-300 transition-colors">
              ryann.m.perez@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/ryann-perez/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors">
              LinkedIn
            </a>
          </div>
          <div className="glow-line mt-6" />
        </div>

        {/* Summary */}
        <div className="mb-8 relative">
          <span className="watermark-number !text-[6rem]">01</span>
          <div className="section-label mb-4">
            <div className="flex items-center gap-3">
              <span className="section-number">01</span>
              <h3 className="text-lg font-semibold text-dark-text">Summary</h3>
            </div>
          </div>
          <p className="text-dark-muted leading-relaxed relative z-10">
            Accomplished computational biochemist with over 5 years of experience translating <em>in silico</em> experimental
            techniques into real-world results. Accelerated adoption of generative AI and large language models (LLMs) in
            biological chemistry. Harnessed machine learning (ML), simulations, and statistical analysis in collaboration
            with cross-disciplinary teams to unravel complex molecular mechanisms. Seeking opportunities in building
            novel and impactful AI systems.
          </p>
        </div>

        <div className="glow-line mb-8" />

        {/* Education */}
        <div className="mb-8 relative">
          <span className="watermark-number !text-[6rem]">02</span>
          <div className="section-label mb-4">
            <div className="flex items-center gap-3">
              <span className="section-number">02</span>
              <h3 className="text-lg font-semibold text-dark-text">Education</h3>
            </div>
          </div>
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-dark-text font-medium">PhD, Computational Biochemistry</p>
                <p className="text-dark-muted text-sm">University of Pennsylvania | GPA: 3.99</p>
              </div>
              <span className="text-dark-muted text-sm font-mono whitespace-nowrap ml-4">April 2026</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-dark-text font-medium">Bachelor of Science, Chemistry (Minor: Biochemistry)</p>
                <p className="text-dark-muted text-sm">University of Delaware | GPA: 3.72</p>
              </div>
              <span className="text-dark-muted text-sm font-mono whitespace-nowrap ml-4">May 2020</span>
            </div>
          </div>
        </div>

        <div className="glow-line mb-8" />

        {/* Research Experience */}
        <div className="mb-8 relative">
          <span className="watermark-number !text-[6rem]">03</span>
          <div className="section-label mb-4">
            <div className="flex items-center gap-3">
              <span className="section-number">03</span>
              <h3 className="text-lg font-semibold text-dark-text">Research Experience</h3>
            </div>
          </div>
          <div className="space-y-4 relative z-10">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-dark-text font-medium">Graduate Researcher</p>
                  <p className="text-dark-muted text-sm">University of Pennsylvania, Lab of Dr. E. James Petersson</p>
                </div>
                <span className="text-dark-muted text-sm font-mono whitespace-nowrap ml-4">Sept 2020 - April 2026</span>
              </div>
              <ul className="text-dark-muted text-sm list-disc list-inside space-y-2 ml-2">
                <li>Crafted custom LLMs to achieve state-of-the-art performance on biologic aggregation and protein stability; important findings that streamline the property prediction of proteins. Scaled LLM for inference on 64 million datapoints</li>
                <li>Trained students to use a novel LLM system for biological chemistry questions and answer tasks which demonstrably improved learning experiences. This technology has been adopted by faculty for recurrent use in all future classes</li>
                <li>Enhanced productivity by the creation of Python software packages to streamline experimental analysis, drug discovery, and protein simulations which resulted in 10 coauthored publications within 5 years</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glow-line mb-8" />

        {/* Awards */}
        <div className="mb-8 relative">
          <span className="watermark-number !text-[6rem]">04</span>
          <div className="section-label mb-4">
            <div className="flex items-center gap-3">
              <span className="section-number">04</span>
              <h3 className="text-lg font-semibold text-dark-text">Selected Awards & Presentations</h3>
            </div>
          </div>
          <ul className="text-dark-muted text-sm space-y-3 relative z-10">
            <li>
              <span className="text-dark-text font-medium">Predoctoral Individual National Research Service Award (F31)</span> - Awarded from the National Institute of Health (NIH) for an original proposal describing and prototyping an amyloid polymorphism determination assay (<span className="font-mono">September 2024</span>)
            </li>
            <li>
              <span className="text-dark-text font-medium">University of Pennsylvania Dean&apos;s Scholar</span> - Given to 20 students in the School of Arts and Sciences for outstanding academic achievement and intellectual promise (<span className="font-mono">April 2024</span>)
            </li>
            <li>
              <span className="text-dark-text font-medium">Lectures on Generative AI in Chemistry</span> - Designed and led seminars attended by over 50 professionals and scientists on utilizing ChatGPT in chemistry workflows, leading to increased awareness and implementation of generative AI within the Chemistry Department (<span className="font-mono">May 2025</span>)
            </li>
          </ul>
        </div>

        <div className="glow-line mb-8" />

        {/* Skills */}
        <div className="mb-8 relative">
          <span className="watermark-number !text-[6rem]">05</span>
          <div className="section-label mb-4">
            <div className="flex items-center gap-3">
              <span className="section-number">05</span>
              <h3 className="text-lg font-semibold text-dark-text">Technical Skills</h3>
            </div>
          </div>
          <div className="space-y-4 relative z-10">
            <div>
              <p className="text-dark-text text-sm font-medium mb-2">Programming & ML</p>
              <div className="flex flex-wrap gap-2">
                {['Python', 'PyTorch', 'TensorFlow', 'HuggingFace', 'scikit-learn', 'NumPy', 'Pandas', 'Classical ML', 'Deep Learning', 'CNNs', 'GCNs', 'Transformers', 'LLMs', 'Diffusion Models', 'Contrastive Learning', 'Autoencoders', 'Fine-Tuning', 'PEFT', 'Domain Adaptation', 'RAG', 'Multi-GPU Training', 'EDA', 'Dimensionality Reduction', 'Unsupervised Learning', 'Statistical Analysis', 'AWS', 'GitHub'].map((skill, i) => (
                  <span key={skill} className={`tech-tag ${skillTagColors[i % skillTagColors.length]}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-dark-text text-sm font-medium mb-2">Computational Chemistry</p>
              <div className="flex flex-wrap gap-2">
                {['Virtual Screening', 'Rosetta/PyRosetta', 'PyMOL', 'ADMET Prediction', 'SAR Analysis', 'PyOpenMS', 'Molecular Simulations'].map((skill, i) => (
                  <span key={skill} className={`tech-tag ${skillTagColors[i % skillTagColors.length]}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-dark-text text-sm font-medium mb-2">Chemistry</p>
              <div className="flex flex-wrap gap-2">
                {['Organic Synthesis', 'LC-MS', 'HPLC', 'NMR', 'Peptide Synthesis', 'Flash Chromatography'].map((skill, i) => (
                  <span key={skill} className={`tech-tag ${skillTagColors[i % skillTagColors.length]}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-dark-text text-sm font-medium mb-2">Biology</p>
              <div className="flex flex-wrap gap-2">
                {['Protein Expression/Purification', 'SDS-PAGE', 'FPLC', 'MALDI-TOF MS', 'Enzymatic Assays', 'High Throughput Assay Design', 'Fluorescence Polarization'].map((skill, i) => (
                  <span key={skill} className={`tech-tag ${skillTagColors[i % skillTagColors.length]}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glow-line mb-8" />

        {/* Publications */}
        <div className="relative">
          <span className="watermark-number !text-[6rem]">06</span>
          <div className="section-label mb-4">
            <div className="flex items-center gap-3">
              <span className="section-number">06</span>
              <h3 className="text-lg font-semibold text-dark-text">Selected Publications</h3>
            </div>
          </div>
          <ul className="text-dark-muted text-sm space-y-4 relative z-10">
            <li>
              <span className="text-dark-text font-medium">Perez, R. M.</span>; Shimogawa, M.; et al. Large Language Models for Education: TAsk — An Open-Source Paradigm for Automated Q&amp;A in the Graduate Classroom. <em>Comput. Educ.: Artif. Intel.</em> <span className="font-mono">2026</span>.{' '}
              <a href="https://doi.org/10.1016/j.caeai.2026.100546" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors">DOI</a>
            </li>
            <li>
              Li, X.; <span className="text-dark-text font-medium">Perez, R. M.</span>; Mach, R. H.; Giannakoulias, S.; Petersson, E. J. Machine Learning Prediction of Multiple Distinct High-Affinity Chemotypes for &alpha;-Synuclein Fibrils. <em>Chem. Commun.</em> <span className="font-mono">2026</span>.{' '}
              <a href="https://doi.org/10.1039/D5CC06228D" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors">DOI</a>
            </li>
            <li>
              Li, X.; <span className="text-dark-text font-medium">Perez, R. M.</span>; et al. Accurate Prediction of Protein Tertiary and Quaternary Stability Using Fine-Tuned Protein Language Models and Free Energy Perturbation. <em>Int. J. Mol. Sci.</em> <span className="font-mono">2025</span>, 26, 7125.{' '}
              <a href="https://doi.org/10.3390/ijms26157125" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors">DOI</a>
            </li>
            <li>
              <span className="text-dark-text font-medium">Perez, R. M.</span>; Li, X.; Petersson, E. J.; Giannakoulias, S. AggBERT: Best in Class Prediction of Hexapeptide Amyloidogenesis with a Semi-Supervised ProtBERT Model. <em>J. Chem. Inf. Model.</em> <span className="font-mono">2023</span>.{' '}
              <a href="https://doi.org/10.1021/acs.jcim.3c00817" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors">DOI</a>
            </li>
          </ul>
          <a
            href="https://scholar.google.com/citations?user=nOgqdusAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-teal-400 hover:text-teal-300 text-sm transition-colors relative z-10"
          >
            View all publications on Google Scholar &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
