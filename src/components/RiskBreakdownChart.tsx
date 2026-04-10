import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';

interface RiskFactor {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

interface RiskBreakdownChartProps {
  factors: RiskFactor[];
  className?: string;
}

function RiskBar({ factor, delay }: { factor: RiskFactor; delay: number }): ReactElement {
  const [width, setWidth] = useState(0);
  const percentage = Math.min((factor.value / factor.maxValue) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700 font-medium">{factor.label}</span>
        <span className="text-gray-500 tabular-nums">{factor.value}/{factor.maxValue}</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden" role="meter" aria-valuenow={factor.value} aria-valuemin={0} aria-valuemax={factor.maxValue} aria-label={`${factor.label} risk factor`}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${width}%`,
            backgroundColor: factor.color,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export function RiskBreakdownChart({ factors, className = '' }: RiskBreakdownChartProps): ReactElement {
  return (
    <div className={`space-y-4 ${className}`}>
      {factors.map((factor, index) => (
        <RiskBar key={factor.label} factor={factor} delay={index * 150} />
      ))}
    </div>
  );
}
