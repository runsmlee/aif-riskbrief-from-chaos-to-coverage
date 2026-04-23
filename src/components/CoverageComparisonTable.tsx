import { useState, useCallback, useMemo } from 'react';
import type { ReactElement } from 'react';
import type { CoverageRecommendation } from '../types';
import { calculateTotalMonthly } from '../utils/premiumCalculator';

type SortColumn = 'title' | 'coverageAmount' | 'monthlyPremium' | 'priority';
type SortDirection = 'asc' | 'desc';

const priorityOrder: Record<string, number> = { high: 3, medium: 2, low: 1 };

interface CoverageComparisonTableProps {
  recommendations: CoverageRecommendation[];
  className?: string;
}

export function CoverageComparisonTable({ recommendations, className = '' }: CoverageComparisonTableProps): ReactElement {
  const [sortColumn, setSortColumn] = useState<SortColumn>('priority');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = useCallback((column: SortColumn) => {
    setSortColumn((prev) => {
      if (prev === column) {
        setSortDirection((d) => d === 'asc' ? 'desc' : 'asc');
        return prev;
      }
      setSortDirection('desc');
      return column;
    });
  }, []);

  const parsePremiumValue = useCallback((premium: string): number => {
    const value = parseFloat(premium.replace('$', ''));
    return isNaN(value) ? 0 : value;
  }, []);

  const parseCoverageValue = useCallback((coverage: string): number => {
    const match = coverage.match(/\$(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }, []);

  const sortedRecommendations = useMemo(() => {
    const sorted = [...recommendations].sort((a, b) => {
      let comparison = 0;
      switch (sortColumn) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'coverageAmount':
          comparison = parseCoverageValue(a.coverageAmount) - parseCoverageValue(b.coverageAmount);
          break;
        case 'monthlyPremium':
          comparison = parsePremiumValue(a.monthlyPremium) - parsePremiumValue(b.monthlyPremium);
          break;
        case 'priority':
          comparison = (priorityOrder[a.priority] ?? 0) - (priorityOrder[b.priority] ?? 0);
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    return sorted;
  }, [recommendations, sortColumn, sortDirection, parsePremiumValue, parseCoverageValue]);

  const SortIndicator = ({ column }: { column: SortColumn }): ReactElement => {
    const isActive = sortColumn === column;
    return (
      <span className="ml-1 inline-flex flex-col" aria-hidden="true">
        <svg className={`w-3 h-3 ${isActive && sortDirection === 'asc' ? 'text-primary-500' : 'text-gray-400'}`} viewBox="0 0 10 6" fill="currentColor">
          <path d="M5 0L10 6H0z" />
        </svg>
        <svg className={`w-3 h-3 -mt-1 ${isActive && sortDirection === 'desc' ? 'text-primary-500' : 'text-gray-400'}`} viewBox="0 0 10 6" fill="currentColor">
          <path d="M5 6L0 0h10z" />
        </svg>
      </span>
    );
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm" role="table">
        <caption className="sr-only">
          Comparison of recommended insurance coverage options. Click column headers to sort.
        </caption>
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">
              <button
                type="button"
                className="inline-flex items-center hover:text-primary-500 transition-colors focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 rounded-sm"
                onClick={() => handleSort('title')}
                aria-sort={sortColumn === 'title' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Coverage Type
                <SortIndicator column="title" />
              </button>
            </th>
            <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">
              <button
                type="button"
                className="inline-flex items-center hover:text-primary-500 transition-colors focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 rounded-sm"
                onClick={() => handleSort('coverageAmount')}
                aria-sort={sortColumn === 'coverageAmount' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Coverage Amount
                <SortIndicator column="coverageAmount" />
              </button>
            </th>
            <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">
              <button
                type="button"
                className="inline-flex items-center hover:text-primary-500 transition-colors focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 rounded-sm"
                onClick={() => handleSort('monthlyPremium')}
                aria-sort={sortColumn === 'monthlyPremium' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Monthly Premium
                <SortIndicator column="monthlyPremium" />
              </button>
            </th>
            <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">
              <button
                type="button"
                className="inline-flex items-center hover:text-primary-500 transition-colors focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 rounded-sm"
                onClick={() => handleSort('priority')}
                aria-sort={sortColumn === 'priority' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Priority
                <SortIndicator column="priority" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRecommendations.map((rec) => {
            const priorityStyle =
              rec.priority === 'high'
                ? 'bg-red-100 text-red-700'
                : rec.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-green-100 text-green-700';

            return (
              <tr
                key={rec.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium text-gray-900">{rec.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 max-w-[200px] truncate">{rec.description}</p>
                  </div>
                </td>
                <td className="py-3 px-4 font-medium text-gray-900 tabular-nums">
                  {rec.coverageAmount}
                </td>
                <td className="py-3 px-4 font-semibold text-primary-500 tabular-nums">
                  {rec.monthlyPremium}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${priorityStyle}`}
                  >
                    {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-gray-200">
            <td colSpan={2} className="py-3 px-4 font-bold text-gray-900">
              Total Monthly
            </td>
            <td className="py-3 px-4 font-bold text-primary-500 tabular-nums">
              ${calculateTotalMonthly(recommendations).toFixed(0)}
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
