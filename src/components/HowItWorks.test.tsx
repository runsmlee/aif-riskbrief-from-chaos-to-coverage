import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { HowItWorks } from './HowItWorks';

describe('HowItWorks', () => {
  it('renders the section heading', () => {
    const html = renderToString(createElement(HowItWorks));
    expect(html).toContain('How RiskBrief Works');
  });

  it('renders the section subheading', () => {
    const html = renderToString(createElement(HowItWorks));
    expect(html).toContain('confusion to clarity');
  });

  it('renders all four step numbers', () => {
    const html = renderToString(createElement(HowItWorks));
    // Step numbers are rendered inside circles
    expect(html).toContain('Answer Questions');
    expect(html).toContain('Get Your Risk Profile');
    expect(html).toContain('Review Recommendations');
    expect(html).toContain('Take Action');
  });

  it('renders step descriptions', () => {
    const html = renderToString(createElement(HowItWorks));
    expect(html).toContain('Takes about 5 minutes');
    expect(html).toContain('personalized risk assessment');
    expect(html).toContain('tailored coverage recommendations');
    expect(html).toContain('Connect with trusted providers');
  });

  it('has proper section semantics', () => {
    const html = renderToString(createElement(HowItWorks));
    expect(html).toContain('aria-labelledby="how-it-works-heading"');
    expect(html).toContain('id="how-it-works"');
  });

  it('applies custom className', () => {
    const html = renderToString(
      createElement(HowItWorks, { className: 'custom-class' })
    );
    expect(html).toContain('custom-class');
  });
});
