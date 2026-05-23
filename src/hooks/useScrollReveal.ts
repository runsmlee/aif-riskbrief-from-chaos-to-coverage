import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}): {
  ref: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
} {
  const { threshold = 0.1, rootMargin = '0px 0px -60px 0px', triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

export function useAnimatedCounter(
  target: number,
  duration: number = 1000,
  isActive: boolean = false
): number {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);

  const animate = useCallback(
    (timestamp: number) => {
      if (startTime.current === null) {
        startTime.current = timestamp;
      }

      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    },
    [target, duration]
  );

  useEffect(() => {
    if (!isActive) {
      setCount(0);
      startTime.current = null;
      return;
    }

    startTime.current = null;
    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isActive, animate]);

  return count;
}
