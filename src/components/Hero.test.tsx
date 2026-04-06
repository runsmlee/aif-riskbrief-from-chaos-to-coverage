import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the main headline', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('From Chaos to');
    expect(html).toContain('Coverage');
  });

  it('renders the tagline', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Navigate insurance with confidence');
  });

  it('renders the Start Free Assessment button', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Start Free Assessment');
  });

  it('renders trust indicators', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Free Assessment');
    expect(html).toContain('5-Minute Process');
    expect(html).toContain('Expert Insights');
  });
});
