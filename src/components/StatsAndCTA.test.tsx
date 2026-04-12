import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StatsAndCTA } from './StatsAndCTA';

describe('StatsAndCTA', () => {
  it('renders the stats section', () => {
    const html = renderToString(
      createElement(StatsAndCTA, { onStartAssessment: () => {} })
    );
    expect(html).toContain('Assessments Completed');
    expect(html).toContain('User Satisfaction');
  });

  it('renders stat labels', () => {
    const html = renderToString(
      createElement(StatsAndCTA, { onStartAssessment: () => {} })
    );
    // Animated counter starts at 0 during SSR (IntersectionObserver has not fired)
    expect(html).toContain('0K+');
    expect(html).toContain('Savings Identified');
  });

  it('renders the average assessment time stat', () => {
    const html = renderToString(
      createElement(StatsAndCTA, { onStartAssessment: () => {} })
    );
    expect(html).toContain('Average Assessment Time');
  });

  it('renders the CTA heading', () => {
    const html = renderToString(
      createElement(StatsAndCTA, { onStartAssessment: () => {} })
    );
    expect(html).toContain('Ready to Find Your Ideal Coverage');
  });

  it('renders the CTA description', () => {
    const html = renderToString(
      createElement(StatsAndCTA, { onStartAssessment: () => {} })
    );
    expect(html).toContain('Join thousands of people');
  });

  it('renders the Start Assessment button in CTA', () => {
    const html = renderToString(
      createElement(StatsAndCTA, { onStartAssessment: () => {} })
    );
    expect(html).toContain('Start Your Free Assessment');
  });

  it('renders the no-credit-card note', () => {
    const html = renderToString(
      createElement(StatsAndCTA, { onStartAssessment: () => {} })
    );
    expect(html).toContain('No credit card required');
  });

  it('has proper section semantics', () => {
    const html = renderToString(
      createElement(StatsAndCTA, { onStartAssessment: () => {} })
    );
    expect(html).toContain('aria-label="Platform statistics"');
    expect(html).toContain('aria-labelledby="cta-heading"');
  });

  it('applies custom className', () => {
    const html = renderToString(
      createElement(StatsAndCTA, { onStartAssessment: () => { }, className: 'custom-class' })
    );
    expect(html).toContain('custom-class');
  });
});
