import { useState, useCallback } from 'react';
import type { ReactElement } from 'react';
import type { UserProfile, FormStep, CoverageRecommendation, RiskAssessment } from '../types';

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

function generateRecommendations(profile: UserProfile): CoverageRecommendation[] {
  const recommendations: CoverageRecommendation[] = [];

  if (profile.hasDependents || profile.age < 55) {
    const baseAmount = profile.annualIncome === '150000+' ? 1000000 :
      profile.annualIncome === '100000-150000' ? 750000 :
      profile.annualIncome === '50000-100000' ? 500000 : 250000;

    recommendations.push({
      id: 'life-1',
      type: 'life',
      title: 'Term Life Insurance',
      description: 'Protect your loved ones with comprehensive life coverage.',
      coverageAmount: `$${(baseAmount / 1000).toFixed(0)}K`,
      monthlyPremium: `$${Math.round(baseAmount / 10000 + profile.age * 0.5)}`,
      priority: profile.hasDependents ? 'high' : 'medium',
      benefits: ['Death benefit payout', 'Level premiums', 'Convertible to permanent', 'Accelerated death benefit'],
    });
  }

  recommendations.push({
    id: 'health-1',
    type: 'health',
    title: 'Health Insurance',
    description: 'Comprehensive health coverage for medical expenses.',
    coverageAmount: '$250K',
    monthlyPremium: profile.hasHealthConditions ? '$350' : '$250',
    priority: 'high',
    benefits: ['Hospital coverage', 'Prescription drugs', 'Preventive care', 'Mental health services'],
  });

  if (profile.ownsVehicle) {
    recommendations.push({
      id: 'auto-1',
      type: 'auto',
      title: 'Auto Insurance',
      description: 'Full coverage auto insurance to protect you on the road.',
      coverageAmount: '$100K/$300K',
      monthlyPremium: '$85',
      priority: 'high',
      benefits: ['Liability coverage', 'Collision coverage', 'Comprehensive coverage', 'Roadside assistance'],
    });
  }

  if (profile.ownsHome) {
    recommendations.push({
      id: 'home-1',
      type: 'home',
      title: 'Homeowners Insurance',
      description: 'Protect your home and belongings from unexpected events.',
      coverageAmount: '$400K',
      monthlyPremium: '$120',
      priority: 'high',
      benefits: ['Dwelling coverage', 'Personal property', 'Liability protection', 'Additional living expenses'],
    });
  }

  if (profile.occupation.toLowerCase().includes('construction') ||
      profile.occupation.toLowerCase().includes('manual') ||
      profile.hasHealthConditions) {
    recommendations.push({
      id: 'disability-1',
      type: 'disability',
      title: 'Disability Insurance',
      description: 'Income protection if you cannot work due to illness or injury.',
      coverageAmount: '60% of income',
      monthlyPremium: '$95',
      priority: 'high',
      benefits: ['Short-term coverage', 'Long-term coverage', 'Own occupation definition', 'Non-cancelable'],
    });
  }

  return recommendations;
}

function calculateRiskScore(profile: UserProfile): number {
  let score = 50;

  if (profile.age > 50) score += 10;
  if (profile.age > 65) score += 10;
  if (profile.hasHealthConditions) score += 15;
  if (profile.hasDependents) score += 5;
  if (!profile.ownsHome && profile.age > 30) score -= 5;
  if (!profile.ownsVehicle && profile.age > 25) score -= 5;

  return Math.min(100, Math.max(0, score));
}

function getRiskLevel(score: number): 'low' | 'moderate' | 'high' {
  if (score < 40) return 'low';
  if (score < 70) return 'moderate';
  return 'high';
}

