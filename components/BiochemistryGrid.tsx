import BiochemistryCard from './BiochemistryCard';
import { biochemProjects } from '@/data/biochemistry';

export default function BiochemistryGrid() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
      {/* Section heading with label line */}
      <div className="section-label mb-8 md:mb-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-[0.15em] text-teal-400/50">PUBLICATIONS</span>
          <h2 className="text-2xl md:text-4xl font-bold gradient-text">Biochemistry Publications</h2>
        </div>
      </div>

      <div className="flex flex-col gap-10 md:gap-24">
        {biochemProjects.map((project, index) => (
          <BiochemistryCard
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            paperUrl={project.paperUrl}
            tags={project.tags}
            journal={project.journal}
            year={project.year}
            status={project.status}
            index={index}
            isReversed={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
