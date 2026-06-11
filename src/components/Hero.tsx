import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { useScrollReveal } from '../hooks';

interface HeroProps {
  onStartAssessment: () => void;
  className?: string;
}

interface CoverageConcern {
  id: string;
  label: string;
  icon: string;
}

const concerns: CoverageConcern[] = [
  { id: 'life', label: 'Life', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { id: 'health', label: 'Health', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { id: 'auto', label: 'Auto', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { id: 'home', label: 'Home', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { id: 'disability', label: 'Disability', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
];

export function Hero({ onStartAssessment, className = '' }: HeroProps): ReactElement {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredConcern, setHoveredConcern] = useState<string | null>(null);
  const { ref: vizRef, isVisible: vizVisible } = useScrollReveal({ threshold: 0.2 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50/30 ${className}`}
      aria-labelledby="hero-heading"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1f2937 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left column - Text */}
          <div className="text-center lg:text-left">
            <div
              className={`transition-all duration-700 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-sm text-primary-700 font-medium mb-6 shadow-sm">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-dot" aria-hidden="true" />
                Most people have gaps they don&apos;t know about. Find yours.
              </div>

              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
              >
                Find Your{' '}
                <span className="gradient-text">Insurance Coverage Gaps</span>{' '}
                — Free 5-Minute Check
              </h1>
              <h2 className="mt-4 text-lg sm:text-xl font-semibold text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-snug">
                Answer 12 questions about your life, health, auto &amp; home policies to find duplicate coverage and liability gaps.
              </h2>
              <ul className="mt-4 space-y-2 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 font-bold flex-shrink-0 mt-0.5" aria-hidden="true">→</span>
                  <span>Your credit card may already cover rental car damage, but you&apos;re paying $15/month for it on your auto policy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 font-bold flex-shrink-0 mt-0.5" aria-hidden="true">→</span>
                  <span>Your employer life insurance is 1x salary, but your mortgage alone is 3x salary</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 font-bold flex-shrink-0 mt-0.5" aria-hidden="true">→</span>
                  <span>Your homeowner&apos;s policy covers fire but not flood — and 1 in 4 flood claims come from low-risk zones</span>
                </li>
              </ul>
            </div>

            <div
              className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-200 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                type="button"
                onClick={onStartAssessment}
                className="btn btn-primary text-lg px-10 py-5 shadow-lg shadow-primary-500/30 group"
              >
                Find My Gaps — 12 Questions
                <svg
                  className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <a
                href="#how-it-works"
                className="btn btn-secondary text-lg px-8 py-4"
              >
                Learn More
              </a>
            </div>

            <div
              className={`mt-10 flex items-center justify-center lg:justify-start gap-6 sm:gap-8 text-sm text-gray-500 transition-all duration-700 delay-300 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free Gap Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>12 Questions, 5 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>5-Minute Process</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No Sign-Up Required</span>
              </div>
            </div>
          </div>

          {/* Right column - Interactive quick-start widget */}
          <div
            ref={vizRef}
            className={`hidden md:block relative transition-all duration-700 ease-out ${
              vizVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Decorative rotated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl transform rotate-3 shadow-lg" />
              {/* Decorative dots pattern */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200/40 rounded-full blur-xl" aria-hidden="true" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-300/30 rounded-full blur-xl" aria-hidden="true" />
              {/* Main card */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100/50">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <p className="text-lg font-bold text-gray-900">What worries you most?</p>
                    <p className="text-sm text-gray-500 mt-1">Pick one to start your analysis</p>
                  </div>

                  <div className="space-y-3" role="group" aria-label="Coverage concern options">
                    {concerns.map((concern) => (
                      <button
                        key={concern.id}
                        type="button"
                        onClick={onStartAssessment}
                        onMouseEnter={() => setHoveredConcern(concern.id)}
                        onMouseLeave={() => setHoveredConcern(null)}
                        onFocus={() => setHoveredConcern(concern.id)}
                        onBlur={() => setHoveredConcern(null)}
                        className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl border-2 transition-all duration-200 text-left group focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 ${
                          hoveredConcern === concern.id
                            ? 'border-primary-400 bg-primary-50 shadow-md translate-x-1'
                            : 'border-gray-100 bg-gray-50 hover:border-primary-200 hover:bg-primary-50/50'
                        }`}
                        aria-label={`Start analysis for ${concern.label} insurance`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                          hoveredConcern === concern.id
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-500'
                        }`}>
                          <span className="text-sm font-bold">{concern.label.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold text-sm transition-colors duration-200 ${
                            hoveredConcern === concern.id ? 'text-primary-700' : 'text-gray-700'
                          }`}>
                            {`${concern.label} Insurance`}
                          </p>
                        </div>
                        <svg
                          className={`w-5 h-5 transition-all duration-200 ${
                            hoveredConcern === concern.id
                              ? 'text-primary-500 translate-x-0'
                              : 'text-gray-300 group-hover:text-primary-300'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">100% free — no sign-up, no spam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
