import { describe, it, expect } from 'vitest';
import { parsePremium, calculateTotalMonthly, calculateAnnualSavings } from './premiumCalculator';
import type { CoverageRecommendation } from '../types';

describe('premiumCalculator', () => {
  describe('parsePremium', () => {
    it('parses a dollar-formatted premium string', () => {
      expect(parsePremium('$65')).toBe(65);
    });

    it('parses a three-digit premium string', () => {
      expect(parsePremium('$250')).toBe(250);
    });

    it('returns 0 for an invalid string', () => {
      expect(parsePremium('invalid')).toBe(0);
    });

    it('parses a zero premium', () => {
      expect(parsePremium('$0')).toBe(0);
    });
  });

  describe('calculateTotalMonthly', () => {
    const mockRecommendations: CoverageRecommendation[] = [
      {
        id: 'life-1',
        type: 'life',
        title: 'Term Life Insurance',
        description: 'Test',
        coverageAmount: '$500K',
        monthlyPremium: '$65',
        priority: 'high',
        benefits: [],
      },
      {
        id: 'health-1',
        type: 'health',
        title: 'Health Insurance',
        description: 'Test',
        coverageAmount: '$250K',
        monthlyPremium: '$250',
        priority: 'high',
        benefits: [],
      },
    ];

    it('calculates total monthly premium from recommendations', () => {
      expect(calculateTotalMonthly(mockRecommendations)).toBe(315);
    });

    it('returns 0 for an empty array', () => {
      expect(calculateTotalMonthly([])).toBe(0);
    });
  });

  describe('calculateAnnualSavings', () => {
    it('uses 8% rate for 0 coverage gaps', () => {
      // 315 * 12 * 0.08 = 302.4 -> 302
      expect(calculateAnnualSavings(315, 0)).toBe(302);
    });

    it('uses 12% rate for 1-2 coverage gaps', () => {
      // 315 * 12 * 0.12 = 453.6 -> 454
      expect(calculateAnnualSavings(315, 1)).toBe(454);
      expect(calculateAnnualSavings(315, 2)).toBe(454);
    });

    it('uses 18% rate for 3+ coverage gaps', () => {
      // 315 * 12 * 0.18 = 680.4 -> 680
      expect(calculateAnnualSavings(315, 3)).toBe(680);
      expect(calculateAnnualSavings(315, 5)).toBe(680);
    });
  });
});
