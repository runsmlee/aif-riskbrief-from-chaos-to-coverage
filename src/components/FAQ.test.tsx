import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { FAQ } from './FAQ';

describe('FAQ', () => {
  it('renders the section heading', () => {
    const html = renderToString(createElement(FAQ));
    expect(html).toContain('Insurance Coverage Gap FAQ');
  });

  it('renders FAQ questions', () => {
    const html = renderToString(createElement(FAQ));
    expect(html).toContain('What are the most common insurance coverage gaps?');
    expect(html).toContain('How do I check if I have duplicate insurance coverage?');
    expect(html).toContain('Does employer-provided insurance leave me with gaps?');
  });

  it('renders FAQ answers', () => {
    const html = renderToString(createElement(FAQ));
    expect(html).toContain('underinsured life coverage');
    expect(html).toContain('employer coverage usually stops');
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

  it('renders chevron icons for accordion items', () => {
    const html = renderToString(createElement(FAQ));
    expect(html).toContain('transition-transform');
  });

  it('has proper FAQ questions text', () => {
    const html = renderToString(createElement(FAQ));
    expect(html).toContain('What insurance gaps are typical at age 30, 40, and 50?');
    expect(html).toContain('How much life insurance do I actually need?');
  });
});
