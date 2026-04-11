import { useState, useCallback, lazy, Suspense, Component } from 'react';
import type { ReactElement, ErrorInfo } from 'react';
import { Header, Hero } from './components';
import type { RiskAssessment } from './types';

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

function LoadingSpinner(): ReactElement {
  return (
    <div className="flex items-center justify-center py-24" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        <p className="text-gray-500 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
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

  const handleStartAssessment = useCallback(() => {
    setShowAssessment(true);
    setAssessment(null);

    setTimeout(() => {
      const assessmentSection = document.getElementById('assessment');
      if (assessmentSection) {
        assessmentSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  const handleAssessmentComplete = useCallback((result: RiskAssessment) => {
    setAssessment(result);
    setShowAssessment(false);
  }, []);

  const handleReset = useCallback(() => {
    setAssessment(null);
    setShowAssessment(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <ErrorBoundary>
          {!assessment ? (
            <>
              <Hero onStartAssessment={handleStartAssessment} />
              <Suspense fallback={<LoadingSpinner />}>
                <StatsAndCTA onStartAssessment={handleStartAssessment} />
              </Suspense>
              <Suspense fallback={<LoadingSpinner />}>
                <Features />
              </Suspense>
              <Suspense fallback={<LoadingSpinner />}>
                <HowItWorks />
              </Suspense>
              <Suspense fallback={<LoadingSpinner />}>
                <Testimonials />
              </Suspense>
              <Suspense fallback={<LoadingSpinner />}>
                <FAQ />
              </Suspense>
              {showAssessment && (
                <Suspense fallback={<LoadingSpinner />}>
                  <RiskAssessmentForm onComplete={handleAssessmentComplete} />
                </Suspense>
              )}
            </>
          ) : (
            <Suspense fallback={<LoadingSpinner />}>
              <CoverageRecommendations assessment={assessment} onReset={handleReset} />
            </Suspense>
          )}
        </ErrorBoundary>
      </main>
      <ErrorBoundary>
        <Suspense fallback={<div className="h-48" />}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
