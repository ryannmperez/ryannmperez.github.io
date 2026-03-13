'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Computational Projects' },
  { href: '/biochemistry', label: 'Biochemistry' },
  { href: '/resume', label: 'Resume' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-[#0a0f1a]/80 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold gradient-text-cyan hover:opacity-80 transition-opacity">
              Ryann Perez
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative flex items-center gap-2 font-mono text-sm tracking-wide uppercase text-[#d4cdc0]/50 hover:text-teal-400 transition-colors duration-300"
                >
                  {pathname === link.href && (
                    <span className="w-1 h-1 rounded-full bg-teal-400" />
                  )}
                  {link.label}
                </Link>
              ))}
              <a
                href="https://github.com/ryannmperez"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm tracking-wide uppercase text-[#d4cdc0]/50 hover:text-teal-400 transition-colors duration-300"
              >
                GitHub
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#d4cdc0]/50 hover:text-teal-400 transition-colors duration-300"
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
        </nav>
      </div>

      <div className="glow-line" />

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0a0f1a]/95 backdrop-blur-xl px-4 py-4">
          <div className="max-w-7xl mx-auto flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 font-mono text-sm tracking-wide uppercase text-[#d4cdc0]/50 hover:text-teal-400 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {pathname === link.href && (
                  <span className="w-1 h-1 rounded-full bg-teal-400" />
                )}
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/ryannmperez"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm tracking-wide uppercase text-[#d4cdc0]/50 hover:text-teal-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
