import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  paperUrl?: string;
  tags: string[];
  index: number;
  isReversed?: boolean;
}

export default function ProjectCard({
  title,
  description,
  image,
  githubUrl,
  paperUrl,
  tags,
  index,
  isReversed = false,
}: ProjectCardProps) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-stretch ${isReversed ? 'md:[&>*:first-child]:order-2' : ''}`}>
      {/* Description Panel */}
      <div className="gradient-card accent-stripe p-5 md:p-10 h-full flex flex-col justify-center w-full relative">
        {/* Watermark number */}
        <span className="watermark-number">{num}</span>

        {/* Section number label */}
        <span className="font-mono text-xs tracking-[0.15em] text-teal-400/50 mb-4">{num} /</span>

        <h3 className="text-xl md:text-3xl font-bold text-dark-text mb-3 md:mb-6 hover:text-teal-400 transition-colors relative z-10">{title}</h3>
        <p className="text-sm md:text-lg text-dark-muted mb-4 md:mb-8 leading-relaxed relative z-10">{description}</p>
        <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-8 relative z-10">
          {tags.map((tag, i) => {
            const colors = [
              'border-teal-600/30 text-teal-400',
              'border-amber-600/30 text-amber-400',
              'border-rose-600/30 text-rose-300',
              'border-emerald-600/30 text-emerald-400',
              'border-slate-500/30 text-slate-400',
              'border-violet-600/30 text-violet-300',
            ];
            const colorClass = colors[i % colors.length];
            return (
              <span
                key={tag}
                className={`px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm bg-dark-bg/50 border rounded-full ${colorClass}`}
              >
                {tag}
              </span>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-4 md:gap-6 relative z-10">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm md:text-lg text-teal-400 hover:text-teal-300 transition-colors w-fit"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
          {paperUrl && (
            <a
              href={paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm md:text-lg text-[#d4a574] hover:text-[#e0b88a] transition-colors w-fit"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              Paper
            </a>
          )}
        </div>
      </div>

      {/* Image/Video Panel */}
      <div className="gradient-card overflow-hidden aspect-video md:aspect-[4/3] relative min-h-[200px] md:min-h-[400px] w-full">
        {image.endsWith('.mp4') ? (
          <video
            src={image}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-contain"
          />
        ) : (
          <Image
            src={image}
            alt={`${title} preview`}
            fill
            className="object-contain"
          />
        )}
      </div>
    </div>
  );
}
