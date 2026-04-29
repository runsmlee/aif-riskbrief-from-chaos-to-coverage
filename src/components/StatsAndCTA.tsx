import type { ReactElement } from 'react';
import { useScrollReveal, useAnimatedCounter } from '../hooks';

interface StatItem {
  value: string;
  label: string;
  numericValue: number;
  suffix: string;
}

const stats: StatItem[] = [
  { value: '50K+', label: 'Assessments Completed', numericValue: 50, suffix: 'K+' },
  { value: '4.9/5', label: 'User Satisfaction', numericValue: 49, suffix: '/5' },
  { value: '$2.3M', label: 'Savings Identified', numericValue: 23, suffix: 'M' },
  { value: '<5 min', label: 'Average Assessment Time', numericValue: 5, suffix: ' min' },
];

function AnimatedStat({ stat, isActive }: { stat: StatItem; isActive: boolean }): ReactElement {
  const count = useAnimatedCounter(stat.numericValue, 1500, isActive);

  const formatValue = (): string => {
    if (stat.suffix === '/5') {
      return `${(count / 10).toFixed(1)}${stat.suffix}`;
    }
    if (stat.suffix === 'M') {
      return `$${(count / 10).toFixed(1)}${stat.suffix}`;
    }
    if (stat.suffix === ' min') {
      return count > 0 ? `<${count}${stat.suffix}` : stat.value;
    }
    return `${count}${stat.suffix}`;
  };

  return (
    <div className="text-center">
      <p
        className="text-3xl sm:text-4xl font-bold text-white tabular-nums"
        aria-label={stat.value}
      >
        {formatValue()}
      </p>
      <p className="mt-1 text-sm text-primary-100">
        {stat.label}
      </p>
    </div>
  );
}

interface StatsAndCTAProps {
  onStartAssessment: () => void;
  className?: string;
}

export function StatsAndCTA({ onStartAssessment, className = '' }: StatsAndCTAProps): ReactElement {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <>
      <section className={`py-12 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 ${className}`} aria-label="Platform statistics">
        <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <AnimatedStat
                key={stat.label}
                stat={stat}
                isActive={isVisible}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-24 bg-white relative overflow-hidden"
        aria-labelledby="cta-heading"
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-50 rounded-full opacity-30 -translate-y-1/2" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              className="btn btn-primary text-lg px-8 py-4 group"
            >
              Start Your Free Assessment
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
          </div>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required. Takes less than 5 minutes.
          </p>
        </div>
      </section>
    </>
  );
}
