import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

// Pre-import lazy components so they resolve in the module cache during SSR.
// Without this, renderToString cannot resolve lazy() boundaries.
import './components/Hero';
import './components/Features';
import './components/HowItWorks';
import './components/StatsAndCTA';
import './components/FAQ';
import './components/Footer';
import './components/RiskAssessmentForm';
import './components/CoverageRecommendations';

import App from './App';

describe('App', () => {
  it('renders the RiskBrief branding', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('RiskBrief');
  });

  it('renders the hero section', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('Which Insurance Do You');
    expect(html).toContain('Actually Need?');
  });

  it('renders the start assessment button', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('Get My Risk Brief');
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

  it('renders toast container for notifications', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('toast-container');
    expect(html).toContain('aria-live="polite"');
  });

  it('renders dark mode toggle in header', () => {
    const html = renderToString(createElement(App));
    expect(html).toContain('Switch to dark mode');
  });
});
