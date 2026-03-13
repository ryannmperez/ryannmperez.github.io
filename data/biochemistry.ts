export interface BiochemProject {
  id: string;
  title: string;
  description: string;
  image: string;
  paperUrl: string;
  tags: string[];
  journal: string;
  year: string;
  status?: string;
}

export const biochemProjects: BiochemProject[] = [
  {
    id: 'proteolytic-amyloid-assay',
    title: 'Proteolytic Amyloid Digestion Assay for Fibril Polymorphisms',
    description:
      'Developed a novel proteolytic digestion assay with mass spectrometry readout for rapidly distinguishing different \u03b1-synuclein fibril polymorphisms. This technique enables faster and more reproducible characterization of disease-relevant fibril structures, improving the diagnosis of Parkinsonian diseases.',
    image: '/projects/biochem/proteolytic-assay.png',
    paperUrl: '',
    tags: ['Mass Spectrometry', 'Fibril Polymorphism', 'Proteolysis', '\u03b1-Synuclein', 'Biochemical Assay'],
    journal: '',
    year: '',
    status: 'In Preparation',
  },
  {
    id: 'msa-selective-binding',
    title: 'Selective Radioligand Binding to \u03b1-Synuclein in MSA Tissue',
    description:
      'Used complementary structural and chemical biology techniques including cryo-EM, crosslinking mass spectrometry, FRET, and radioligand binding assays to characterize how the PET imaging candidate EX-6 binds to \u03b1-synuclein fibrils. Identified a specific binding pocket conserved in MSA patient-derived structures, demonstrating 10-fold selectivity for MSA over PD tissue.',
    image: '/projects/biochem/msa-binding.png',
    paperUrl: 'https://doi.org/10.1101/2025.06.30.662461',
    tags: ['Cryo-EM', 'Radioligand Binding', 'Mass Spectrometry', 'Multiple System Atrophy', 'PET Imaging'],
    journal: 'BioRxiv',
    year: '2025',
    status: 'Submitted',
  },
  {
    id: 'radiotracer-competition',
    title: 'Radiotracer Competition Binding with \u03b1-Synuclein Fibrils',
    description:
      'Developed a radiotracer competition binding platform to systematically evaluate how ~300 small molecules interact with \u03b1-synuclein fibrils, revealing structure-activity relationships for ligand specificity. Identified key design principles for developing selective PET imaging probes for different synucleinopathies.',
    image: '/projects/biochem/radiotracer-competition.png',
    paperUrl: 'https://doi.org/10.26434/chemrxiv-2025-vb124',
    tags: ['Radiotracer', 'Structure-Activity Relationships', 'Drug Design', '\u03b1-Synuclein', 'PET Imaging'],
    journal: 'ChemRxiv',
    year: '2025',
    status: 'In Revision',
  },
  {
    id: 'pet-probe-cterminus',
    title: 'PET Probe Interactions with the C-Terminus of \u03b1-Synuclein Fibrils',
    description:
      'Investigated how two PET imaging probe candidates (M503 and HY-215) interact with \u03b1-synuclein fibrils at the molecular level. Using photo-crosslinking mass spectrometry and FRET, discovered that the MSA-selective probe HY-215 uniquely interacts with the disordered C-terminus, highlighting the importance of often-ignored disordered fibril regions for selective diagnostics.',
    image: '/projects/biochem/pet-cterminus.png',
    paperUrl: 'https://doi.org/10.1002/cbic.202500578',
    tags: ['PET Imaging', '\u03b1-Synuclein', 'Photo-Crosslinking MS', 'FRET', 'Neurodegenerative Disease'],
    journal: 'ChemBioChem',
    year: '2025',
  },
  {
    id: 'lexa-reca-structure',
    title: 'LexA-RecA* Lock-and-Key Mechanism for SOS Activation',
    description:
      'Contributed to solving the first cryo-EM structure of the complete E. coli SOS signaling complex \u2014 full-length LexA bound to activated RecA*. The structure reveals an extensive binding interface where a single RecA residue acts as a molecular key that inserts into an allosteric pocket to trigger LexA self-cleavage, providing a foundation for therapeutics to slow antibiotic resistance evolution.',
    image: '/projects/biochem/lexa-reca.png',
    paperUrl: 'https://doi.org/10.1038/s41594-024-01317-3',
    tags: ['Cryo-EM', 'SOS Response', 'Antibiotic Resistance', 'Structural Biology'],
    journal: 'Nat. Struct. Mol. Biol.',
    year: '2024',
  },
  {
    id: 'spycatcher-thioamide',
    title: 'SpyCatcher Ligation Kinetics by SpyTag Thioamide Substitution',
    description:
      'Explored how thioamide substitutions in SpyTag peptides modulate the kinetics of the SpyCatcher-SpyTag ligation reaction, a widely used bioconjugation tool. Demonstrates how subtle backbone chemical modifications can tune protein ligation rates, expanding the toolkit for controlled bioconjugation chemistry.',
    image: '/projects/biochem/spycatcher.png',
    paperUrl: 'https://doi.org/10.1101/2024.10.10.617615',
    tags: ['Bioconjugation', 'Thioamides', 'Protein Engineering', 'Chemical Biology', 'Kinetics'],
    journal: 'bioRxiv',
    year: '2024',
  },
  {
    id: 'coa-synuclein-natb',
    title: 'Semi-Synthetic CoA-\u03b1-Synuclein Traps NatB Acetyltransferase',
    description:
      'First semi-synthesis of a bisubstrate inhibitor of N-terminal acetyltransferase NatB, consisting of coenzyme A linked to full-length \u03b1-synuclein via native chemical ligation. Cryo-EM and single-molecule FRET revealed that \u03b1-synuclein remains largely disordered when bound to NatB with its C-terminus expanding \u2014 providing structural insights into this key post-translational modification linked to Parkinson\'s disease.',
    image: '/projects/biochem/coa-natb.png',
    paperUrl: 'https://doi.org/10.1021/jacs.3c03887',
    tags: ['Protein Semi-Synthesis', 'Cryo-EM', 'smFRET', 'N-terminal Acetylation', "Parkinson's Disease"],
    journal: 'J. Am. Chem. Soc.',
    year: '2023',
  },
  {
    id: 'fret-case-studies',
    title: 'FRET with Genetically Encoded Fluorescent Amino Acids',
    description:
      'Presents case studies using the fluorescent amino acid acridonylalanine (Acd) as a genetically encoded FRET probe to measure protein conformational changes and distances. Demonstrates how this minimally perturbing probe enables quantitative estimation of protein structure and dynamics in systems including \u03b1-synuclein and the LexA-RecA complex.',
    image: '/projects/biochem/fret-studies.png',
    paperUrl: 'https://doi.org/10.1002/pro.4633',
    tags: ['FRET', 'Fluorescence', 'Non-Canonical Amino Acids', '\u03b1-Synuclein', 'LexA'],
    journal: 'Protein Sci.',
    year: '2023',
  },
  {
    id: 'synuclein-aggregation-ptms',
    title: '\u03b1-Synuclein Aggregation: Mutations & Post-Translational Modifications',
    description:
      'Comprehensive study of how disease-associated mutations and post-translational modifications affect \u03b1-synuclein in vitro aggregation. Systematically evaluates the effects of familial mutations, phosphorylation, acetylation, and other modifications on fibril formation, providing important context for understanding Parkinson\'s disease pathogenesis.',
    image: '/projects/biochem/synuclein-aggregation.png',
    paperUrl: 'https://doi.org/10.1016/j.jmb.2022.167859',
    tags: ['Post-Translational Modifications', 'Protein Aggregation', "Parkinson's Disease", 'Fibril Formation'],
    journal: 'J. Mol. Biol.',
    year: '2022',
  },
];
