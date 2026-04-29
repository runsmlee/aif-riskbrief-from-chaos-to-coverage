import { useEffect, useState, useCallback } from 'react';
import type { ReactElement } from 'react';
import { useScrollReveal } from '../hooks';

interface HeroProps {
  onStartAssessment: () => void;
  className?: string;
}

export function Hero({ onStartAssessment, className = '' }: HeroProps): ReactElement {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref: vizRef, isVisible: vizVisible } = useScrollReveal({ threshold: 0.2 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onStartAssessment();
    }
  }, [onStartAssessment]);

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
                Free Risk Assessment Tool
              </div>

              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
              >
                From Chaos to{' '}
                <span className="gradient-text">Coverage</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Navigate insurance with confidence. Get personalized coverage recommendations
                based on your unique risk profile in minutes, not hours.
              </p>
            </div>

            <div
              className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-200 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                type="button"
                onClick={onStartAssessment}
                className="btn btn-primary text-lg px-8 py-4 group"
              >
                Start Free Assessment
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
                <span>Free Assessment</span>
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
                <span>Expert Insights</span>
              </div>
            </div>
          </div>

          {/* Right column - Visual card */}
          <div
            ref={vizRef}
            className={`hidden md:block relative transition-all duration-700 ease-out ${
              vizVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative rotated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl transform rotate-3 shadow-lg" />
              {/* Decorative dots pattern */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200/40 rounded-full blur-xl" aria-hidden="true" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-300/30 rounded-full blur-xl" aria-hidden="true" />
              {/* Main card */}
              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100/50">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Risk Score</p>
                      <p className="text-2xl font-bold text-gray-900">Moderate</p>
                    </div>
                  </div>

                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/5 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full animate-progress" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">Life Coverage</p>
                      <p className="text-lg font-semibold text-gray-900">$500K</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">Health Coverage</p>
                      <p className="text-lg font-semibold text-gray-900">$250K</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">Auto Coverage</p>
                      <p className="text-lg font-semibold text-gray-900">$100K</p>
                    </div>
                    <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
                      <p className="text-xs text-primary-600 mb-1">Monthly Premium</p>
                      <p className="text-lg font-semibold text-primary-600">$127</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">You could save $180/year</span>
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
