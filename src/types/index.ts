export interface RiskFactor {
  id: string;
  label: string;
  description: string;
  weight: number;
  category: 'lifestyle' | 'health' | 'occupation' | 'assets';
}

/** Risk factor data point for chart visualization */
export interface ChartRiskFactor {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

export interface UserProfile {
  age: number;
  occupation: string;
  hasHealthConditions: boolean;
  smokingStatus: 'never' | 'former' | 'current';
  ownsHome: boolean;
  ownsVehicle: boolean;
  hasDependents: boolean;
  annualIncome: string;
  currentCoverageStatus: 'none' | 'partial' | 'comprehensive';
}

export interface CoverageRecommendation {
  id: string;
  type: 'life' | 'health' | 'auto' | 'home' | 'disability';
  title: string;
  description: string;
  coverageAmount: string;
  monthlyPremium: string;
  priority: 'high' | 'medium' | 'low';
  benefits: string[];
}

export interface RiskAssessment {
  score: number;
  level: 'low' | 'moderate' | 'high';
  factors: string[];
  recommendations: CoverageRecommendation[];
  coverageGapCount: number;
}

export interface AssessmentHistoryEntry {
  id: string;
  date: string;
  profile: UserProfile;
  assessment: RiskAssessment;
  totalMonthlyPremium: number;
}

export const ASSESSMENT_STORAGE_KEY = 'riskbrief-assessments';

export type FormStep = 'profile' | 'lifestyle' | 'assets' | 'results';
