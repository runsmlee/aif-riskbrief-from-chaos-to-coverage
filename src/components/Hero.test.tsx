import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the main headline as a question', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Which Insurance Do You');
    expect(html).toContain('Actually Need?');
  });

  it('renders the gap-finding subheadline', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('gap-finding engine');
  });

  it('renders the Get My Risk Brief button', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Get My Risk Brief');
  });

  it('renders trust indicators', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Free Gap Analysis');
    expect(html).toContain('5-Minute Process');
    expect(html).toContain('No Sign-Up Required');
  });

  it('renders the From Chaos to Coverage tagline badge', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('From Chaos to Coverage');
  });

  it('renders the interactive coverage concern widget', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('What worries you most?');
    expect(html).toContain('Life Insurance');
    expect(html).toContain('Health Insurance');
    expect(html).toContain('Auto Insurance');
    expect(html).toContain('Home Insurance');
    expect(html).toContain('Disability Insurance');
  });

  it('renders free assurance messaging', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('no sign-up');
    expect(html).toContain('no spam');
  });

  it('has Learn More link', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Learn More');
  });
});
