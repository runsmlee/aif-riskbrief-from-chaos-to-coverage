import { useState, useCallback } from 'react';
import type { ReactElement } from 'react';
import type { UserProfile, FormStep, CoverageRecommendation, RiskAssessment, AssessmentHistoryEntry } from '../types';
import { ASSESSMENT_STORAGE_KEY } from '../types';
import { calculateTotalMonthly } from '../utils/premiumCalculator';
import { safeGetItem, safeSetItem } from '../utils/storage';

interface RiskAssessmentFormProps {
  onComplete: (assessment: RiskAssessment) => void;
  className?: string;
}

const incomeRanges = [
  { value: '0-50000', label: 'Under $50,000' },
  { value: '50000-100000', label: '$50,000 - $100,000' },
  { value: '100000-150000', label: '$100,000 - $150,000' },
  { value: '150000+', label: 'Over $150,000' },
];

function roundToNearest5(value: number): number {
  return Math.round(value / 5) * 5;
}

function getIncomeBracketHomeValue(income: string): number {
  if (income === '0-50000') return 200000;
  if (income === '50000-100000') return 350000;
  if (income === '100000-150000') return 500000;
  return 750000; // 150000+
}

function getIncomeBracketHomeCoverage(income: string): number {
  if (income === '0-50000') return 250000;
  if (income === '50000-100000') return 350000;
  if (income === '100000-150000') return 500000;
  return 750000; // 150000+
}

function generateRecommendations(profile: UserProfile): CoverageRecommendation[] {
  const recommendations: CoverageRecommendation[] = [];

  // Life Insurance
  if (profile.hasDependents || profile.age < 55) {
    const baseAmount = profile.annualIncome === '150000+' ? 1000000 :
      profile.annualIncome === '100000-150000' ? 750000 :
      profile.annualIncome === '50000-100000' ? 500000 : 250000;

    const ageMultiplier = profile.age < 35 ? 0.8 :
      profile.age < 45 ? 1.0 :
      profile.age < 55 ? 1.3 : 1.6;
    const healthMultiplier = profile.hasHealthConditions ? 1.4 : 1.0;

    const rawLifePremium = (baseAmount / 1000) * ageMultiplier * healthMultiplier;
    const lifePremium = roundToNearest5(rawLifePremium);

    recommendations.push({
      id: 'life-1',
      type: 'life',
      title: 'Term Life Insurance',
      description: 'Protect your loved ones with comprehensive life coverage.',
      coverageAmount: `$${(baseAmount / 1000).toFixed(0)}K`,
      monthlyPremium: `$${lifePremium}`,
      priority: profile.hasDependents ? 'high' : 'medium',
      benefits: ['Death benefit payout', 'Level premiums', 'Convertible to permanent', 'Accelerated death benefit'],
    });
  }

  // Health Insurance — base $200, scaled by age, health conditions, income tier
  const ageOver30 = Math.max(0, profile.age - 30);
  const healthBase = 200 + (ageOver30 * 5);
  const healthIncomeAdjust = profile.annualIncome === '0-50000' ? 50 :
    profile.annualIncome === '50000-100000' ? 20 : 0;
  const smokingAdjust = profile.smokingStatus === 'current' ? 80 :
    profile.smokingStatus === 'former' ? 30 : 0;
  const healthPremium = roundToNearest5(healthBase + (profile.hasHealthConditions ? 120 : 0) + healthIncomeAdjust + smokingAdjust);

  recommendations.push({
    id: 'health-1',
    type: 'health',
    title: 'Health Insurance',
    description: 'Comprehensive health coverage for medical expenses.',
    coverageAmount: '$250K',
    monthlyPremium: `$${healthPremium}`,
    priority: 'high',
    benefits: ['Hospital coverage', 'Prescription drugs', 'Preventive care', 'Mental health services'],
  });

  // Auto Insurance — base $75, age and health adjustments
  if (profile.ownsVehicle) {
    const autoPremium = roundToNearest5(
      75 +
      (profile.age < 25 || profile.age > 70 ? 20 : 0) +
      (profile.hasHealthConditions ? 15 : 0)
    );

    recommendations.push({
      id: 'auto-1',
      type: 'auto',
      title: 'Auto Insurance',
      description: 'Full coverage auto insurance to protect you on the road.',
      coverageAmount: '$100K/$300K',
      monthlyPremium: `$${autoPremium}`,
      priority: 'high',
      benefits: ['Liability coverage', 'Collision coverage', 'Comprehensive coverage', 'Roadside assistance'],
    });
  }

  // Homeowners Insurance — base $80 + homeValue * 0.0004, coverage scales with income
  if (profile.ownsHome) {
    const homeValue = getIncomeBracketHomeValue(profile.annualIncome);
    const homeCoverage = getIncomeBracketHomeCoverage(profile.annualIncome);
    const homePremium = roundToNearest5(80 + homeValue * 0.0004);

    recommendations.push({
      id: 'home-1',
      type: 'home',
      title: 'Homeowners Insurance',
      description: 'Protect your home and belongings from unexpected events.',
      coverageAmount: `$${(homeCoverage / 1000).toFixed(0)}K`,
      monthlyPremium: `$${homePremium}`,
      priority: 'high',
      benefits: ['Dwelling coverage', 'Personal property', 'Liability protection', 'Additional living expenses'],
    });
  }

  // Disability Insurance — base depends on occupation type
  if (profile.occupation.toLowerCase().includes('construction') ||
      profile.occupation.toLowerCase().includes('manual') ||
      profile.hasHealthConditions) {
    const isManual = profile.occupation.toLowerCase().includes('construction') ||
      profile.occupation.toLowerCase().includes('manual');
    const disabilityPremium = isManual ? 150 : 100;

    recommendations.push({
      id: 'disability-1',
      type: 'disability',
      title: 'Disability Insurance',
      description: 'Income protection if you cannot work due to illness or injury.',
      coverageAmount: '60% of income',
      monthlyPremium: `$${disabilityPremium}`,
      priority: 'high',
      benefits: ['Short-term coverage', 'Long-term coverage', 'Own occupation definition', 'Non-cancelable'],
    });
  }

  return recommendations;
}

