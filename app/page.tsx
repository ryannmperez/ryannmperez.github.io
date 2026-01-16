import ProjectGrid from '@/components/ProjectGrid';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-28">
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold gradient-text mb-4 md:mb-8">
            Ryann Perez
          </h1>
          <p className="text-base md:text-2xl text-dark-muted max-w-3xl mx-auto mb-6 md:mb-10">
            Computational Biochemist specializing in machine learning, protein science,
            and generative AI. Building impactful AI systems at the intersection of deep learning and biology.
          </p>
          <div className="flex justify-center gap-3 md:gap-6">
            <a
              href="https://github.com/ryannmperez"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-8 md:py-4 text-sm md:text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg md:rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <a
              href="/resume"
              className="inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-8 md:py-4 text-sm md:text-lg border border-purple-500/40 text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/60 rounded-lg md:rounded-xl transition-all"
            >
              View Resume
            </a>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <ProjectGrid />
    </>
  );
}
