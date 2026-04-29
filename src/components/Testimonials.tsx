import { useState, useCallback, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Small Business Owner',
    quote: 'RiskBrief helped me understand exactly what coverage I needed for my family and business. I saved over $200/month by eliminating redundant policies.',
    rating: 5,
  },
  {
    id: '2',
    name: 'James Rodriguez',
    role: 'Software Engineer',
    quote: 'The assessment took less than 5 minutes and the recommendations were spot-on. Clear, jargon-free explanations made all the difference.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Chen',
    role: 'First-time Homeowner',
    quote: 'As a new homeowner, I was overwhelmed by insurance options. RiskBrief broke everything down and gave me confidence in my coverage decisions.',
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }): ReactElement {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface TestimonialsProps {
  className?: string;
}

export function Testimonials({ className = '' }: TestimonialsProps): ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveIndex((index + 1) % testimonials.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveIndex((index - 1 + testimonials.length) % testimonials.length);
    }
  }, []);

  // Auto-rotate testimonials every 6 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Pause auto-rotation on hover/focus
  const pauseAutoRotate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resumeAutoRotate = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
  }, []);

  return (
    <section
      id="testimonials"
      className={`py-16 sm:py-24 bg-white ${className}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900"
          >
            Trusted by Thousands
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See how RiskBrief is helping people make smarter insurance decisions.
          </p>
        </div>

        <div
          className="grid md:grid-cols-3 gap-8"
          onMouseEnter={pauseAutoRotate}
          onMouseLeave={resumeAutoRotate}
          onFocus={pauseAutoRotate}
          onBlur={resumeAutoRotate}
          role="group"
          aria-label="Customer testimonials"
        >
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={testimonial.id}
              className={`card card-elevated transition-all duration-300 ${
                activeIndex === index
                  ? 'ring-2 ring-primary-500 shadow-lg border-primary-200'
                  : 'hover:shadow-lg border border-transparent'
              }`}
              onMouseEnter={() => goToSlide(index)}
              onFocus={() => goToSlide(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={0}
              aria-label={`Testimonial from ${testimonial.name}`}
            >
              <StarRating rating={testimonial.rating} />
              <p className="mt-4 text-gray-600 italic leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm"
                  aria-hidden="true"
                >
                  {testimonial.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <cite className="not-italic font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </cite>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8" aria-label="Testimonial navigation" role="tablist">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`View testimonial ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                activeIndex === index
                  ? 'bg-primary-500 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
