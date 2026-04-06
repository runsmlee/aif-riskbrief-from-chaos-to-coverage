import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Header } from './Header';

describe('Header', () => {
  it('renders the RiskBrief logo', () => {
    const html = renderToString(createElement(Header));
    expect(html).toContain('RiskBrief');
  });

  it('renders navigation links', () => {
    const html = renderToString(createElement(Header));
    expect(html).toContain('Features');
    expect(html).toContain('How It Works');
  });

  it('renders the Get Started button', () => {
    const html = renderToString(createElement(Header));
    expect(html).toContain('Get Started');
  });

  it('has proper navigation semantics', () => {
    const html = renderToString(createElement(Header));
    expect(html).toContain('aria-label="Main navigation"');
  });

  it('renders the mobile menu button', () => {
    const html = renderToString(createElement(Header));
    expect(html).toContain('aria-label="Open menu"');
  });

  it('has Testimonials and FAQ nav links', () => {
    const html = renderToString(createElement(Header));
    expect(html).toContain('Testimonials');
    expect(html).toContain('FAQ');
  });
});
