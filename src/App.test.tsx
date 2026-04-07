import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

describe('App', () => {
  it('renders the RiskBrief branding', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('RiskBrief');
  });

  it('renders the hero section', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('From Chaos to');
    expect(html).toContain('Coverage');
  });

  it('renders the start assessment button', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('Start Free Assessment');
  });

  it('renders the features section', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('Smart Risk Assessment');
    expect(html).toContain('Instant Recommendations');
  });

  it('renders the how it works section', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('How RiskBrief Works');
  });

  it('renders stats and social proof', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('Assessments Completed');
    expect(html).toContain('User Satisfaction');
  });

  it('renders the testimonials section', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('Trusted by Thousands');
  });

  it('renders the FAQ section', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('Frequently Asked Questions');
  });

  it('renders the footer', () => {
    const html = renderToString(createElement(App));
    const currentYear = new Date().getFullYear();
    expect(html).toContain(`${currentYear}`);
    expect(html).toContain('RiskBrief. All rights reserved');
  });

  it('has skip link for accessibility', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('Skip to main content');
  });

  it('renders the CTA section', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('Ready to Find Your Ideal Coverage');
  });

  it('renders privacy notice in footer', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('informational purposes only');
  });
});
