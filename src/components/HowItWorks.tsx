import { memo } from 'react';
import type { ReactElement } from 'react';
import { useScrollReveal } from '../hooks';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: ReactElement;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Answer Questions',
    description: 'Complete our quick assessment about your lifestyle, health, and assets. Takes about 5 minutes.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: 2,
    title: 'Get Your Risk Profile',
    description: 'Our algorithm analyzes your responses and creates a personalized risk assessment.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    number: 3,
    title: 'Review Recommendations',
    description: 'Receive tailored coverage recommendations with clear explanations and cost estimates.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: 4,
    title: 'Take Action',
    description: 'Connect with trusted providers or download your report to compare options.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

interface HowItWorksProps {
  className?: string;
}

function HowItWorksInner({ className = '' }: HowItWorksProps): ReactElement {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="how-it-works"
      className={`py-16 sm:py-24 bg-gray-50 ${className}`}
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900"
          >
            How RiskBrief Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get from confusion to clarity in four simple steps
          </p>
        </div>

        <div ref={ref} className="mt-16 relative">
          {/* Connecting line - desktop */}
          <div
            className="hidden lg:block absolute top-8 left-[calc(12.5%+12px)] right-[calc(12.5%+12px)] h-0.5 bg-primary-200"
            aria-hidden="true"
          >
            <div
              className="h-full bg-primary-500 transition-all duration-1000 ease-out"
              style={{ width: isVisible ? '100%' : '0%', transitionDelay: '300ms' }}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative text-center transition-all duration-500 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative z-10 w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-lg shadow-primary-200">
                  {step.number}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const HowItWorks = memo(HowItWorksInner);
