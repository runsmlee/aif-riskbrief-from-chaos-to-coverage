import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { FAQ } from './FAQ';

describe('FAQ', () => {
  it('renders the section heading', () => {
    const html = renderToString(createElement(FAQ));
    expect(html).toContain('Frequently Asked Questions');
  });

  it('renders FAQ questions', () => {
    const html = renderToString(createElement(FAQ));
    expect(html).toContain('How does RiskBrief generate my risk assessment?');
    expect(html).toContain('Is my personal information secure?');
    expect(html).toContain('Is RiskBrief free to use?');
  });

  it('renders FAQ answers', () => {
    const html = renderToString(createElement(FAQ));
    expect(html).toContain('bank-level encryption');
    expect(html).toContain('3-5 minutes');
  });

  it('has proper accordion semantics', () => {
    const html = renderToString(createElement(FAQ));
    expect(html).toContain('aria-expanded');
    expect(html).toContain('aria-controls');
  });

  it('has proper section semantics', () => {
    const html = renderToString(createElement(FAQ));
    expect(html).toContain('aria-labelledby="faq-heading"');
  });
});
