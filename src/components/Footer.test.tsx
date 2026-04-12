import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the RiskBrief logo in footer', () => {
    const html = renderToString(createElement(Footer));
    expect(html).toContain('RiskBrief');
  });

  it('renders the tagline', () => {
    const html = renderToString(createElement(Footer));
    expect(html).toContain('From Chaos to Coverage');
  });

  it('renders the current year in copyright', () => {
    const html = renderToString(createElement(Footer));
    const currentYear = new Date().getFullYear();
    expect(html).toContain(`${currentYear}`);
    expect(html).toContain('All rights reserved');
  });

  it('renders Product column links', () => {
    const html = renderToString(createElement(Footer));
    expect(html).toContain('Product');
    expect(html).toContain('Features');
    expect(html).toContain('How It Works');
    expect(html).toContain('Risk Assessment');
    expect(html).toContain('Pricing');
  });

  it('renders Company column links', () => {
    const html = renderToString(createElement(Footer));
    expect(html).toContain('Company');
    expect(html).toContain('About Us');
    expect(html).toContain('Careers');
    expect(html).toContain('Blog');
    expect(html).toContain('Contact');
  });

  it('renders Legal column links', () => {
    const html = renderToString(createElement(Footer));
    expect(html).toContain('Legal');
    expect(html).toContain('Privacy Policy');
    expect(html).toContain('Terms of Service');
    expect(html).toContain('Cookie Policy');
    expect(html).toContain('Disclaimer');
  });

  it('renders social media links with external attributes', () => {
    const html = renderToString(createElement(Footer));
    expect(html).toContain('aria-label="Twitter"');
    expect(html).toContain('aria-label="LinkedIn"');
    expect(html).toContain('aria-label="Facebook"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it('renders the disclaimer notice', () => {
    const html = renderToString(createElement(Footer));
    expect(html).toContain('informational purposes only');
    expect(html).toContain('licensed professional');
  });

  it('uses footer element semantics', () => {
    const html = renderToString(createElement(Footer));
    expect(html).toContain('<footer');
  });

  it('applies custom className', () => {
    const html = renderToString(
      createElement(Footer, { className: 'custom-class' })
    );
    expect(html).toContain('custom-class');
  });

  it('Company links have dedicated anchor destinations', () => {
    const html = renderToString(createElement(Footer));
    // About Us → #features (brand section)
    expect(html).toContain('href="#features"');
    expect(html).toContain('>About Us<');
    // Careers → #how-it-works
    expect(html).toContain('href="#how-it-works"');
    expect(html).toContain('>Careers<');
    // Blog → #testimonials
    expect(html).toContain('href="#testimonials"');
    expect(html).toContain('>Blog<');
    // Contact → #faq
    expect(html).toContain('href="#faq"');
    expect(html).toContain('>Contact<');
  });

  it('Legal links have dedicated anchor destinations', () => {
    const html = renderToString(createElement(Footer));
    expect(html).toContain('href="#privacy"');
    expect(html).toContain('href="#terms"');
    expect(html).toContain('href="#cookies"');
    expect(html).toContain('href="#disclaimer"');
  });
});
