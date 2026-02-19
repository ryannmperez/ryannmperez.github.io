import Image from 'next/image';

interface BiochemistryCardProps {
  title: string;
  description: string;
  image: string;
  paperUrl: string;
  tags: string[];
  journal: string;
  year: string;
  status?: string;
  isReversed?: boolean;
}

export default function BiochemistryCard({
  title,
  description,
  image,
  paperUrl,
  tags,
  journal,
  year,
  status,
  isReversed = false,
}: BiochemistryCardProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-stretch ${isReversed ? 'md:[&>*:first-child]:order-2' : ''}`}>
      {/* Description Panel */}
      <div className="bg-dark-card border border-dark-border rounded-lg md:rounded-xl p-5 md:p-10 h-full flex flex-col justify-center w-full card-glow">
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
          {journal && (
            <span className="px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm bg-purple-500/10 border border-purple-500/40 text-purple-400 rounded-full font-medium">
              {journal}
            </span>
          )}
          {year && (
            <span className="px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm bg-blue-500/10 border border-blue-500/40 text-blue-400 rounded-full font-medium">
              {year}
            </span>
          )}
          {status && (
            <span className="px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm bg-amber-500/10 border border-amber-500/40 text-amber-400 rounded-full font-medium">
              {status}
            </span>
          )}
        </div>
        <h3 className="text-xl md:text-3xl font-bold text-dark-text mb-3 md:mb-6 hover:text-purple-400 transition-colors">{title}</h3>
        <p className="text-sm md:text-lg text-dark-muted mb-4 md:mb-8 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-8">
          {tags.map((tag, index) => {
            const colors = [
              'border-blue-500/40 text-blue-400',
              'border-purple-500/40 text-purple-400',
              'border-pink-500/40 text-pink-400',
              'border-cyan-500/40 text-cyan-400',
              'border-emerald-500/40 text-emerald-400',
              'border-amber-500/40 text-amber-400',
            ];
            const colorClass = colors[index % colors.length];
            return (
              <span
                key={tag}
                className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-base bg-dark-bg border rounded-full ${colorClass}`}
              >
                {tag}
              </span>
            );
          })}
        </div>
        {paperUrl ? (
          <a
            href={paperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm md:text-lg text-purple-400 hover:text-blue-400 transition-colors w-fit"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            View Paper
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm md:text-lg text-dark-muted w-fit">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            In Preparation
          </span>
        )}
      </div>

      {/* Image Panel */}
      <div className="bg-dark-card border border-dark-border rounded-lg md:rounded-xl overflow-hidden aspect-video md:aspect-[4/3] relative min-h-[200px] md:min-h-[400px] w-full card-glow">
        <Image
          src={image}
          alt={`${title} preview`}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
