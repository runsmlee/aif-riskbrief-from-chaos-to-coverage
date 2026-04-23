import type { ReactElement } from 'react';

interface SkeletonBlockProps {
  className?: string;
}

function SkeletonBlock({ className = '' }: SkeletonBlockProps): ReactElement {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

export function HeroSkeleton(): ReactElement {
  return (
    <section className="py-16 sm:py-24 lg:py-32" aria-label="Loading hero section" role="status">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <SkeletonBlock className="h-8 w-48 rounded-full" />
            <SkeletonBlock className="h-14 w-3/4" />
            <SkeletonBlock className="h-14 w-1/2" />
            <SkeletonBlock className="h-6 w-full" />
            <SkeletonBlock className="h-6 w-5/6" />
            <div className="flex gap-4 pt-4">
              <SkeletonBlock className="h-14 w-48 rounded-lg" />
              <SkeletonBlock className="h-14 w-36 rounded-lg" />
            </div>
          </div>
          <div className="hidden md:block">
            <SkeletonBlock className="aspect-square max-w-lg mx-auto rounded-3xl" />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading hero section...</span>
    </section>
  );
}

export function StatsSkeleton(): ReactElement {
  return (
    <section className="py-12 bg-primary-500" aria-label="Loading statistics" role="status">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="text-center space-y-2">
              <SkeletonBlock className="h-10 w-20 mx-auto bg-primary-400/50 rounded" />
              <SkeletonBlock className="h-4 w-32 mx-auto bg-primary-400/30 rounded" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading statistics...</span>
    </section>
  );
}

export function FeaturesSkeleton(): ReactElement {
  return (
    <section className="py-16 sm:py-24 bg-white" aria-label="Loading features" role="status">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <SkeletonBlock className="h-10 w-3/4 mx-auto" />
          <SkeletonBlock className="h-6 w-full mx-auto" />
        </div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
              <SkeletonBlock className="h-12 w-12 rounded-xl" />
              <SkeletonBlock className="h-6 w-3/4" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading features...</span>
    </section>
  );
}

export function HowItWorksSkeleton(): ReactElement {
  return (
    <section className="py-16 sm:py-24 bg-gray-50" aria-label="Loading how it works" role="status">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <SkeletonBlock className="h-10 w-1/2 mx-auto" />
          <SkeletonBlock className="h-6 w-2/3 mx-auto" />
        </div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="text-center space-y-4">
              <SkeletonBlock className="h-16 w-16 rounded-full mx-auto" />
              <SkeletonBlock className="h-6 w-2/3 mx-auto" />
              <SkeletonBlock className="h-4 w-full mx-auto" />
              <SkeletonBlock className="h-4 w-4/5 mx-auto" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading how it works...</span>
    </section>
  );
}

export function TestimonialsSkeleton(): ReactElement {
  return (
    <section className="py-16 sm:py-24 bg-white" aria-label="Loading testimonials" role="status">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <SkeletonBlock className="h-10 w-1/2 mx-auto" />
          <SkeletonBlock className="h-6 w-2/3 mx-auto" />
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, j) => (
                  <SkeletonBlock key={j} className="h-5 w-5 rounded-sm" />
                ))}
              </div>
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-5/6" />
              <SkeletonBlock className="h-4 w-4/5" />
              <div className="flex items-center gap-3 pt-2">
                <SkeletonBlock className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <SkeletonBlock className="h-4 w-24" />
                  <SkeletonBlock className="h-3 w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading testimonials...</span>
    </section>
  );
}

export function FAQSkeleton(): ReactElement {
  return (
    <section className="py-16 sm:py-24 bg-gray-50" aria-label="Loading FAQ" role="status">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <SkeletonBlock className="h-10 w-1/2 mx-auto" />
          <SkeletonBlock className="h-6 w-1/3 mx-auto" />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="space-y-3 border-b border-gray-100 pb-5 last:border-b-0 last:pb-0">
              <SkeletonBlock className="h-6 w-3/4" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading FAQ...</span>
    </section>
  );
}

export function AssessmentSkeleton(): ReactElement {
  return (
    <section className="py-16 sm:py-24 bg-white" aria-label="Loading assessment" role="status">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <SkeletonBlock className="h-10 w-1/2 mx-auto" />
          <SkeletonBlock className="h-6 w-3/4 mx-auto" />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="flex items-center justify-between">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex items-center gap-2">
                <SkeletonBlock className="h-8 w-8 rounded-full" />
                {i < 2 && <SkeletonBlock className="h-1 w-16" />}
              </div>
            ))}
          </div>
          <div className="space-y-4 pt-4">
            <SkeletonBlock className="h-6 w-1/3" />
            <SkeletonBlock className="h-12 w-full rounded-lg" />
            <SkeletonBlock className="h-12 w-full rounded-lg" />
            <div className="flex justify-end pt-4">
              <SkeletonBlock className="h-12 w-32 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading assessment form...</span>
    </section>
  );
}

export function RecommendationsSkeleton(): ReactElement {
  return (
    <section className="py-16 sm:py-24 bg-gray-50" aria-label="Loading recommendations" role="status">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <SkeletonBlock className="h-10 w-1/2 mx-auto" />
          <SkeletonBlock className="h-6 w-2/3 mx-auto" />
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <SkeletonBlock className="h-6 w-1/2 mx-auto" />
              <SkeletonBlock className="h-36 w-36 rounded-full mx-auto" />
              <SkeletonBlock className="h-4 w-20 mx-auto" />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
              <SkeletonBlock className="h-6 w-1/2" />
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="space-y-1">
                  <SkeletonBlock className="h-4 w-full" />
                  <SkeletonBlock className="h-3 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <SkeletonBlock className="h-12 w-12 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <SkeletonBlock className="h-6 w-1/2" />
                    <SkeletonBlock className="h-4 w-3/4" />
                    <div className="flex gap-6">
                      <SkeletonBlock className="h-10 w-20" />
                      <SkeletonBlock className="h-10 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <span className="sr-only">Loading recommendations...</span>
    </section>
  );
}
