import type { RiskAssessment } from '../types';

export function generateReportHTML(assessment: RiskAssessment): string {
  const totalMonthly = assessment.recommendations.reduce((sum, rec) => {
    const premium = parseFloat(rec.monthlyPremium.replace('$', ''));
    return sum + (isNaN(premium) ? 0 : premium);
  }, 0);

  // Dynamic savings based on coverage gap count
  const gapCount = assessment.coverageGapCount ?? 1;
  const savingsRate = gapCount >= 3 ? 0.18 : gapCount >= 1 ? 0.12 : 0.08;
  const estimatedAnnualSavings = Math.round(totalMonthly * 12 * savingsRate);

  const recommendationsHTML = assessment.recommendations
    .map(
      (rec) => `
    <div style="padding: 16px; margin-bottom: 12px; border: 1px solid #e5e7eb; border-radius: 8px; page-break-inside: avoid;">
      <div style="display: flex; justify-content: space-between; align-items: start;">
        <div>
          <h4 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600; color: #111827;">${rec.title}</h4>
          <p style="margin: 0; font-size: 14px; color: #6b7280;">${rec.description}</p>
        </div>
        <span style="padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; background: ${rec.priority === 'high' ? '#fee2e2' : rec.priority === 'medium' ? '#fef9c3' : '#dcfce7'}; color: ${rec.priority === 'high' ? '#b91c1c' : rec.priority === 'medium' ? '#a16207' : '#15803d'};">
          ${rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
        </span>
      </div>
      <div style="display: flex; gap: 32px; margin-top: 12px;">
        <div>
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">Coverage Amount</p>
          <p style="margin: 2px 0 0 0; font-size: 18px; font-weight: 600; color: #111827;">${rec.coverageAmount}</p>
        </div>
        <div>
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">Monthly Premium</p>
          <p style="margin: 2px 0 0 0; font-size: 18px; font-weight: 600; color: #ef4444;">${rec.monthlyPremium}</p>
        </div>
      </div>
      <div style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 4px;">
        ${rec.benefits.map((b) => `<span style="padding: 2px 8px; background: #f3f4f6; color: #374151; font-size: 12px; border-radius: 4px;">${b}</span>`).join('')}
      </div>
    </div>`
    )
    .join('');

  const factorsHTML = assessment.factors
    .map(
      (f) =>
        `<li style="padding: 4px 0; display: flex; align-items: center; gap: 8px;">
        <span style="width: 8px; height: 8px; background: #ef4444; border-radius: 50%; display: inline-block;"></span>
        <span style="color: #4b5563; font-size: 14px;">${f}</span>
      </li>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RiskBrief — Coverage Report</title>
  <style>
    @media print {
      body { margin: 0; padding: 20px; }
      .no-print { display: none !important; }
    }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.5;
      color: #1f2937;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }
  </style>
</head>
<body>
  <div style="text-align: center; border-bottom: 2px solid #ef4444; padding-bottom: 24px; margin-bottom: 32px;">
    <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 8px;">
      <div style="width: 32px; height: 32px; background: #ef4444; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
        <span style="color: white; font-weight: bold; font-size: 16px;">R</span>
      </div>
      <span style="font-size: 24px; font-weight: bold; color: #111827;">RiskBrief</span>
    </div>
    <h1 style="font-size: 28px; font-weight: bold; color: #111827; margin: 16px 0 4px;">
      Your Coverage Report
    </h1>
    <p style="color: #6b7280; font-size: 14px;">Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>

  <div style="display: flex; gap: 24px; margin-bottom: 32px; flex-wrap: wrap;">
    <div style="flex: 1; min-width: 150px; padding: 20px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #dc2626; font-weight: 500;">Risk Score</p>
      <p style="margin: 4px 0 0 0; font-size: 32px; font-weight: bold; color: #dc2626;">${assessment.score}/100</p>
      <p style="margin: 4px 0 0 0; font-size: 14px; color: #dc2626; font-weight: 600;">${assessment.level.charAt(0).toUpperCase() + assessment.level.slice(1)} Risk</p>
    </div>
    <div style="flex: 1; min-width: 150px; padding: 20px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #15803d; font-weight: 500;">Est. Annual Savings</p>
      <p style="margin: 4px 0 0 0; font-size: 32px; font-weight: bold; color: #15803d;">$${estimatedAnnualSavings}</p>
    </div>
    <div style="flex: 1; min-width: 150px; padding: 20px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #1d4ed8; font-weight: 500;">Monthly Premium</p>
      <p style="margin: 4px 0 0 0; font-size: 32px; font-weight: bold; color: #1d4ed8;">$${totalMonthly.toFixed(0)}</p>
    </div>
  </div>

  ${
    assessment.factors.length > 0
      ? `<div style="margin-bottom: 32px;">
    <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 12px;">Key Risk Factors</h3>
    <ul style="list-style: none; padding: 0; margin: 0;">
      ${factorsHTML}
    </ul>
  </div>`
      : ''
  }

  <div style="margin-bottom: 32px;">
    <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 16px;">Recommended Coverages</h3>
    ${recommendationsHTML}
  </div>

  <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; text-align: center;">
    <p style="margin: 0; font-size: 12px; color: #9ca3af;">
      This report is generated by RiskBrief for informational purposes only.
      Consult a licensed insurance professional for specific advice.
    </p>
    <p style="margin: 8px 0 0 0; font-size: 12px; color: #9ca3af;">
      &copy; ${new Date().getFullYear()} RiskBrief. All rights reserved.
    </p>
  </div>

  <div class="no-print" style="text-align: center; margin-top: 24px;">
    <button onclick="window.print()" style="background: #ef4444; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
      Print Report
    </button>
  </div>
</body>
</html>`;
}

export function downloadReport(assessment: RiskAssessment): void {
  const html = generateReportHTML(assessment);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `riskbrief-report-${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
