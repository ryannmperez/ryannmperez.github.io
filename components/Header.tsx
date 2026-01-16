'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity">
            Ryann Perez
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-dark-muted hover:text-dark-accent transition-colors">
              Computational Projects
            </Link>
            <Link href="/resume" className="text-dark-muted hover:text-dark-accent transition-colors">
              Resume
            </Link>
            <a
              href="https://github.com/ryannmperez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-muted hover:text-dark-accent transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-dark-muted hover:text-dark-text"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-dark-muted hover:text-dark-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Computational Projects
              </Link>
              <Link
                href="/resume"
                className="text-dark-muted hover:text-dark-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Resume
              </Link>
              <a
                href="https://github.com/ryannmperez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-muted hover:text-dark-accent transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