function calculateCoverageGaps(profile: UserProfile): number {
  let gaps = 0;
  if (profile.ownsVehicle) gaps += 1;
  if (profile.ownsHome) gaps += 1;
  if (profile.hasDependents) gaps += 1;
  if (profile.hasHealthConditions) gaps += 1;
  return gaps;
}

function saveAssessmentHistory(
  profile: UserProfile,
  assessment: RiskAssessment
): void {
  try {
    const totalMonthly = calculateTotalMonthly(assessment.recommendations);

    const entry: AssessmentHistoryEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      profile: { ...profile },
      assessment: { ...assessment },
      totalMonthlyPremium: totalMonthly,
    };

    const history = safeGetItem<AssessmentHistoryEntry[]>(ASSESSMENT_STORAGE_KEY, []);
    history.unshift(entry);
    // Keep only the last 3 entries per PRD §4.2
    const trimmed = history.slice(0, 3);
    safeSetItem(ASSESSMENT_STORAGE_KEY, trimmed);
  } catch {
    // localStorage unavailable — silently skip
  }
}

function calculateRiskScore(profile: UserProfile): number {
  let score = 50;

  if (profile.age > 50) score += 10;
  if (profile.age > 65) score += 10;
  if (profile.hasHealthConditions) score += 15;
  if (profile.smokingStatus === 'current') score += 12;
  else if (profile.smokingStatus === 'former') score += 5;
  if (profile.hasDependents) score += 5;
  if (!profile.ownsHome && profile.age > 30) score -= 5;
  if (!profile.ownsVehicle && profile.age > 25) score -= 5;
  if (profile.currentCoverageStatus === 'none') score += 8;
  else if (profile.currentCoverageStatus === 'partial') score += 3;

  return Math.min(100, Math.max(0, score));
}

function getRiskLevel(score: number): 'low' | 'moderate' | 'high' {
  if (score < 40) return 'low';
  if (score < 70) return 'moderate';
  return 'high';
}

interface ValidationError {
  age?: string;
  occupation?: string;
  annualIncome?: string;
}

function validateProfileStep(profile: Partial<UserProfile>): ValidationError {
  const errors: ValidationError = {};
  if (!profile.age || Number(profile.age) < 18) {
    errors.age = 'Please enter a valid age (18 or older)';
  }
  if (!profile.occupation || profile.occupation.trim() === '') {
    errors.occupation = 'Please enter your occupation';
  }
  return errors;
}

function validateLifestyleStep(profile: Partial<UserProfile>): ValidationError {
  const errors: ValidationError = {};
  if (!profile.annualIncome) {
    errors.annualIncome = 'Please select your income range';
  }
  return errors;
}

const stepLabels: Record<Exclude<FormStep, 'results'>, string> = {
  profile: 'Profile',
  lifestyle: 'Lifestyle',
  assets: 'Assets',
};

const stepKeys: Array<Exclude<FormStep, 'results'>> = ['profile', 'lifestyle', 'assets'];

