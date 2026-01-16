export default function Resume() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-bold text-dark-text">Resume</h1>
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 px-4 py-2 bg-dark-accent hover:bg-dark-accent-hover text-white rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </a>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-lg p-8">
        {/* Header */}
        <div className="border-b border-dark-border pb-6 mb-6">
          <h2 className="text-2xl font-bold text-dark-text mb-2">Ryann M. Perez</h2>
          <p className="text-dark-muted mb-3">Computational Biochemist</p>
          <div className="flex flex-wrap gap-4 text-sm text-dark-muted">
            <span>Philadelphia, PA</span>
            <a href="mailto:ryann.m.perez@gmail.com" className="text-dark-accent hover:text-dark-accent-hover">
              ryann.m.perez@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/ryann-perez/" target="_blank" rel="noopener noreferrer" className="text-dark-accent hover:text-dark-accent-hover">
              LinkedIn
            </a>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-dark-accent mb-4">Summary</h3>
          <p className="text-dark-muted leading-relaxed">
            Accomplished computational biochemist with over 5 years of experience translating in silico experimental
            techniques into real-world results. Accelerated adoption of generative AI and large language models (LLMs) in
            biological chemistry. Harnessed machine learning (ML), simulations, and statistical analysis in collaboration
            with cross-disciplinary teams to unravel complex molecular mechanisms. Seeking opportunities in building
            novel and impactful AI systems.
          </p>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-dark-accent mb-4">Education</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-dark-text font-medium">PhD Candidate, Computational Biochemistry</p>
                <p className="text-dark-muted text-sm">University of Pennsylvania | GPA: 3.99</p>
              </div>
              <span className="text-dark-muted text-sm">Expected March 2026</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-dark-text font-medium">Bachelor of Science, Chemistry (Minor: Biochemistry)</p>
                <p className="text-dark-muted text-sm">University of Delaware | GPA: 3.72</p>
              </div>
              <span className="text-dark-muted text-sm">May 2020</span>
            </div>
          </div>
        </div>

        {/* Research Experience */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-dark-accent mb-4">Research Experience</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-dark-text font-medium">Graduate Researcher</p>
                  <p className="text-dark-muted text-sm">University of Pennsylvania, Lab of Dr. E. James Petersson</p>
                </div>
                <span className="text-dark-muted text-sm">Sept 2020 - Present</span>
              </div>
              <ul className="text-dark-muted text-sm list-disc list-inside space-y-2 ml-2">
                <li>Crafted custom LLMs to achieve state-of-the-art performance on biologic aggregation and protein stability; scaled LLM for inference on 64 million datapoints</li>
                <li>Trained students to use a novel LLM system for biological chemistry Q&A tasks, adopted by faculty for recurrent use</li>
                <li>Constructed machine learning pipelines to predict ligand affinity toward alpha-synuclein fibrils</li>
                <li>Enhanced productivity by creating custom Python software packages for experimental analysis, drug discovery, and protein simulations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Awards */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-dark-accent mb-4">Selected Awards & Presentations</h3>
          <ul className="text-dark-muted text-sm space-y-3">
            <li>
              <span className="text-dark-text font-medium">NIH F31 Predoctoral Fellowship</span> - Awarded for original proposal on amyloid polymorphism determination assay (Sept 2024)
            </li>
            <li>
              <span className="text-dark-text font-medium">University of Pennsylvania Dean&apos;s Scholar</span> - Given to 20 students for outstanding academic achievement (April 2024)
            </li>
            <li>
              <span className="text-dark-text font-medium">Lectures on Generative AI in Chemistry</span> - Seminars attended by 50+ professionals on ChatGPT in chemistry workflows (May 2025)
            </li>
            <li>
              <span className="text-dark-text font-medium">Invited Lecture, Temple University</span> - Deep learning lecture for biochemistry audience (April 2024)
            </li>
          </ul>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-dark-accent mb-4">Technical Skills</h3>
          <div className="space-y-4">
            <div>
              <p className="text-dark-text text-sm font-medium mb-2">Programming & ML</p>
              <div className="flex flex-wrap gap-2">
                {['Python', 'PyTorch', 'TensorFlow', 'HuggingFace', 'scikit-learn', 'LLMs', 'Transformers', 'Diffusion Models', 'RAG', 'Fine-tuning', 'Multi-GPU Training', 'AWS'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs bg-dark-bg border border-dark-border rounded-full text-dark-muted">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-dark-text text-sm font-medium mb-2">Computational Chemistry</p>
              <div className="flex flex-wrap gap-2">
                {['Virtual Screening', 'Rosetta/PyRosetta', 'PyMOL', 'ADMET Prediction', 'Molecular Simulations'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs bg-dark-bg border border-dark-border rounded-full text-dark-muted">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-dark-text text-sm font-medium mb-2">Wet Lab</p>
              <div className="flex flex-wrap gap-2">
                {['LC-MS', 'HPLC', 'NMR', 'Protein Expression', 'MALDI-TOF', 'Peptide Synthesis'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs bg-dark-bg border border-dark-border rounded-full text-dark-muted">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Publications */}
        <div>
          <h3 className="text-lg font-semibold text-dark-accent mb-4">Selected Publications</h3>
          <ul className="text-dark-muted text-sm space-y-4">
            <li>
              <span className="text-dark-text font-medium">Perez, R. M.</span>; Shimogawa M.; et al. Large Language Models for Education: ChemTAsk -- An Open-Source Paradigm for Automated Q&A in the Graduate Classroom. <em>Comput. Educ.: Artif. Intel.</em> <span className="text-dark-accent">Accepted</span>
            </li>
            <li>
              Li, X.; <span className="text-dark-text font-medium">Perez, R. M.</span>; Mach, R. H.; Giannakoulias, S.; Petersson, E. J. Machine Learning Prediction of Multiple Distinct High-Affinity Chemotypes for α-Synuclein Fibrils. <em>Chem. Commun.</em> 2026
            </li>
            <li>
              Li, X.; <span className="text-dark-text font-medium">Perez, R. M.</span>; et al. Accurate Prediction of Protein Tertiary and Quaternary Stability Using Fine-Tuned Protein Language Models. <em>Int. J. Mol. Sci.</em> 2025
            </li>
            <li>
              <span className="text-dark-text font-medium">Perez, R. M.</span>; Li, X.; Petersson, E. J.; Giannakoulias, S. AggBERT: Best in Class Prediction of Hexapeptide Amyloidogenesis with a Semi-Supervised ProtBERT Model. <em>J. Chem. Inf. Model.</em> 2023
            </li>
          </ul>
          <a
            href="https://scholar.google.com/citations?user=nOgqdusAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-dark-accent hover:text-dark-accent-hover text-sm"
          >
            View all publications on Google Scholar →
          </a>
        </div>
      </div>
    </section>
  );
}
