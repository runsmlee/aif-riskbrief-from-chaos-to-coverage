import { useState, useEffect, useCallback } from 'react';
import type { ReactElement } from 'react';
import type { RiskAssessment, CoverageRecommendation, AssessmentHistoryEntry } from '../types';
import { ASSESSMENT_STORAGE_KEY } from '../types';
import { Modal } from './Modal';
import { RiskBreakdownChart } from './RiskBreakdownChart';
import { CoverageComparisonTable } from './CoverageComparisonTable';
import { downloadReport } from '../utils/reportGenerator';

interface CoverageRecommendationsProps {
  assessment: RiskAssessment;
  onReset: () => void;
  onRestore?: (assessment: RiskAssessment) => void;
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

const typeLabels: Record<CoverageRecommendation['type'], string> = {
  life: 'Life',
  health: 'Health',
  auto: 'Auto',
  home: 'Home',
  disability: 'Disability',
};

function RiskScoreGauge({ score, level }: { score: number; level: string }): ReactElement {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const startTime = Date.now();

    function animate(): void {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const getScoreColor = (): { stroke: string; text: string } => {
    if (score < 40) return { stroke: '#22c55e', text: 'text-green-500' };
    if (score < 70) return { stroke: '#eab308', text: 'text-yellow-500' };
    return { stroke: '#ef4444', text: 'text-red-500' };
  };

  const getLevelColor = (): string => {
    if (level === 'low') return 'bg-green-100 text-green-700';
    if (level === 'moderate') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const colors = getScoreColor();

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <circle
            className="text-gray-200"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            cx="18"
            cy="18"
            r="15.9155"
          />
          <circle
            stroke={colors.stroke}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${animatedScore}, 100`}
            cx="18"
            cy="18"
            r="15.9155"
            className="transition-all duration-100 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${colors.text} tabular-nums`}>
            {animatedScore}
          </span>
          <span className="text-xs text-gray-400">of 100</span>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">Risk Score</p>
      <div className="mt-3">
        <span
          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getLevelColor()}`}
        >
          {level.charAt(0).toUpperCase() + level.slice(1)} Risk
        </span>
      </div>
    </div>
  );
}

function RecommendationCard({
  recommendation,
  index,
}: {
  recommendation: CoverageRecommendation;
  index: number;
}): ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article
      className="card hover:border-primary-200 border border-transparent animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-500 flex-shrink-0">
          {typeIcons[recommendation.type]}
        </div>
        <div className="flex-1 min-w-0">
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

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1 transition-colors"
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Hide' : 'View'} key benefits
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-wrap gap-2">
              {recommendation.benefits.map((benefit, bIndex) => (
                <span
                  key={bIndex}
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
  );
}

export function CoverageRecommendations({
  assessment,
  onReset,
  onRestore,
  className = '',
}: CoverageRecommendationsProps): ReactElement {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showCompareView, setShowCompareView] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [history, setHistory] = useState<AssessmentHistoryEntry[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ASSESSMENT_STORAGE_KEY);
      if (stored) {
        const parsed: AssessmentHistoryEntry[] = JSON.parse(stored);
        setHistory(parsed.slice(0, 3));
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const totalMonthly = assessment.recommendations.reduce((sum, rec) => {
    const premium = parseFloat(rec.monthlyPremium.replace('$', ''));
    return sum + (isNaN(premium) ? 0 : premium);
  }, 0);

  const gapCount = assessment.coverageGapCount ?? 1;
  const savingsRate = gapCount >= 3 ? 0.18 : gapCount >= 1 ? 0.12 : 0.08;
  const estimatedAnnualSavings = Math.round(totalMonthly * 12 * savingsRate);
  const coverageTypes = assessment.recommendations.map((r) => typeLabels[r.type]);

  const handleDownloadReport = useCallback(() => {
    downloadReport(assessment);
  }, [assessment]);

  const riskFactorData = [
    { label: 'Age Factor', value: assessment.score > 50 ? 15 : 5, maxValue: 20, color: '#ef4444' },
    { label: 'Health Profile', value: assessment.factors.includes('Existing health conditions') ? 15 : 5, maxValue: 20, color: '#f97316' },
    { label: 'Asset Protection', value: (assessment.factors.includes('Home ownership') ? 5 : 0) + (assessment.factors.includes('Vehicle ownership') ? 5 : 0), maxValue: 15, color: '#eab308' },
    { label: 'Dependency Risk', value: assessment.factors.includes('Dependents to protect') ? 10 : 3, maxValue: 15, color: '#3b82f6' },
    { label: 'Overall Exposure', value: Math.round(assessment.score / 5), maxValue: 20, color: '#8b5cf6' },
  ];

  return (
    <section
      className={`py-16 sm:py-24 bg-gray-50 ${className}`}
      aria-labelledby="results-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 id="results-heading" className="text-3xl sm:text-4xl font-bold text-gray-900">
            Your Coverage Recommendations
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Based on your risk profile, here are our personalized recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left sidebar - Risk Profile */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card text-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Risk Profile</h3>
              <RiskScoreGauge score={assessment.score} level={assessment.level} />
              {assessment.factors.length > 0 && (
                <div className="mt-6 text-left">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Factors:</h4>
                  <ul className="space-y-1">
                    {assessment.factors.map((factor, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Risk Factor Breakdown Chart */}
            <div className="card animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Breakdown</h3>
              <RiskBreakdownChart factors={riskFactorData} />
            </div>
          </div>

          {/* Right side - Recommendations */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {assessment.recommendations.map((recommendation, index) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Toggle */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <button
            type="button"
            onClick={() => setShowCompareView(!showCompareView)}
            className="flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold transition-colors mx-auto"
            aria-expanded={showCompareView}
          >
            <svg className={`w-5 h-5 transition-transform duration-200 ${showCompareView ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {showCompareView ? 'Hide' : 'Show'} Comparison Table
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 mt-4 ${
              showCompareView ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="card p-0 overflow-hidden">
              <CoverageComparisonTable recommendations={assessment.recommendations} />
            </div>
          </div>
        </div>

        {/* Previous Assessments History */}
        {history.length > 0 && (
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Assessments</h3>
            <div className="space-y-3">
              {history.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  className="w-full text-left card hover:border-primary-200 border border-transparent transition-all"
                  onClick={() => {
                    onRestore?.(entry.assessment);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Risk Score: {entry.assessment.score}/100 &middot; {entry.assessment.recommendations.length} recommendations
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary-500">
                        ${entry.totalMonthlyPremium.toFixed(0)}/mo
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="card bg-primary-50 border border-primary-100 text-center">
            <p className="text-sm text-primary-600 font-medium">Monthly Total</p>
            <p className="text-2xl font-bold text-primary-600 mt-1">${totalMonthly.toFixed(0)}</p>
          </div>
          <div className="card bg-green-50 border border-green-100 text-center">
            <p className="text-sm text-green-600 font-medium">Estimated Annual Savings</p>
            <p className="text-2xl font-bold text-green-600 mt-1">${estimatedAnnualSavings}</p>
          </div>
          <div className="card bg-blue-50 border border-blue-100 text-center">
            <p className="text-sm text-blue-600 font-medium">Coverage Types</p>
            <p className="text-sm font-semibold text-blue-600 mt-1">{coverageTypes.join(' \u2022 ')}</p>
          </div>
        </div>

        {/* Total Premium Summary */}
        <div className="card bg-gradient-to-r from-primary-500 to-primary-600 border-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Estimated Total Monthly Premium
              </h3>
              <p className="text-primary-100">
                Combined cost for all recommended coverages
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white tabular-nums">
                ${totalMonthly.toFixed(0)}
              </p>
              <p className="text-sm text-primary-100">per month</p>
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
            onClick={handleDownloadReport}
            className="btn bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Report
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowQuoteModal(true)}
          >
            Get Quotes
          </button>
        </div>
      </div>

      {/* Quote Modal */}
      <Modal
        isOpen={showQuoteModal}
        onClose={() => { setShowQuoteModal(false); setQuoteSubmitted(false); }}
        title="Connect with Insurance Providers"
      >
        <div className="space-y-4">
          {quoteSubmitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quote Request Submitted</h3>
              <p className="text-gray-600">
                A licensed insurance provider will reach out to you within 24 hours with
                personalized quotes based on your risk profile.
              </p>
              <button
                type="button"
                className="btn btn-secondary mt-6"
                onClick={() => { setShowQuoteModal(false); setQuoteSubmitted(false); }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600">
                Submit your contact information to receive personalized quotes from
                licensed insurance providers based on your risk profile.
              </p>
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
                <h4 className="font-semibold text-primary-700 mb-2">Your Summary</h4>
                <ul className="text-sm text-primary-600 space-y-1">
                  <li>Risk Score: {assessment.score}/100 ({assessment.level})</li>
                  <li>Recommended Coverages: {assessment.recommendations.length}</li>
                  <li>Estimated Monthly: ${totalMonthly.toFixed(0)}</li>
                </ul>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const email = formData.get('quote-email') as string;
                  const phone = formData.get('quote-phone') as string;
                  if (!email?.trim()) return;

                  const quoteRequest = {
                    email: email.trim(),
                    phone: phone?.trim() || null,
                    riskScore: assessment.score,
                    riskLevel: assessment.level,
                    recommendationCount: assessment.recommendations.length,
                    estimatedMonthly: totalMonthly,
                    submittedAt: new Date().toISOString(),
                  };

                  try {
                    const existing = JSON.parse(localStorage.getItem('riskbrief-quote-requests') || '[]');
                    existing.push(quoteRequest);
                    localStorage.setItem('riskbrief-quote-requests', JSON.stringify(existing));
                  } catch {
                    // localStorage unavailable
                  }
                  setQuoteSubmitted(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label htmlFor="quote-email" className="label">Email Address</label>
                  <input
                    type="email"
                    id="quote-email"
                    name="quote-email"
                    className="input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="quote-phone" className="label">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    id="quote-phone"
                    name="quote-phone"
                    className="input"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                >
                  Request Quotes
                </button>
              </form>
              <p className="text-xs text-gray-400 text-center">
                By submitting, you agree to be contacted by licensed insurance providers.
              </p>
            </>
          )}
        </div>
      </Modal>
    </section>
  );
}