export function RiskAssessmentForm({ onComplete, className = '' }: RiskAssessmentFormProps): ReactElement | null {
  const [currentStep, setCurrentStep] = useState<FormStep>('profile');
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [errors, setErrors] = useState<ValidationError>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setTouched(prev => ({ ...prev, [name]: true }));

    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: undefined }));
  }, []);

  const handleNextStep = useCallback(() => {
    let stepErrors: ValidationError = {};

    if (currentStep === 'profile') {
      stepErrors = validateProfileStep(profile);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        setTouched({ age: true, occupation: true });
        return;
      }
      setCurrentStep('lifestyle');
    } else if (currentStep === 'lifestyle') {
      stepErrors = validateLifestyleStep(profile);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        setTouched(prev => ({ ...prev, annualIncome: true }));
        return;
      }
      setCurrentStep('assets');
    } else if (currentStep === 'assets') {
      const completeProfile: UserProfile = {
        age: Number(profile.age) || 30,
        occupation: profile.occupation || 'Not specified',
        hasHealthConditions: profile.hasHealthConditions || false,
        smokingStatus: profile.smokingStatus || 'never',
        ownsHome: profile.ownsHome || false,
        ownsVehicle: profile.ownsVehicle || false,
        hasDependents: profile.hasDependents || false,
        annualIncome: profile.annualIncome || '0-50000',
        currentCoverageStatus: profile.currentCoverageStatus || 'none',
      };

      const score = calculateRiskScore(completeProfile);
      const recommendations = generateRecommendations(completeProfile);
      const factors: string[] = [];
      const coverageGapCount = calculateCoverageGaps(completeProfile);

      if (completeProfile.hasHealthConditions) factors.push('Existing health conditions');
      if (completeProfile.smokingStatus === 'current') factors.push('Current smoker');
      else if (completeProfile.smokingStatus === 'former') factors.push('Former smoker');
      if (completeProfile.hasDependents) factors.push('Dependents to protect');
      if (completeProfile.ownsHome) factors.push('Home ownership');
      if (completeProfile.ownsVehicle) factors.push('Vehicle ownership');
      if (completeProfile.age > 50) factors.push('Age consideration');
      if (completeProfile.currentCoverageStatus === 'none') factors.push('No existing coverage');
      else if (completeProfile.currentCoverageStatus === 'partial') factors.push('Partial coverage gaps');

      const assessment: RiskAssessment = {
        score,
        level: getRiskLevel(score),
        factors,
        recommendations,
        coverageGapCount,
      };

      saveAssessmentHistory(completeProfile, assessment);
      onComplete(assessment);
      setCurrentStep('results');
    }
  }, [currentStep, profile, onComplete]);

  const handlePrevStep = useCallback(() => {
    if (currentStep === 'lifestyle') setCurrentStep('profile');
    else if (currentStep === 'assets') setCurrentStep('lifestyle');
  }, [currentStep]);

  const currentStepIndex = stepKeys.indexOf(currentStep as Exclude<FormStep, 'results'>);

  const renderStep = (): ReactElement => {
    switch (currentStep) {
      case 'profile':
        return (
          <div className="space-y-6 animate-fade-in" key="profile">
            <h3 className="text-2xl font-bold text-gray-900">Basic Information</h3>
            <p className="text-gray-600">Let&apos;s start with some basic details about you.</p>

            <div className="space-y-4">
              <div>
                <label htmlFor="age" className="label">
                  Your Age <span className="text-primary-500">*</span>
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={profile.age ?? ''}
                  onChange={handleInputChange}
                  className={`input ${touched.age && errors.age ? 'border-red-400 focus:ring-red-400' : ''}`}
                  placeholder="Enter your age"
                  min="18"
                  max="100"
                  required
                  aria-invalid={touched.age && !!errors.age}
                  aria-describedby={errors.age ? 'age-error' : undefined}
                />
                {touched.age && errors.age && (
                  <p id="age-error" className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.age}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="occupation" className="label">
                  Occupation <span className="text-primary-500">*</span>
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={profile.occupation ?? ''}
                  onChange={handleInputChange}
                  className={`input ${touched.occupation && errors.occupation ? 'border-red-400 focus:ring-red-400' : ''}`}
                  placeholder="What do you do for work?"
                  required
                  aria-invalid={touched.occupation && !!errors.occupation}
                  aria-describedby={errors.occupation ? 'occupation-error' : undefined}
                />
                {touched.occupation && errors.occupation && (
                  <p id="occupation-error" className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.occupation}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 'lifestyle':
        return (
          <div className="space-y-6 animate-fade-in" key="lifestyle">
            <h3 className="text-2xl font-bold text-gray-900">Lifestyle & Health</h3>
            <p className="text-gray-600">Help us understand your lifestyle and health situation.</p>

            <div className="space-y-4">
              <div>
                <label htmlFor="annualIncome" className="label">
                  Annual Household Income <span className="text-primary-500">*</span>
                </label>
                <select
                  id="annualIncome"
                  name="annualIncome"
                  value={profile.annualIncome ?? ''}
                  onChange={handleInputChange}
                  className={`input ${touched.annualIncome && errors.annualIncome ? 'border-red-400 focus:ring-red-400' : ''}`}
                  required
                  aria-invalid={touched.annualIncome && !!errors.annualIncome}
                  aria-describedby={errors.annualIncome ? 'income-error' : undefined}
                >
                  <option value="">Select income range</option>
                  {incomeRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
                {touched.annualIncome && errors.annualIncome && (
                  <p id="income-error" className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.annualIncome}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    id="hasHealthConditions"
                    name="hasHealthConditions"
                    checked={profile.hasHealthConditions ?? false}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="hasHealthConditions" className="text-gray-700 cursor-pointer">
                    I have existing health conditions
                  </label>
                </div>

                <div>
                  <label htmlFor="smokingStatus" className="label">
                    Smoking Status <span className="text-primary-500">*</span>
                  </label>
                  <select
                    id="smokingStatus"
                    name="smokingStatus"
                    value={profile.smokingStatus ?? ''}
                    onChange={handleInputChange}
                    className="input"
                    required
                  >
                    <option value="">Select smoking status</option>
                    <option value="never">Never smoked</option>
                    <option value="former">Former smoker</option>
                    <option value="current">Current smoker</option>
                  </select>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    id="hasDependents"
                    name="hasDependents"
                    checked={profile.hasDependents ?? false}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="hasDependents" className="text-gray-700 cursor-pointer">
                    I have dependents (children, elderly parents, etc.)
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'assets':
        return (
          <div className="space-y-6 animate-fade-in" key="assets">
            <h3 className="text-2xl font-bold text-gray-900">Assets & Property</h3>
            <p className="text-gray-600">Tell us about your major assets to ensure proper coverage.</p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  id="ownsHome"
                  name="ownsHome"
                  checked={profile.ownsHome ?? false}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="ownsHome" className="text-gray-700 cursor-pointer">
                  I own a home
                </label>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  id="ownsVehicle"
                  name="ownsVehicle"
                  checked={profile.ownsVehicle ?? false}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="ownsVehicle" className="text-gray-700 cursor-pointer">
                  I own a vehicle
                </label>
              </div>

              <div>
                <label htmlFor="currentCoverageStatus" className="label">
                  Current Insurance Coverage <span className="text-primary-500">*</span>
                </label>
                <select
                  id="currentCoverageStatus"
                  name="currentCoverageStatus"
                  value={profile.currentCoverageStatus ?? ''}
                  onChange={handleInputChange}
                  className="input"
                  required
                >
                  <option value="">Select coverage status</option>
                  <option value="none">No current coverage</option>
                  <option value="partial">Partially covered</option>
                  <option value="comprehensive">Comprehensively covered</option>
                </select>
              </div>
            </div>

            <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-primary-700">
                All information is encrypted and used only to generate your personalized recommendations. We never share your data.
              </p>
            </div>
          </div>
        );

      case 'results':
        return <div />;
    }
  };

  if (currentStep === 'results') {
    return null;
  }

  return (
    <section
      id="assessment"
      className={`py-16 sm:py-24 bg-white ${className}`}
      aria-labelledby="assessment-heading"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="assessment-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900"
          >
            Risk Assessment
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Complete this quick assessment to get your personalized coverage recommendations.
          </p>
        </div>

        <div className="card">
          {/* Step progress indicator */}
          <div className="mb-8" role="progressbar" aria-valuenow={currentStepIndex + 1} aria-valuemin={1} aria-valuemax={3}>
            <div className="flex items-center justify-between mb-2">
              {stepKeys.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      currentStep === step
                        ? 'bg-primary-500 text-white scale-110'
                        : index < currentStepIndex
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                    aria-current={currentStep === step ? 'step' : undefined}
                  >
                    {index < currentStepIndex ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < 2 && (
                    <div
                      className={`w-12 sm:w-20 h-1 mx-2 rounded-full transition-colors duration-300 ${
                        index < currentStepIndex
                          ? 'bg-green-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-gray-500">
              {stepKeys.map((step) => (
                <span
                  key={step}
                  className={currentStep === step ? 'text-primary-500 font-medium' : ''}
                >
                  {stepLabels[step]}
                </span>
              ))}
            </div>
          </div>

          {renderStep()}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={handlePrevStep}
              className={`btn btn-secondary transition-all duration-200 ${
                currentStep === 'profile' ? 'invisible opacity-0' : 'visible opacity-100'
              }`}
              disabled={currentStep === 'profile'}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {currentStep === 'assets' ? 'Get Results' : 'Continue'}
              {currentStep !== 'assets' && (
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
