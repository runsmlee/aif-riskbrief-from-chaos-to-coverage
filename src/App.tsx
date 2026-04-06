import { useState, useCallback } from 'react';
import type { ReactElement } from 'react';
import {
  Header,
  Hero,
  Features,
  HowItWorks,
  RiskAssessmentForm,
  CoverageRecommendations,
  Footer,
} from './components';
import type { RiskAssessment } from './types';

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
            <Features />
            <HowItWorks />
            {showAssessment && (
              <RiskAssessmentForm onComplete={handleAssessmentComplete} />
            )}
          </>
        ) : (
          <CoverageRecommendations assessment={assessment} onReset={handleReset} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
