export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 'task',
    title: 'TAsk',
    description:
      'A RAG-based research assistant that helps reason through advanced concepts by searching through class documents and references, then generating informed responses with source citations. The capabilities and educational benefits of this system were studied in a real biological chemistry classroom.',
    image: '/projects/task.mp4',
    githubUrl: 'https://github.com/ryannmperez/TAsk',
    tags: ['RAG', 'LLM', 'Google Cloud', 'Python', 'Education Technology', 'Biochemistry', 'Open Source', 'Generative AI'],
  },
  {
    id: 'amyloid-prediction',
    title: 'AggBERT: Amyloid Prediction',
    description:
      'A deep learning framework for predicting amyloid-forming hexapeptides using semi-supervised ProtBERT models. Trained on WALTZ-DB dataset with predictions across a 64M peptide manifold. A useful tool for biologic design.',
    image: '/projects/amyloid-prediction.gif',
    githubUrl: 'https://github.com/ryannmperez/AmyloidPrediction',
    tags: ['Transformers', 'UMAP', 'Semi-Supervised Learning', 'Autoencoders', 'Embeddings', 'Exploratory Data Analysis', 'Class Imbalance'],
  },
  {
    id: 'isotope-incorporation',
    title: 'Isotope Distribution Estimation',
    description:
      'Tools for calculating and visualizing fine isotope patterns in MALDI-TOF data. Includes methods for estimating heavy isotope incorporation fractions in tryptic peptides containing heavy C, N, or H.',
    image: '/projects/isotope-distribution.gif',
    githubUrl: 'https://github.com/ryannmperez/Estimate_Isotope_Incorporation',
    tags: ['Mass Spectrometry (MS)', 'Heavy Isotopes', 'Scientific Computing', 'Python'],
  },
  {
    id: 'alpha-synuclein-binder',
    title: 'Alpha-Synuclein Binder',
    description:
      'A machine learning framework to predict new high-affinity ligands that bind to α-synuclein fibrils, a key pathological feature of Parkinson\'s disease and related synucleinopathies. Trained on fewer than 300 experimentally measured binding affinities, the model identified five new sub-10 nM binders from a 140 million-compound virtual library.',
    image: '/projects/alpha-synuclein.gif',
    githubUrl: 'https://github.com/ryannmperez/alpha-SynucleinBinder',
    tags: ['Virtual Screening', 'Drug Discovery', 'Cheminformatics', 'Machine Learning', 'Parkinson\'s Disease'],
  },
  {
    id: 'hint-token-learning',
    title: 'HintToken Learning',
    description:
      'Novel approach to data augmentation for protein language models using hint tokens for improved model training and inference.',
    image: '/projects/hinttoken.jpeg',
    githubUrl: 'https://github.com/ryannmperez/HintTokenLearning',
    tags: ['Machine Learning', 'NLP', 'Deep Learning', 'PyTorch', 'Data Augmentation'],
  },
  {
    id: 'protein-stability',
    title: 'Protein Stability Prediction',
    description:
      'Large language models for predicting protein stability changes upon mutation. Useful for protein engineering and understanding disease-causing variants.',
    image: '/projects/protein-stability.png',
    githubUrl: 'https://github.com/ryannmperez/ProteinStability',
    tags: ['Protein Engineering', 'Machine Learning', 'Bioinformatics'],
  },
];
