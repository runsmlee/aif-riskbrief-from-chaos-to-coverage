import { useState, useCallback, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps): ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
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
    <header className={`bg-white shadow-sm sticky top-0 z-50 ${className}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2" aria-label="RiskBrief Home">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
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
            <span className="text-xl font-bold text-gray-900">RiskBrief</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-primary-500 transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-primary-500 transition-colors font-medium"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-primary-500 transition-colors font-medium"
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="text-gray-600 hover:text-primary-500 transition-colors font-medium"
            >
              FAQ
            </a>
            <a
              href="#assessment"
              className="btn btn-primary text-sm"
            >
              Get Started
            </a>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            ref={menuRef}
            className="md:hidden border-t border-gray-100 py-4 animate-fade-in"
            role="menu"
          >
            <div className="flex flex-col gap-2">
              <a
                href="#features"
                className="px-4 py-3 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                role="menuitem"
                onClick={closeMobileMenu}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="px-4 py-3 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                role="menuitem"
                onClick={closeMobileMenu}
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="px-4 py-3 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                role="menuitem"
                onClick={closeMobileMenu}
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className="px-4 py-3 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                role="menuitem"
                onClick={closeMobileMenu}
              >
                FAQ
              </a>
              <a
                href="#assessment"
                className="btn btn-primary text-center mt-2"
                role="menuitem"
                onClick={closeMobileMenu}
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
