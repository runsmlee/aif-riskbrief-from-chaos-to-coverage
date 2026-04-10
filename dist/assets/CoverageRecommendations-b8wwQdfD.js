import{n as e,t}from"./jsx-runtime-CgtKVdba.js";import{n,r,t as i}from"./CoverageComparisonTable-DjQQxOio.js";var a=e();function o(e){let t=e.recommendations.reduce((e,t)=>{let n=parseFloat(t.monthlyPremium.replace(`$`,``));return e+(isNaN(n)?0:n)},0),n=Math.round(t*12*.15),r=e.recommendations.map(e=>`
    <div style="padding: 16px; margin-bottom: 12px; border: 1px solid #e5e7eb; border-radius: 8px; page-break-inside: avoid;">
      <div style="display: flex; justify-content: space-between; align-items: start;">
        <div>
          <h4 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600; color: #111827;">${e.title}</h4>
          <p style="margin: 0; font-size: 14px; color: #6b7280;">${e.description}</p>
        </div>
        <span style="padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; background: ${e.priority===`high`?`#fee2e2`:e.priority===`medium`?`#fef9c3`:`#dcfce7`}; color: ${e.priority===`high`?`#b91c1c`:e.priority===`medium`?`#a16207`:`#15803d`};">
          ${e.priority.charAt(0).toUpperCase()+e.priority.slice(1)} Priority
        </span>
      </div>
      <div style="display: flex; gap: 32px; margin-top: 12px;">
        <div>
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">Coverage Amount</p>
          <p style="margin: 2px 0 0 0; font-size: 18px; font-weight: 600; color: #111827;">${e.coverageAmount}</p>
        </div>
        <div>
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">Monthly Premium</p>
          <p style="margin: 2px 0 0 0; font-size: 18px; font-weight: 600; color: #ef4444;">${e.monthlyPremium}</p>
        </div>
      </div>
      <div style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 4px;">
        ${e.benefits.map(e=>`<span style="padding: 2px 8px; background: #f3f4f6; color: #374151; font-size: 12px; border-radius: 4px;">${e}</span>`).join(``)}
      </div>
    </div>`).join(``),i=e.factors.map(e=>`<li style="padding: 4px 0; display: flex; align-items: center; gap: 8px;">
        <span style="width: 8px; height: 8px; background: #ef4444; border-radius: 50%; display: inline-block;"></span>
        <span style="color: #4b5563; font-size: 14px;">${e}</span>
      </li>`).join(``);return`<!DOCTYPE html>
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
    <p style="color: #6b7280; font-size: 14px;">Generated on ${new Date().toLocaleDateString(`en-US`,{year:`numeric`,month:`long`,day:`numeric`})}</p>
  </div>

  <div style="display: flex; gap: 24px; margin-bottom: 32px; flex-wrap: wrap;">
    <div style="flex: 1; min-width: 150px; padding: 20px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #dc2626; font-weight: 500;">Risk Score</p>
      <p style="margin: 4px 0 0 0; font-size: 32px; font-weight: bold; color: #dc2626;">${e.score}/100</p>
      <p style="margin: 4px 0 0 0; font-size: 14px; color: #dc2626; font-weight: 600;">${e.level.charAt(0).toUpperCase()+e.level.slice(1)} Risk</p>
    </div>
    <div style="flex: 1; min-width: 150px; padding: 20px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #15803d; font-weight: 500;">Est. Annual Savings</p>
      <p style="margin: 4px 0 0 0; font-size: 32px; font-weight: bold; color: #15803d;">$${n}</p>
    </div>
    <div style="flex: 1; min-width: 150px; padding: 20px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #1d4ed8; font-weight: 500;">Monthly Premium</p>
      <p style="margin: 4px 0 0 0; font-size: 32px; font-weight: bold; color: #1d4ed8;">$${t.toFixed(0)}</p>
    </div>
  </div>

  ${e.factors.length>0?`<div style="margin-bottom: 32px;">
    <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 12px;">Key Risk Factors</h3>
    <ul style="list-style: none; padding: 0; margin: 0;">
      ${i}
    </ul>
  </div>`:``}

  <div style="margin-bottom: 32px;">
    <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 16px;">Recommended Coverages</h3>
    ${r}
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
</html>`}function s(e){let t=o(e),n=new Blob([t],{type:`text/html`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=`riskbrief-report-${new Date().toISOString().split(`T`)[0]}.html`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)}var c=t(),l={high:`bg-red-100 text-red-700`,medium:`bg-yellow-100 text-yellow-700`,low:`bg-green-100 text-green-700`},u={life:(0,c.jsx)(`svg`,{className:`w-6 h-6`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,children:(0,c.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,d:`M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z`})}),health:(0,c.jsx)(`svg`,{className:`w-6 h-6`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,children:(0,c.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,d:`M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z`})}),auto:(0,c.jsx)(`svg`,{className:`w-6 h-6`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,children:(0,c.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,d:`M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4`})}),home:(0,c.jsx)(`svg`,{className:`w-6 h-6`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,children:(0,c.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,d:`M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6`})}),disability:(0,c.jsx)(`svg`,{className:`w-6 h-6`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,children:(0,c.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,d:`M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z`})})},d={life:`Life`,health:`Health`,auto:`Auto`,home:`Home`,disability:`Disability`};function f({score:e,level:t}){let[n,r]=(0,a.useState)(0);(0,a.useEffect)(()=>{let t=Date.now();function n(){let i=Date.now()-t,a=Math.min(i/1200,1),o=1-(1-a)**3;r(Math.round(o*e)),a<1&&requestAnimationFrame(n)}let i=requestAnimationFrame(n);return()=>cancelAnimationFrame(i)},[e]);let i=()=>e<40?{stroke:`#22c55e`,text:`text-green-500`}:e<70?{stroke:`#eab308`,text:`text-yellow-500`}:{stroke:`#ef4444`,text:`text-red-500`},o=()=>t===`low`?`bg-green-100 text-green-700`:t===`moderate`?`bg-yellow-100 text-yellow-700`:`bg-red-100 text-red-700`,s=i();return(0,c.jsxs)(`div`,{className:`flex flex-col items-center`,children:[(0,c.jsxs)(`div`,{className:`relative w-36 h-36`,children:[(0,c.jsxs)(`svg`,{className:`w-full h-full transform -rotate-90`,viewBox:`0 0 36 36`,children:[(0,c.jsx)(`circle`,{className:`text-gray-200`,stroke:`currentColor`,strokeWidth:`3`,fill:`none`,cx:`18`,cy:`18`,r:`15.9155`}),(0,c.jsx)(`circle`,{stroke:s.stroke,strokeWidth:`3`,strokeLinecap:`round`,fill:`none`,strokeDasharray:`${n}, 100`,cx:`18`,cy:`18`,r:`15.9155`,className:`transition-all duration-100 ease-linear`})]}),(0,c.jsxs)(`div`,{className:`absolute inset-0 flex flex-col items-center justify-center`,children:[(0,c.jsx)(`span`,{className:`text-3xl font-bold ${s.text} tabular-nums`,children:n}),(0,c.jsx)(`span`,{className:`text-xs text-gray-400`,children:`of 100`})]})]}),(0,c.jsx)(`p`,{className:`mt-2 text-sm text-gray-500`,children:`Risk Score`}),(0,c.jsx)(`div`,{className:`mt-3`,children:(0,c.jsxs)(`span`,{className:`inline-block px-4 py-2 rounded-full text-sm font-semibold ${o()}`,children:[t.charAt(0).toUpperCase()+t.slice(1),` Risk`]})})]})}function p({recommendation:e,index:t}){let[n,r]=(0,a.useState)(!1);return(0,c.jsx)(`article`,{className:`card hover:border-primary-200 border border-transparent animate-fade-in-up`,style:{animationDelay:`${t*100}ms`,animationFillMode:`both`},children:(0,c.jsxs)(`div`,{className:`flex items-start gap-4`,children:[(0,c.jsx)(`div`,{className:`w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-500 flex-shrink-0`,children:u[e.type]}),(0,c.jsxs)(`div`,{className:`flex-1 min-w-0`,children:[(0,c.jsxs)(`div`,{className:`flex items-start justify-between gap-4`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{className:`text-lg font-semibold text-gray-900`,children:e.title}),(0,c.jsx)(`p`,{className:`text-sm text-gray-600 mt-1`,children:e.description})]}),(0,c.jsxs)(`span`,{className:`px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${l[e.priority]}`,children:[e.priority.charAt(0).toUpperCase()+e.priority.slice(1),` `,`Priority`]})]}),(0,c.jsxs)(`div`,{className:`mt-4 flex flex-wrap gap-6`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`p`,{className:`text-xs text-gray-500`,children:`Coverage Amount`}),(0,c.jsx)(`p`,{className:`text-lg font-semibold text-gray-900`,children:e.coverageAmount})]}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`p`,{className:`text-xs text-gray-500`,children:`Monthly Premium`}),(0,c.jsx)(`p`,{className:`text-lg font-semibold text-primary-500`,children:e.monthlyPremium})]})]}),(0,c.jsxs)(`button`,{type:`button`,onClick:()=>r(!n),className:`mt-3 text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1 transition-colors`,"aria-expanded":n,children:[n?`Hide`:`View`,` key benefits`,(0,c.jsx)(`svg`,{className:`w-4 h-4 transition-transform duration-200 ${n?`rotate-180`:``}`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,c.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,d:`M19 9l-7 7-7-7`})})]}),(0,c.jsx)(`div`,{className:`overflow-hidden transition-all duration-300 ${n?`max-h-40 opacity-100 mt-3`:`max-h-0 opacity-0`}`,children:(0,c.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:e.benefits.map((e,t)=>(0,c.jsx)(`span`,{className:`px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded`,children:e},t))})})]})]})})}function m({assessment:e,onReset:t,className:o=``}){let[l,u]=(0,a.useState)(!1),[m,h]=(0,a.useState)(!1),g=e.recommendations.reduce((e,t)=>{let n=parseFloat(t.monthlyPremium.replace(`$`,``));return e+(isNaN(n)?0:n)},0),_=Math.round(g*12*.15),v=e.recommendations.map(e=>d[e.type]),y=(0,a.useCallback)(()=>{s(e)},[e]),b=[{label:`Age Factor`,value:e.score>50?15:5,maxValue:20,color:`#ef4444`},{label:`Health Profile`,value:e.factors.includes(`Existing health conditions`)?15:5,maxValue:20,color:`#f97316`},{label:`Asset Protection`,value:(e.factors.includes(`Home ownership`)?5:0)+(e.factors.includes(`Vehicle ownership`)?5:0),maxValue:15,color:`#eab308`},{label:`Dependency Risk`,value:e.factors.includes(`Dependents to protect`)?10:3,maxValue:15,color:`#3b82f6`},{label:`Overall Exposure`,value:Math.round(e.score/5),maxValue:20,color:`#8b5cf6`}];return(0,c.jsxs)(`section`,{className:`py-16 sm:py-24 bg-gray-50 ${o}`,"aria-labelledby":`results-heading`,children:[(0,c.jsxs)(`div`,{className:`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`,children:[(0,c.jsxs)(`div`,{className:`text-center mb-12 animate-fade-in-up`,children:[(0,c.jsx)(`h2`,{id:`results-heading`,className:`text-3xl sm:text-4xl font-bold text-gray-900`,children:`Your Coverage Recommendations`}),(0,c.jsx)(`p`,{className:`mt-4 text-lg text-gray-600`,children:`Based on your risk profile, here are our personalized recommendations.`})]}),(0,c.jsxs)(`div`,{className:`grid lg:grid-cols-3 gap-8 mb-12`,children:[(0,c.jsxs)(`div`,{className:`lg:col-span-1 space-y-6`,children:[(0,c.jsxs)(`div`,{className:`card text-center animate-fade-in-up`,style:{animationDelay:`100ms`},children:[(0,c.jsx)(`h3`,{className:`text-lg font-semibold text-gray-900 mb-4`,children:`Your Risk Profile`}),(0,c.jsx)(f,{score:e.score,level:e.level}),e.factors.length>0&&(0,c.jsxs)(`div`,{className:`mt-6 text-left`,children:[(0,c.jsx)(`h4`,{className:`text-sm font-semibold text-gray-700 mb-2`,children:`Key Factors:`}),(0,c.jsx)(`ul`,{className:`space-y-1`,children:e.factors.map((e,t)=>(0,c.jsxs)(`li`,{className:`flex items-center gap-2 text-sm text-gray-600`,children:[(0,c.jsx)(`svg`,{className:`w-4 h-4 text-primary-500 flex-shrink-0`,fill:`currentColor`,viewBox:`0 0 20 20`,children:(0,c.jsx)(`path`,{fillRule:`evenodd`,d:`M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z`,clipRule:`evenodd`})}),e]},t))})]})]}),(0,c.jsxs)(`div`,{className:`card animate-fade-in-up`,style:{animationDelay:`200ms`},children:[(0,c.jsx)(`h3`,{className:`text-lg font-semibold text-gray-900 mb-4`,children:`Risk Breakdown`}),(0,c.jsx)(n,{factors:b})]})]}),(0,c.jsx)(`div`,{className:`lg:col-span-2`,children:(0,c.jsx)(`div`,{className:`space-y-4`,children:e.recommendations.map((e,t)=>(0,c.jsx)(p,{recommendation:e,index:t},e.id))})})]}),(0,c.jsxs)(`div`,{className:`mb-8 animate-fade-in-up`,style:{animationDelay:`300ms`},children:[(0,c.jsxs)(`button`,{type:`button`,onClick:()=>h(!m),className:`flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold transition-colors mx-auto`,"aria-expanded":m,children:[(0,c.jsx)(`svg`,{className:`w-5 h-5 transition-transform duration-200 ${m?`rotate-180`:``}`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,c.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,d:`M19 9l-7 7-7-7`})}),m?`Hide`:`Show`,` Comparison Table`]}),(0,c.jsx)(`div`,{className:`overflow-hidden transition-all duration-300 mt-4 ${m?`max-h-[600px] opacity-100`:`max-h-0 opacity-0`}`,children:(0,c.jsx)(`div`,{className:`card p-0 overflow-hidden`,children:(0,c.jsx)(i,{recommendations:e.recommendations})})})]}),(0,c.jsxs)(`div`,{className:`grid sm:grid-cols-3 gap-4 mb-8 animate-fade-in-up`,style:{animationDelay:`400ms`},children:[(0,c.jsxs)(`div`,{className:`card bg-primary-50 border border-primary-100 text-center`,children:[(0,c.jsx)(`p`,{className:`text-sm text-primary-600 font-medium`,children:`Monthly Total`}),(0,c.jsxs)(`p`,{className:`text-2xl font-bold text-primary-600 mt-1`,children:[`$`,g.toFixed(0)]})]}),(0,c.jsxs)(`div`,{className:`card bg-green-50 border border-green-100 text-center`,children:[(0,c.jsx)(`p`,{className:`text-sm text-green-600 font-medium`,children:`Estimated Annual Savings`}),(0,c.jsxs)(`p`,{className:`text-2xl font-bold text-green-600 mt-1`,children:[`$`,_]})]}),(0,c.jsxs)(`div`,{className:`card bg-blue-50 border border-blue-100 text-center`,children:[(0,c.jsx)(`p`,{className:`text-sm text-blue-600 font-medium`,children:`Coverage Types`}),(0,c.jsx)(`p`,{className:`text-sm font-semibold text-blue-600 mt-1`,children:v.join(` • `)})]})]}),(0,c.jsx)(`div`,{className:`card bg-gradient-to-r from-primary-500 to-primary-600 border-0`,children:(0,c.jsxs)(`div`,{className:`flex flex-col sm:flex-row items-center justify-between gap-4`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{className:`text-lg font-semibold text-white`,children:`Estimated Total Monthly Premium`}),(0,c.jsx)(`p`,{className:`text-primary-100`,children:`Combined cost for all recommended coverages`})]}),(0,c.jsxs)(`div`,{className:`text-right`,children:[(0,c.jsxs)(`p`,{className:`text-3xl font-bold text-white tabular-nums`,children:[`$`,g.toFixed(0)]}),(0,c.jsx)(`p`,{className:`text-sm text-primary-100`,children:`per month`})]})]})}),(0,c.jsxs)(`div`,{className:`mt-8 flex flex-col sm:flex-row gap-4 justify-center`,children:[(0,c.jsx)(`button`,{type:`button`,onClick:t,className:`btn btn-secondary`,children:`Start New Assessment`}),(0,c.jsxs)(`button`,{type:`button`,onClick:y,className:`btn bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all`,children:[(0,c.jsx)(`svg`,{className:`w-5 h-5 mr-2`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,"aria-hidden":`true`,children:(0,c.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,d:`M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z`})}),`Download Report`]}),(0,c.jsx)(`button`,{type:`button`,className:`btn btn-primary`,onClick:()=>u(!0),children:`Get Quotes`})]})]}),(0,c.jsx)(r,{isOpen:l,onClose:()=>u(!1),title:`Connect with Insurance Providers`,children:(0,c.jsxs)(`div`,{className:`space-y-4`,children:[(0,c.jsx)(`p`,{className:`text-gray-600`,children:`In a full implementation, this would connect you with licensed insurance providers who can offer quotes based on your risk profile.`}),(0,c.jsxs)(`div`,{className:`bg-primary-50 border border-primary-100 rounded-lg p-4`,children:[(0,c.jsx)(`h4`,{className:`font-semibold text-primary-700 mb-2`,children:`Your Summary`}),(0,c.jsxs)(`ul`,{className:`text-sm text-primary-600 space-y-1`,children:[(0,c.jsxs)(`li`,{children:[`Risk Score: `,e.score,`/100 (`,e.level,`)`]}),(0,c.jsxs)(`li`,{children:[`Recommended Coverages: `,e.recommendations.length]}),(0,c.jsxs)(`li`,{children:[`Estimated Monthly: $`,g.toFixed(0)]})]})]}),(0,c.jsxs)(`div`,{className:`space-y-3`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`label`,{htmlFor:`quote-email`,className:`label`,children:`Email Address`}),(0,c.jsx)(`input`,{type:`email`,id:`quote-email`,className:`input`,placeholder:`your@email.com`})]}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`label`,{htmlFor:`quote-phone`,className:`label`,children:`Phone Number (Optional)`}),(0,c.jsx)(`input`,{type:`tel`,id:`quote-phone`,className:`input`,placeholder:`(555) 123-4567`})]})]}),(0,c.jsx)(`button`,{type:`button`,className:`btn btn-primary w-full`,onClick:()=>u(!1),children:`Request Quotes`}),(0,c.jsx)(`p`,{className:`text-xs text-gray-400 text-center`,children:`By submitting, you agree to be contacted by licensed insurance providers.`})]})})]})}export{m as CoverageRecommendations};