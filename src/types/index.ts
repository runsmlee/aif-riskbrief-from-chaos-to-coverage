export interface RiskFactor {
  id: string;
  label: string;
  description: string;
  weight: number;
  category: 'lifestyle' | 'health' | 'occupation' | 'assets';
}

export interface UserProfile {
  age: number;
  occupation: string;
  hasHealthConditions: boolean;
  ownsHome: boolean;
  ownsVehicle: boolean;
  hasDependents: boolean;
  annualIncome: string;
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
}

export type FormStep = 'profile' | 'lifestyle' | 'assets' | 'results';
