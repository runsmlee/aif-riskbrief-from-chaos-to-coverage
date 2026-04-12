import { describe, it, expect, vi } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { CoverageRecommendations } from './CoverageRecommendations';
import type { RiskAssessment } from '../types';

const mockAssessment: RiskAssessment = {
  score: 72,
  level: 'high',
  factors: ['Existing health conditions', 'Dependents to protect', 'Home ownership'],
  recommendations: [
    {
      id: 'life-1',
      type: 'life',
      title: 'Term Life Insurance',
      description: 'Protect your loved ones with comprehensive life coverage.',
      coverageAmount: '$500K',
      monthlyPremium: '$65',
      priority: 'high',
      benefits: ['Death benefit payout', 'Level premiums', 'Convertible to permanent'],
    },
    {
      id: 'health-1',
      type: 'health',
      title: 'Health Insurance',
      description: 'Comprehensive health coverage for medical expenses.',
      coverageAmount: '$250K',
      monthlyPremium: '$250',
      priority: 'high',
      benefits: ['Hospital coverage', 'Prescription drugs', 'Preventive care'],
    },
    {
      id: 'auto-1',
      type: 'auto',
      title: 'Auto Insurance',
      description: 'Full coverage auto insurance to protect you on the road.',
      coverageAmount: '$100K/$300K',
      monthlyPremium: '$85',
      priority: 'medium',
      benefits: ['Liability coverage', 'Collision coverage'],
    },
  ],
  coverageGapCount: 2,
};

describe('CoverageRecommendations', () => {
  it('renders the results heading', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Your Coverage Recommendations');
  });

  it('renders the risk score label', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Risk Score');
  });

  it('renders the risk level badge', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    // React SSR renders "High Risk" with a comment between words from JSX expression
    expect(html).toContain('High');
    expect(html).toContain('Risk');
    expect(html).toContain('bg-red-100 text-red-700');
  });

  it('renders all recommendation titles', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Term Life Insurance');
    expect(html).toContain('Health Insurance');
    expect(html).toContain('Auto Insurance');
  });

  it('renders priority badges', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    // React SSR renders JSX expressions with comments between them
    expect(html).toContain('High');
    expect(html).toContain('Medium');
    expect(html).toContain('Priority');
  });

  it('renders coverage amounts and monthly premiums', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('$500K');
    expect(html).toContain('$250K');
    expect(html).toContain('$65');
    expect(html).toContain('$250');
  });

  it('renders key risk factors', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Existing health conditions');
    expect(html).toContain('Dependents to protect');
    expect(html).toContain('Home ownership');
  });

  it('renders the monthly total summary card', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Monthly Total');
  });

  it('renders the annual savings card', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Estimated Annual Savings');
  });

  it('renders the total premium banner', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Estimated Total Monthly Premium');
    expect(html).toContain('Combined cost for all recommended coverages');
  });

  it('renders action buttons', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Start New Assessment');
    expect(html).toContain('Download Report');
    expect(html).toContain('Get Quotes');
  });

  it('renders the comparison table toggle', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Comparison Table');
  });

  it('renders the quote modal trigger', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Get Quotes');
  });

  it('renders Get Quotes button to trigger quote modal', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Get Quotes');
  });

  it('renders coverage types summary', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Coverage Types');
  });

  it('renders the risk breakdown chart section', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Risk Breakdown');
  });

  it('applies custom className', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, {
        assessment: mockAssessment,
        onReset: () => {},
        className: 'custom-class',
      })
    );
    expect(html).toContain('custom-class');
  });

  it('renders the subheading text', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Based on your risk profile');
  });

  it('renders benefit expansion toggle', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    // React SSR renders {isExpanded ? 'Hide' : 'View'} as "View<!-- --> key benefits"
    expect(html).toContain('View');
    expect(html).toContain('key benefits');
    expect(html).toContain('aria-expanded');
  });

  it('has proper section semantics', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('aria-labelledby="results-heading"');
  });

  it('renders recommendation descriptions', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Protect your loved ones with comprehensive life coverage.');
    expect(html).toContain('Comprehensive health coverage for medical expenses.');
    expect(html).toContain('Full coverage auto insurance to protect you on the road.');
  });

  it('renders the risk profile card heading', () => {
    const html = renderToString(
      createElement(CoverageRecommendations, { assessment: mockAssessment, onReset: () => {} })
    );
    expect(html).toContain('Your Risk Profile');
  });
});
