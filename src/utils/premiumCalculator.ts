import type { CoverageRecommendation } from '../types';

/**
 * Parses a formatted premium string (e.g., "$65") into a numeric value.
 * Returns 0 for invalid or unparseable values.
 */
export function parsePremium(premium: string): number {
  const value = parseFloat(premium.replace('$', ''));
  return isNaN(value) ? 0 : value;
}

/**
 * Calculates the total monthly premium from a list of coverage recommendations.
 */
export function calculateTotalMonthly(recommendations: CoverageRecommendation[]): number {
  return recommendations.reduce((sum, rec) => sum + parsePremium(rec.monthlyPremium), 0);
}

/**
 * Calculates the estimated annual savings based on coverage gap count.
 * Rate: 8% for 0 gaps, 12% for 1-2 gaps, 18% for 3+ gaps.
 */
export function calculateAnnualSavings(totalMonthly: number, coverageGapCount: number): number {
  const rate = coverageGapCount >= 3 ? 0.18 : coverageGapCount >= 1 ? 0.12 : 0.08;
  return Math.round(totalMonthly * 12 * rate);
}
