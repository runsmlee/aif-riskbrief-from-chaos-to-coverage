interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Answer Questions',
    description: 'Complete our quick assessment about your lifestyle, health, and assets. Takes about 5 minutes.',
  },
  {
    number: 2,
    title: 'Get Your Risk Profile',
    description: 'Our algorithm analyzes your responses and creates a personalized risk assessment.',
  },
  {
    number: 3,
    title: 'Review Recommendations',
    description: 'Receive tailored coverage recommendations with clear explanations and cost estimates.',
  },
  {
    number: 4,
    title: 'Take Action',
    description: 'Connect with trusted providers or download your report to compare options.',
  },
];

import type { ReactElement } from 'react';

interface HowItWorksProps {
  className?: string;
}

export function HowItWorks({ className = '' }: HowItWorksProps): ReactElement {
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

        <div className="mt-16 relative">
          <div
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary-200 -translate-y-1/2"
            aria-hidden="true"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="relative z-10 w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-lg">
                  {step.number}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-600">
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
