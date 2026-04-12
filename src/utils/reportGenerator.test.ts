import { describe, it, expect } from 'vitest';
import { generateReportHTML } from './reportGenerator';
import type { RiskAssessment } from '../types';

const mockAssessment: RiskAssessment = {
  score: 72,
  level: 'high',
  factors: ['Existing health conditions', 'Dependents to protect'],
  recommendations: [
    {
      id: 'life-1',
      type: 'life',
      title: 'Term Life Insurance',
      description: 'Protect your loved ones.',
      coverageAmount: '$500K',
      monthlyPremium: '$65',
      priority: 'high',
      benefits: ['Death benefit payout', 'Level premiums'],
    },
    {
      id: 'health-1',
      type: 'health',
      title: 'Health Insurance',
      description: 'Comprehensive health coverage.',
      coverageAmount: '$250K',
      monthlyPremium: '$250',
      priority: 'medium',
      benefits: ['Hospital coverage', 'Prescription drugs'],
    },
  ],
};

describe('generateReportHTML', () => {
  it('generates an HTML string', () => {
    const html = generateReportHTML(mockAssessment);
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('</html>');
  });

  it('includes the risk score in the report', () => {
    const html = generateReportHTML(mockAssessment);
    expect(html).toContain('72/100');
    expect(html).toContain('High Risk');
  });

  it('includes risk factors', () => {
    const html = generateReportHTML(mockAssessment);
    expect(html).toContain('Existing health conditions');
    expect(html).toContain('Dependents to protect');
  });

  it('includes recommendation titles', () => {
    const html = generateReportHTML(mockAssessment);
    expect(html).toContain('Term Life Insurance');
    expect(html).toContain('Health Insurance');
  });

  it('includes coverage amounts and premiums', () => {
    const html = generateReportHTML(mockAssessment);
    expect(html).toContain('$500K');
    expect(html).toContain('$250K');
    expect(html).toContain('$65');
    expect(html).toContain('$250');
  });

  it('includes priority badges', () => {
    const html = generateReportHTML(mockAssessment);
    expect(html).toContain('High Priority');
    expect(html).toContain('Medium Priority');
  });

  it('includes benefits', () => {
    const html = generateReportHTML(mockAssessment);
    expect(html).toContain('Death benefit payout');
    expect(html).toContain('Level premiums');
    expect(html).toContain('Hospital coverage');
  });

  it('includes the RiskBrief branding', () => {
    const html = generateReportHTML(mockAssessment);
    expect(html).toContain('RiskBrief');
    expect(html).toContain('Coverage Report');
  });

  it('includes the disclaimer', () => {
    const html = generateReportHTML(mockAssessment);
    expect(html).toContain('informational purposes only');
    expect(html).toContain('licensed insurance professional');
  });

  it('includes annual savings estimate', () => {
    const html = generateReportHTML(mockAssessment);
    // Total monthly = $65 + $250 = $315; annual savings = round(315 * 12 * 0.15) = round(567) = $567
    expect(html).toContain('$567');
  });

  it('includes total monthly premium', () => {
    const html = generateReportHTML(mockAssessment);
    // $65 + $250 = $315
    expect(html).toContain('$315');
  });

  it('handles assessment with no factors', () => {
    const emptyFactorsAssessment: RiskAssessment = {
      ...mockAssessment,
      factors: [],
    };
    const html = generateReportHTML(emptyFactorsAssessment);
    expect(html).toContain('72/100');
    // Should not have "Key Risk Factors" section when empty
    expect(html).not.toContain('Key Risk Factors');
  });

  it('includes print styles', () => {
    const html = generateReportHTML(mockAssessment);
    expect(html).toContain('@media print');
    expect(html).toContain('Print Report');
  });

  it('includes the current year in the copyright', () => {
    const html = generateReportHTML(mockAssessment);
    const currentYear = new Date().getFullYear();
    expect(html).toContain(`${currentYear}`);
  });
});
