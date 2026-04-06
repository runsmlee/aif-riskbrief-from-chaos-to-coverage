import type { ReactElement } from 'react';

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: '50K+', label: 'Assessments Completed' },
  { value: '4.9/5', label: 'User Satisfaction' },
  { value: '$2.3M', label: 'Savings Identified' },
  { value: '<5 min', label: 'Average Assessment Time' },
];

interface StatsAndCTAProps {
  onStartAssessment: () => void;
  className?: string;
}

export function StatsAndCTA({ onStartAssessment, className = '' }: StatsAndCTAProps): ReactElement {
  return (
    <>
      <section className={`py-12 bg-primary-500 ${className}`} aria-label="Platform statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-primary-100">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900"
          >
            Ready to Find Your Ideal Coverage?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of people who have taken control of their insurance decisions.
            Start your free assessment today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={onStartAssessment}
              className="btn btn-primary text-lg px-8 py-4"
            >
              Start Your Free Assessment
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required. Takes less than 5 minutes.
          </p>
        </div>
      </section>
    </>
  );
}
