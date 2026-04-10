import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { RiskBreakdownChart } from './RiskBreakdownChart';

const mockFactors = [
  { label: 'Age Factor', value: 15, maxValue: 20, color: '#ef4444' },
  { label: 'Health Profile', value: 10, maxValue: 20, color: '#f97316' },
  { label: 'Asset Protection', value: 8, maxValue: 15, color: '#eab308' },
];

describe('RiskBreakdownChart', () => {
  it('renders risk factor labels', () => {
    const html = renderToString(
      createElement(RiskBreakdownChart, { factors: mockFactors })
    );
    expect(html).toContain('Age Factor');
    expect(html).toContain('Health Profile');
    expect(html).toContain('Asset Protection');
  });

  it('renders factor values', () => {
    const html = renderToString(
      createElement(RiskBreakdownChart, { factors: mockFactors })
    );
    // React SSR renders comment nodes between text segments, so check for the values
    expect(html).toContain('>15<');
    expect(html).toContain('>20<');
    expect(html).toContain('>10<');
    expect(html).toContain('>8<');
    expect(html).toContain('>15<');
  });

  it('has meter semantics for accessibility', () => {
    const html = renderToString(
      createElement(RiskBreakdownChart, { factors: mockFactors })
    );
    expect(html).toContain('role="meter"');
    expect(html).toContain('aria-valuenow');
    expect(html).toContain('aria-valuemin');
    expect(html).toContain('aria-valuemax');
  });

  it('renders bars for each factor', () => {
    const html = renderToString(
      createElement(RiskBreakdownChart, { factors: mockFactors })
    );
    expect(html).toContain('rounded-full');
  });

  it('applies custom colors to bars', () => {
    const html = renderToString(
      createElement(RiskBreakdownChart, { factors: mockFactors })
    );
    expect(html).toContain('#ef4444');
    expect(html).toContain('#f97316');
    expect(html).toContain('#eab308');
  });
});
