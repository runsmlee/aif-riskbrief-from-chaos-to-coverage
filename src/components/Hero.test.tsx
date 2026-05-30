import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the main headline', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Personalized Insurance');
    expect(html).toContain('Coverage Recommendations');
  });

  it('renders the tagline', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('personalized coverage recommendations');
  });

  it('renders the Get My Risk Brief button', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Get My Risk Brief');
  });

  it('renders trust indicators', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Free Risk Brief');
    expect(html).toContain('5-Minute Process');
    expect(html).toContain('Expert Insights');
  });

  it('renders the badge / pill', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Free Risk Assessment Tool');
  });

  it('renders the visual card with risk info', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Risk Score');
    expect(html).toContain('Monthly Premium');
  });

  it('renders estimated savings indicator', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('save $180/year');
  });

  it('has Learn More link', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Learn More');
  });
});
