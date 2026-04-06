import type { ReactElement } from 'react';
import type { RiskAssessment, CoverageRecommendation } from '../types';

interface CoverageRecommendationsProps {
  assessment: RiskAssessment;
  onReset: () => void;
  className?: string;
}

const priorityColors = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};

const typeIcons: Record<CoverageRecommendation['type'], ReactElement> = {
  life: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  health: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  auto: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  home: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  disability: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

function RiskScoreGauge({ score }: { score: number }): ReactElement {
  const getScoreColor = (s: number): string => {
    if (s < 40) return 'text-green-500';
    if (s < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (s: number): string => {
    if (s < 40) return 'bg-green-500';
    if (s < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-gray-200"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={getScoreBgColor(score)}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${score}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">Risk Score</p>
    </div>
  );
}

export function CoverageRecommendations({
  assessment,
  onReset,
  className = '',
}: CoverageRecommendationsProps): ReactElement {
  const totalMonthly = assessment.recommendations.reduce((sum, rec) => {
    const premium = parseFloat(rec.monthlyPremium.replace('$', ''));
    return sum + (isNaN(premium) ? 0 : premium);
  }, 0);

  return (
    <section
      className={`py-16 sm:py-24 bg-gray-50 ${className}`}
      aria-labelledby="results-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="results-heading" className="text-3xl sm:text-4xl font-bold text-gray-900">
            Your Coverage Recommendations
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Based on your risk profile, here are our personalized recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="card text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Risk Profile</h3>
              <RiskScoreGauge score={assessment.score} />
              <div className="mt-6">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    assessment.level === 'low'
                      ? 'bg-green-100 text-green-700'
                      : assessment.level === 'moderate'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {assessment.level.charAt(0).toUpperCase() + assessment.level.slice(1)} Risk
                </span>
              </div>
              {assessment.factors.length > 0 && (
                <div className="mt-6 text-left">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Factors:</h4>
                  <ul className="space-y-1">
                    {assessment.factors.map((factor, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-4">
              {assessment.recommendations.map((recommendation) => (
                <article
                  key={recommendation.id}
                  className="card hover:border-primary-200 border border-transparent"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-500 flex-shrink-0">
                      {typeIcons[recommendation.type]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {recommendation.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {recommendation.description}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${
                            priorityColors[recommendation.priority]
                          }`}
                        >
                          {recommendation.priority.charAt(0).toUpperCase() +
                            recommendation.priority.slice(1)}{' '}
                          Priority
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-6">
                        <div>
                          <p className="text-xs text-gray-500">Coverage Amount</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {recommendation.coverageAmount}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Monthly Premium</p>
                          <p className="text-lg font-semibold text-primary-500">
                            {recommendation.monthlyPremium}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs text-gray-500 mb-2">Key Benefits</p>
                        <div className="flex flex-wrap gap-2">
                          {recommendation.benefits.map((benefit, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-primary-50 border border-primary-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Estimated Total Monthly Premium
              </h3>
              <p className="text-gray-600">
                Combined cost for all recommended coverages
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary-500">
                ${totalMonthly.toFixed(0)}
              </p>
              <p className="text-sm text-gray-500">per month</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={onReset}
            className="btn btn-secondary"
          >
            Start New Assessment
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              alert('This feature would connect you with insurance providers in a full implementation.');
            }}
          >
            Get Quotes
          </button>
        </div>
      </div>
    </section>
  );
}
