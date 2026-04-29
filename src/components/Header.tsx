import { useState, useCallback, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps): ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Close mobile menu on hash navigation
  useEffect(() => {
    function handleHashChange(): void {
      setMobileMenuOpen(false);
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    function handleScroll(): void {
      setIsScrolled(window.scrollY > 10);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    function handleClickOutside(event: MouseEvent): void {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white/80 backdrop-blur-sm shadow-sm'
      } ${className}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2 group" aria-label="RiskBrief Home">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary-200">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-primary-500 transition-colors">RiskBrief</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            <a
              href="#features"
              className="px-4 py-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-all duration-200 font-medium"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="px-4 py-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-all duration-200 font-medium"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="px-4 py-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-all duration-200 font-medium"
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="px-4 py-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-all duration-200 font-medium"
            >
              FAQ
            </a>
            <a
              href="#assessment"
              className="btn btn-primary text-sm ml-4"
            >
              Get Started
            </a>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors focus-visible:outline-2 focus-visible:outline-primary-500"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 text-gray-600 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-label="Mobile navigation"
          aria-hidden={!mobileMenuOpen}
        >
          <div className="border-t border-gray-100 py-4">
            <div className="flex flex-col gap-1">
              <a
                href="#features"
                className="px-4 py-3 text-gray-600 hover:text-primary-500 hover:bg-primary-50 active:bg-primary-100 rounded-lg transition-all duration-200 font-medium flex items-center gap-3"
                onClick={closeMobileMenu}
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Features
              </a>
              <a
                href="#how-it-works"
                className="px-4 py-3 text-gray-600 hover:text-primary-500 hover:bg-primary-50 active:bg-primary-100 rounded-lg transition-all duration-200 font-medium flex items-center gap-3"
                onClick={closeMobileMenu}
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                How It Works
              </a>
              <a
                href="#testimonials"
                className="px-4 py-3 text-gray-600 hover:text-primary-500 hover:bg-primary-50 active:bg-primary-100 rounded-lg transition-all duration-200 font-medium flex items-center gap-3"
                onClick={closeMobileMenu}
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Testimonials
              </a>
              <a
                href="#faq"
                className="px-4 py-3 text-gray-600 hover:text-primary-500 hover:bg-primary-50 active:bg-primary-100 rounded-lg transition-all duration-200 font-medium flex items-center gap-3"
                onClick={closeMobileMenu}
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                FAQ
              </a>
              <a
                href="#assessment"
                className="btn btn-primary text-center mt-2"
                onClick={closeMobileMenu}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
