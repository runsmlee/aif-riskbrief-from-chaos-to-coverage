import { useState, useCallback, lazy, Suspense, Component } from 'react';
import type { ReactElement, ErrorInfo } from 'react';
import { Header, Hero } from './components';
import type { RiskAssessment } from './types';
import {
  StatsSkeleton,
  FeaturesSkeleton,
  HowItWorksSkeleton,
  TestimonialsSkeleton,
  FAQSkeleton,
  AssessmentSkeleton,
  RecommendationsSkeleton,
} from './components/SkeletonLoader';

const Features = lazy(() =>
  import('./components/Features').then((m) => ({ default: m.Features }))
);
const HowItWorks = lazy(() =>
  import('./components/HowItWorks').then((m) => ({ default: m.HowItWorks }))
);
const StatsAndCTA = lazy(() =>
  import('./components/StatsAndCTA').then((m) => ({ default: m.StatsAndCTA }))
);
const Testimonials = lazy(() =>
  import('./components/Testimonials').then((m) => ({ default: m.Testimonials }))
);
const FAQ = lazy(() =>
  import('./components/FAQ').then((m) => ({ default: m.FAQ }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);
const RiskAssessmentForm = lazy(() =>
  import('./components/RiskAssessmentForm').then((m) => ({ default: m.RiskAssessmentForm }))
);
const CoverageRecommendations = lazy(() =>
  import('./components/CoverageRecommendations').then((m) => ({
    default: m.CoverageRecommendations,
  }))
);

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center" role="alert">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App(): ReactElement {
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStartAssessment = useCallback(() => {
    setIsTransitioning(true);
    setShowAssessment(true);
    setAssessment(null);

    setTimeout(() => {
      const assessmentSection = document.getElementById('assessment');
      if (assessmentSection) {
        assessmentSection.scrollIntoView({ behavior: 'smooth' });
      }
      setIsTransitioning(false);
    }, 100);
  }, []);

  const handleAssessmentComplete = useCallback((result: RiskAssessment) => {
    setIsTransitioning(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setAssessment(result);
      setShowAssessment(false);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleReset = useCallback(() => {
    setIsTransitioning(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setAssessment(null);
      setShowAssessment(false);
      setIsTransitioning(false);
    }, 300);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        className={`flex-1 transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <ErrorBoundary>
          {!assessment ? (
            <>
              <Hero onStartAssessment={handleStartAssessment} />
              <Suspense fallback={<><StatsSkeleton /><section className="py-16 sm:py-24 bg-white relative overflow-hidden" aria-label="Loading" role="status"><div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><div className="animate-pulse bg-gray-200 rounded h-10 w-1/2 mx-auto" aria-hidden="true" /><span className="sr-only">Loading CTA section...</span></div></section></>}>
                <StatsAndCTA onStartAssessment={handleStartAssessment} />
              </Suspense>
              <Suspense fallback={<FeaturesSkeleton />}>
                <Features />
              </Suspense>
              <Suspense fallback={<HowItWorksSkeleton />}>
                <HowItWorks />
              </Suspense>
              <Suspense fallback={<TestimonialsSkeleton />}>
                <Testimonials />
              </Suspense>
              <Suspense fallback={<FAQSkeleton />}>
                <FAQ />
              </Suspense>
              {showAssessment && (
                <Suspense fallback={<AssessmentSkeleton />}>
                  <RiskAssessmentForm onComplete={handleAssessmentComplete} />
                </Suspense>
              )}
            </>
          ) : (
            <Suspense fallback={<RecommendationsSkeleton />}>
              <CoverageRecommendations assessment={assessment} onReset={handleReset} onRestore={handleAssessmentComplete} />
            </Suspense>
          )}
        </ErrorBoundary>
      </main>
      <ErrorBoundary>
        <Suspense fallback={<div className="h-64 bg-gray-900 animate-pulse" aria-hidden="true" />}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
