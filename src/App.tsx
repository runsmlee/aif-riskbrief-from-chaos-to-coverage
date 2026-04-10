import { useState, useCallback, lazy, Suspense } from 'react';
import type { ReactElement } from 'react';
import {
  Header,
  Hero,
  Features,
  HowItWorks,
  StatsAndCTA,
  Testimonials,
  FAQ,
  Footer,
} from './components';
import type { RiskAssessment } from './types';

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
        {!assessment ? (
          <>
            <Hero onStartAssessment={handleStartAssessment} />
            <StatsAndCTA onStartAssessment={handleStartAssessment} />
            <Features />
            <HowItWorks />
            <Testimonials />
            <FAQ />
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
