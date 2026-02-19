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
          <p className="text-dark-muted mb-3">Computational Biologist</p>
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
            Accomplished computational biochemist with over 5 years of experience translating <em>in silico</em> experimental
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
              <span className="text-dark-muted text-sm whitespace-nowrap ml-4">Expected March 2026</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-dark-text font-medium">Bachelor of Science, Chemistry (Minor: Biochemistry)</p>
                <p className="text-dark-muted text-sm">University of Delaware | GPA: 3.72</p>
              </div>
              <span className="text-dark-muted text-sm whitespace-nowrap ml-4">May 2020</span>
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
                <span className="text-dark-muted text-sm whitespace-nowrap ml-4">Sept 2020 - Present</span>
              </div>
              <ul className="text-dark-muted text-sm list-disc list-inside space-y-2 ml-2">
                <li>Crafted custom LLMs to achieve state-of-the-art performance on biologic aggregation and protein stability; important findings that streamline the property prediction of proteins. Scaled LLM for inference on 64 million datapoints</li>
                <li>Trained students to use a novel LLM system for biological chemistry questions and answer tasks which demonstrably improved learning experiences. This technology has been adopted by faculty for recurrent use in all future classes</li>
                <li>Enhanced productivity by the creation of Python software packages to streamline experimental analysis, drug discovery, and protein simulations which resulted in 10 coauthored publications within 5 years</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Awards */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-dark-accent mb-4">Selected Awards & Presentations</h3>
          <ul className="text-dark-muted text-sm space-y-3">
            <li>
              <span className="text-dark-text font-medium">Predoctoral Individual National Research Service Award (F31)</span> - Awarded from the National Institute of Health (NIH) for an original proposal describing and prototyping an amyloid polymorphism determination assay (September 2024)
            </li>
            <li>
              <span className="text-dark-text font-medium">University of Pennsylvania Dean&apos;s Scholar</span> - Given to 20 students in the School of Arts and Sciences for outstanding academic achievement and intellectual promise (April 2024)
            </li>
            <li>
              <span className="text-dark-text font-medium">Lectures on Generative AI in Chemistry</span> - Designed and led seminars attended by over 50 professionals and scientists on utilizing ChatGPT in chemistry workflows, leading to increased awareness and implementation of generative AI within the Chemistry Department (May 2025)
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
                {['Python', 'PyTorch', 'TensorFlow', 'HuggingFace', 'scikit-learn', 'NumPy', 'Pandas', 'Classical ML', 'Deep Learning', 'CNNs', 'GCNs', 'Transformers', 'LLMs', 'Diffusion Models', 'Contrastive Learning', 'Autoencoders', 'Fine-Tuning', 'PEFT', 'Domain Adaptation', 'RAG', 'Multi-GPU Training', 'EDA', 'Dimensionality Reduction', 'Unsupervised Learning', 'Statistical Analysis', 'AWS', 'GitHub'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs bg-dark-bg border border-dark-border rounded-full text-dark-muted">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-dark-text text-sm font-medium mb-2">Computational Chemistry</p>
              <div className="flex flex-wrap gap-2">
                {['Virtual Screening', 'Rosetta/PyRosetta', 'PyMOL', 'ADMET Prediction', 'SAR Analysis', 'PyOpenMS', 'Molecular Simulations'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs bg-dark-bg border border-dark-border rounded-full text-dark-muted">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-dark-text text-sm font-medium mb-2">Chemistry</p>
              <div className="flex flex-wrap gap-2">
                {['Organic Synthesis', 'LC-MS', 'HPLC', 'NMR', 'Peptide Synthesis', 'Flash Chromatography'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs bg-dark-bg border border-dark-border rounded-full text-dark-muted">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-dark-text text-sm font-medium mb-2">Biology</p>
              <div className="flex flex-wrap gap-2">
                {['Protein Expression/Purification', 'SDS-PAGE', 'FPLC', 'MALDI-TOF MS', 'Enzymatic Assays', 'High Throughput Assay Design', 'Fluorescence Polarization'].map((skill) => (
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
              <span className="text-dark-text font-medium">Perez, R. M.</span>; Shimogawa M.; et al. Large Language Models for Education: ChemTAsk -- An Open-Source Paradigm for Automated Q&A in the Graduate Classroom. <em>Comput. Educ.: Artif. Intel.</em> <span className="text-dark-accent">Accepted</span>{' '}
              <a href="https://arxiv.org/abs/2502.00016" target="_blank" rel="noopener noreferrer" className="text-dark-accent hover:text-dark-accent-hover">DOI</a>
            </li>
            <li>
              Li, X.; <span className="text-dark-text font-medium">Perez, R. M.</span>; Mach, R. H.; Giannakoulias, S.; Petersson, E. J. Machine Learning Prediction of Multiple Distinct High-Affinity Chemotypes for α-Synuclein Fibrils. <em>Chem. Commun.</em> 2026.{' '}
              <a href="https://doi.org/10.1039/D5CC06228D" target="_blank" rel="noopener noreferrer" className="text-dark-accent hover:text-dark-accent-hover">DOI</a>
            </li>
            <li>
              Li, X.; <span className="text-dark-text font-medium">Perez, R. M.</span>; et al. Accurate Prediction of Protein Tertiary and Quaternary Stability Using Fine-Tuned Protein Language Models and Free Energy Perturbation. <em>Int. J. Mol. Sci.</em> 2025, 26, 7125.{' '}
              <a href="https://doi.org/10.3390/ijms26157125" target="_blank" rel="noopener noreferrer" className="text-dark-accent hover:text-dark-accent-hover">DOI</a>
            </li>
            <li>
              <span className="text-dark-text font-medium">Perez, R. M.</span>; Li, X.; Petersson, E. J.; Giannakoulias, S. AggBERT: Best in Class Prediction of Hexapeptide Amyloidogenesis with a Semi-Supervised ProtBERT Model. <em>J. Chem. Inf. Model.</em> 2023.{' '}
              <a href="https://doi.org/10.1021/acs.jcim.3c00817" target="_blank" rel="noopener noreferrer" className="text-dark-accent hover:text-dark-accent-hover">DOI</a>
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
