import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Testimonials } from './Testimonials';

describe('Testimonials', () => {
  it('renders the section heading', () => {
    const html = renderToString(createElement(Testimonials));
    expect(html).toContain('Trusted by Thousands');
  });

  it('renders testimonial quotes', () => {
    const html = renderToString(createElement(Testimonials));
    expect(html).toContain('Sarah Mitchell');
    expect(html).toContain('James Rodriguez');
    expect(html).toContain('Emily Chen');
  });

  it('renders star ratings', () => {
    const html = renderToString(createElement(Testimonials));
    expect(html).toContain('out of 5 stars');
  });

  it('has proper section semantics', () => {
    const html = renderToString(createElement(Testimonials));
    expect(html).toContain('aria-labelledby="testimonials-heading"');
  });
});