export function RiskAssessmentForm({ onComplete, className = '' }: RiskAssessmentFormProps): ReactElement | null {
  const [currentStep, setCurrentStep] = useState<FormStep>('profile');
  const [profile, setProfile] = useState<Partial<UserProfile>>({});

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleNextStep = useCallback(() => {
    if (currentStep === 'profile') {
      setCurrentStep('lifestyle');
    } else if (currentStep === 'lifestyle') {
      setCurrentStep('assets');
    } else if (currentStep === 'assets') {
      const completeProfile: UserProfile = {
        age: Number(profile.age) || 30,
        occupation: profile.occupation || 'Not specified',
        hasHealthConditions: profile.hasHealthConditions || false,
        ownsHome: profile.ownsHome || false,
        ownsVehicle: profile.ownsVehicle || false,
        hasDependents: profile.hasDependents || false,
        annualIncome: profile.annualIncome || '0-50000',
      };

      const score = calculateRiskScore(completeProfile);
      const recommendations = generateRecommendations(completeProfile);
      const factors = [];

      if (completeProfile.hasHealthConditions) factors.push('Existing health conditions');
      if (completeProfile.hasDependents) factors.push('Dependents to protect');
      if (completeProfile.ownsHome) factors.push('Home ownership');
      if (completeProfile.ownsVehicle) factors.push('Vehicle ownership');
      if (completeProfile.age > 50) factors.push('Age consideration');

      const assessment: RiskAssessment = {
        score,
        level: getRiskLevel(score),
        factors,
        recommendations,
      };

      onComplete(assessment);
      setCurrentStep('results');
    }
  }, [currentStep, profile, onComplete]);

  const isProfileValid = profile.age && profile.occupation;
  const isLifestyleValid = profile.annualIncome !== undefined;
  const isAssetsValid = true;

  const renderStep = () => {
    switch (currentStep) {
      case 'profile':
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900">Basic Information</h3>
            <p className="text-gray-600">Let&apos;s start with some basic details about you.</p>

            <div className="space-y-4">
              <div>
                <label htmlFor="age" className="label">
                  Your Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={profile.age ?? ''}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter your age"
                  min="18"
                  max="100"
                  required
                />
              </div>

              <div>
                <label htmlFor="occupation" className="label">
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={profile.occupation ?? ''}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="What do you do for work?"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 'lifestyle':
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900">Lifestyle & Health</h3>
            <p className="text-gray-600">Help us understand your lifestyle and health situation.</p>

            <div className="space-y-4">
              <div>
                <label htmlFor="annualIncome" className="label">
                  Annual Household Income
                </label>
                <select
                  id="annualIncome"
                  name="annualIncome"
                  value={profile.annualIncome ?? ''}
                  onChange={handleInputChange}
                  className="input"
                  required
                >
                  <option value="">Select income range</option>
                  {incomeRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="hasHealthConditions"
                    name="hasHealthConditions"
                    checked={profile.hasHealthConditions ?? false}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="hasHealthConditions" className="text-gray-700">
                    I have existing health conditions
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="hasDependents"
                    name="hasDependents"
                    checked={profile.hasDependents ?? false}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="hasDependents" className="text-gray-700">
                    I have dependents (children, elderly parents, etc.)
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'assets':
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900">Assets & Property</h3>
            <p className="text-gray-600">Tell us about your major assets to ensure proper coverage.</p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="ownsHome"
                  name="ownsHome"
                  checked={profile.ownsHome ?? false}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="ownsHome" className="text-gray-700">
                  I own a home
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="ownsVehicle"
                  name="ownsVehicle"
                  checked={profile.ownsVehicle ?? false}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="ownsVehicle" className="text-gray-700">
                  I own a vehicle
                </label>
              </div>
            </div>
          </div>
        );

      case 'results':
        return null;
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
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {['profile', 'lifestyle', 'assets'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep === step
                        ? 'bg-primary-500 text-white'
                        : index < ['profile', 'lifestyle', 'assets'].indexOf(currentStep)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                    aria-current={currentStep === step ? 'step' : undefined}
                  >
                    {index + 1}
                  </div>
                  {index < 2 && (
                    <div
                      className={`w-12 sm:w-20 h-1 mx-2 ${
                        index < ['profile', 'lifestyle', 'assets'].indexOf(currentStep)
                          ? 'bg-green-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-gray-500">
              <span>Profile</span>
              <span>Lifestyle</span>
              <span>Assets</span>
            </div>
          </div>

          {renderStep()}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => {
                if (currentStep === 'lifestyle') setCurrentStep('profile');
                else if (currentStep === 'assets') setCurrentStep('lifestyle');
              }}
              className={`btn btn-secondary ${currentStep === 'profile' ? 'invisible' : ''}`}
              disabled={currentStep === 'profile'}
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              disabled={
                (currentStep === 'profile' && !isProfileValid) ||
                (currentStep === 'lifestyle' && !isLifestyleValid) ||
                (currentStep === 'assets' && !isAssetsValid)
              }
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 'assets' ? 'Get Results' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
