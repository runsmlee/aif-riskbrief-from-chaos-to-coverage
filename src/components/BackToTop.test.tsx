import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { BackToTop } from './BackToTop';

describe('BackToTop', () => {
  it('renders nothing on server (no scroll position)', () => {
    // SSR: scroll position is unknown, component returns null
    const html = renderToString(createElement(BackToTop));
    // BackToTop returns null when isVisible is false (SSR default)
    expect(html).toBe('');
  });

  it('does not render when page has not scrolled', () => {
    // In SSR there is no scroll event, so isVisible stays false
    const html = renderToString(createElement(BackToTop));
    expect(html).not.toContain('back-to-top');
  });
});
