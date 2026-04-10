import type { ReactElement } from 'react';
import type { CoverageRecommendation } from '../types';

interface CoverageComparisonTableProps {
  recommendations: CoverageRecommendation[];
  className?: string;
}

export function CoverageComparisonTable({ recommendations, className = '' }: CoverageComparisonTableProps): ReactElement {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm" role="table">
        <caption className="sr-only">
          Comparison of recommended insurance coverage options
        </caption>
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">
              Coverage Type
            </th>
            <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">
              Coverage Amount
            </th>
            <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">
              Monthly Premium
            </th>
            <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">
              Priority
            </th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((rec) => {
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
              ${recommendations
                .reduce((sum, rec) => {
                  const premium = parseFloat(rec.monthlyPremium.replace('$', ''));
                  return sum + (isNaN(premium) ? 0 : premium);
                }, 0)
                .toFixed(0)}
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
