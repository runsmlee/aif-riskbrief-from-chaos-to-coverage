import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Features } from './Features';

describe('Features', () => {
  it('renders the section heading', () => {
    const html = renderToString(createElement(Features));
    expect(html).toContain('Everything you need');
  });

  it('renders all feature cards', () => {
    const html = renderToString(createElement(Features));
    expect(html).toContain('Smart Risk Assessment');
    expect(html).toContain('Instant Recommendations');
    expect(html).toContain('Cost Optimization');
    expect(html).toContain('Clear Explanations');
    expect(html).toContain('Regular Updates');
    expect(html).toContain('Privacy First');
  });

  it('renders feature descriptions', () => {
    const html = renderToString(createElement(Features));
    expect(html).toContain('AI-powered algorithm');
    expect(html).toContain('Get personalized coverage recommendations');
  });

  it('has proper section semantics', () => {
    const html = renderToString(createElement(Features));
    expect(html).toContain('aria-labelledby="features-heading"');
  });

  it('renders stagger animation container', () => {
    const html = renderToString(createElement(Features));
    expect(html).toContain('stagger-children');
  });
});
