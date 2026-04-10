import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { CoverageComparisonTable } from './CoverageComparisonTable';
import type { CoverageRecommendation } from '../types';

const mockRecommendations: CoverageRecommendation[] = [
  {
    id: 'life-1',
    type: 'life',
    title: 'Term Life Insurance',
    description: 'Protect your loved ones.',
    coverageAmount: '$500K',
    monthlyPremium: '$65',
    priority: 'high',
    benefits: ['Death benefit payout', 'Level premiums'],
  },
  {
    id: 'health-1',
    type: 'health',
    title: 'Health Insurance',
    description: 'Comprehensive health coverage.',
    coverageAmount: '$250K',
    monthlyPremium: '$250',
    priority: 'high',
    benefits: ['Hospital coverage', 'Prescription drugs'],
  },
  {
    id: 'auto-1',
    type: 'auto',
    title: 'Auto Insurance',
    description: 'Full coverage auto insurance.',
    coverageAmount: '$100K/$300K',
    monthlyPremium: '$85',
    priority: 'medium',
    benefits: ['Liability coverage'],
  },
];

describe('CoverageComparisonTable', () => {
  it('renders coverage titles', () => {
    const html = renderToString(
      createElement(CoverageComparisonTable, { recommendations: mockRecommendations })
    );
    expect(html).toContain('Term Life Insurance');
    expect(html).toContain('Health Insurance');
    expect(html).toContain('Auto Insurance');
  });

  it('renders coverage amounts', () => {
    const html = renderToString(
      createElement(CoverageComparisonTable, { recommendations: mockRecommendations })
    );
    expect(html).toContain('$500K');
    expect(html).toContain('$250K');
    expect(html).toContain('$100K/$300K');
  });

  it('renders monthly premiums', () => {
    const html = renderToString(
      createElement(CoverageComparisonTable, { recommendations: mockRecommendations })
    );
    expect(html).toContain('$65');
    expect(html).toContain('$250');
    expect(html).toContain('$85');
  });

  it('renders priority badges', () => {
    const html = renderToString(
      createElement(CoverageComparisonTable, { recommendations: mockRecommendations })
    );
    expect(html).toContain('High');
    expect(html).toContain('Medium');
  });

  it('has proper table semantics', () => {
    const html = renderToString(
      createElement(CoverageComparisonTable, { recommendations: mockRecommendations })
    );
    expect(html).toContain('role="table"');
    expect(html).toContain('sr-only');
  });

  it('renders total monthly premium in footer', () => {
    const html = renderToString(
      createElement(CoverageComparisonTable, { recommendations: mockRecommendations })
    );
    expect(html).toContain('Total Monthly');
    // React SSR renders comment nodes between text: $<!-- -->400
    expect(html).toContain('>400<');
  });
});
