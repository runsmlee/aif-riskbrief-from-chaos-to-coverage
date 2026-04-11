import { describe, it, expect, vi } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { RiskAssessmentForm } from './RiskAssessmentForm';

describe('RiskAssessmentForm', () => {
  const mockOnComplete = vi.fn();

  it('renders the assessment heading', () => {
    const html = renderToString(createElement(RiskAssessmentForm, { onComplete: mockOnComplete }));
    expect(html).toContain('Risk Assessment');
  });

  it('renders the subheading text', () => {
    const html = renderToString(createElement(RiskAssessmentForm, { onComplete: mockOnComplete }));
    expect(html).toContain('personalized coverage recommendations');
  });

  it('renders the profile step by default', () => {
    const html = renderToString(createElement(RiskAssessmentForm, { onComplete: mockOnComplete }));
    expect(html).toContain('Basic Information');
    expect(html).toContain('basic details about you');
  });

  it('renders age input field', () => {
    const html = renderToString(createElement(RiskAssessmentForm, { onComplete: mockOnComplete }));
    expect(html).toContain('Your Age');
    expect(html).toContain('type="number"');
    expect(html).toContain('name="age"');
    expect(html).toContain('id="age"');
    expect(html).toContain('min="18"');
    expect(html).toContain('max="100"');
  });

  it('renders occupation input field', () => {
    const html = renderToString(createElement(RiskAssessmentForm, { onComplete: mockOnComplete }));
    expect(html).toContain('Occupation');
    expect(html).toContain('type="text"');
    expect(html).toContain('name="occupation"');
    expect(html).toContain('id="occupation"');
  });

  it('renders age and occupation as required fields', () => {
    const html = renderToString(createElement(RiskAssessmentForm, { onComplete: mockOnComplete }));
    expect(html).toContain('required');
  });

  it('renders the step progress indicator', () => {
    const html = renderToString(createElement(RiskAssessmentForm, { onComplete: mockOnComplete }));
    expect(html).toContain('role="progressbar"');
    expect(html).toContain('aria-valuemin="1"');
    expect(html).toContain('aria-valuemax="3"');
    expect(html).toContain('aria-valuenow="1"');
  });

  it('renders step labels', () => {
    const html = renderToString(createElement(RiskAssessmentForm, { onComplete: mockOnComplete }));
    expect(html).toContain('Profile');
    expect(html).toContain('Lifestyle');
    expect(html).toContain('Assets');
  });

  it('renders the Continue button', () => {
    const html = renderToString(createElement(RiskAssessmentForm, { onComplete: mockOnComplete }));
    expect(html).toContain('Continue');
  });

  it('renders the Back button as disabled on first step', () => {
    const html = renderToString(createElement(RiskAssessmentForm, { onComplete: mockOnComplete }));
    expect(html).toContain('Back');
    expect(html).toContain('disabled');
  });

  it('has proper section semantics', () => {
    const html = renderToString(createElement(RiskAssessmentForm, { onComplete: mockOnComplete }));
    expect(html).toContain('id="assessment"');
    expect(html).toContain('aria-labelledby="assessment-heading"');
  });

  it('applies custom className', () => {
    const html = renderToString(
      createElement(RiskAssessmentForm, { onComplete: mockOnComplete, className: 'custom-class' })
    );
    expect(html).toContain('custom-class');
  });

  it('renders required field indicators', () => {
    const html = renderToString(createElement(RiskAssessmentForm, { onComplete: mockOnComplete }));
    // Primary color asterisk for required fields
    expect(html).toContain('*');
  });

  it('renders form inputs with proper label associations', () => {
    const html = renderToString(createElement(RiskAssessmentForm, { onComplete: mockOnComplete }));
    // Labels are associated with inputs via htmlFor/id pairs
    expect(html).toContain('for="age"');
    expect(html).toContain('id="age"');
    expect(html).toContain('for="occupation"');
    expect(html).toContain('id="occupation"');
  });

  it('renders the assessment section with correct id for scroll targeting', () => {
    const html = renderToString(createElement(RiskAssessmentForm, { onComplete: mockOnComplete }));
    expect(html).toContain('id="assessment"');
  });
});
