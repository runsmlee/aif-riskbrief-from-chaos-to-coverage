import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the main headline about insurance gaps', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Instantly Identify');
    expect(html).toContain('Insurance Coverage Gaps');
  });

  it('renders the concrete discovery subheadline', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('personalized coverage gap assessment');
    expect(html).toContain('overpaying or under-protected');
  });

  it('renders concrete examples of what people discover', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Duplicate coverage');
    expect(html).toContain('disability, umbrella, or liability');
    expect(html).toContain('misaligned with your current life stage');
  });

  it('renders the Find My Gaps CTA button', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Find My Gaps');
    expect(html).toContain('12 Questions');
  });

  it('renders trust indicators', () => {
    const html = renderToString(createElement(Hero, { onStartAssessment: () => {} }));
    expect(html).toContain('Free Gap Analysis');
    expect(html).toContain('12 Questions, 5 Minutes');
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
