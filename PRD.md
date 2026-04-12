# RiskBrief — Product Requirements Document

## 1. Overview

**Product Name**: RiskBrief  
**Tagline**: From Chaos to Coverage  
**Version**: 1.0 (MVP)  
**Status**: Active Development  

RiskBrief is a web-based insurance risk assessment tool that helps users understand their insurance coverage needs through a guided questionnaire, then provides personalized coverage recommendations with cost estimates.

## 2. Problem Statement

Consumers face overwhelming complexity when choosing insurance coverage. They lack clear understanding of their risk profile, don't know which coverage types they need, and struggle to compare options across providers. This leads to either being over-insured (wasting money) or under-insured (exposing themselves to financial risk).

## 3. Target Users

- **Primary**: Adults aged 25–55 evaluating their insurance needs
- **Secondary**: Families with dependents seeking comprehensive coverage
- **Tertiary**: Homeowners and vehicle owners needing asset protection

## 4. Core Features

### 4.1 Landing Page
- Hero section with clear value proposition and primary CTA
- Statistical trust indicators (users helped, coverage options, etc.)
- Feature highlights
- How-it-works step-by-step guide
- Customer testimonials
- FAQ section
- Responsive design (mobile-first)

### 4.2 Risk Assessment Form
- Multi-step questionnaire collecting:
  - Age and location
  - Employment status and income range
  - Health profile (conditions, smoking status)
  - Dependents and family status
  - Asset ownership (home, vehicle)
  - Current coverage status
- Client-side risk scoring algorithm (0–100 scale)
- Risk level classification: Low / Moderate / High
- localStorage persistence for assessment history (up to 3 previous)

### 4.3 Coverage Recommendations
- Personalized recommendation cards per coverage type (life, health, auto, home, disability)
- Coverage amount and monthly premium estimates
- Priority badges (High / Medium / Low)
- Expandable benefit details
- Risk score gauge with animated visualization
- Risk factor breakdown chart
- Coverage comparison table

### 4.4 Quote Request Flow
- Modal form collecting email (required) and phone (optional)
- Form validation (HTML5 native)
- Quote request persisted to localStorage (`riskbrief-quote-requests`)
- Success confirmation with next-steps messaging

### 4.5 Report Generation
- HTML report generation with print-friendly styling
- Includes risk score, recommendations, factors, and savings estimate
- Downloaded as self-contained HTML file

### 4.6 Footer
- Product links (Features, How It Works, Risk Assessment, Pricing)
- Company section (About Us, Careers, Blog, Contact)
- Legal section (Privacy Policy, Terms of Service, Cookie Policy, Disclaimer)
- Social media links (Twitter/X, LinkedIn, Facebook)

## 5. Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Primary Color | `#0EA5E9` (Sky Blue) | Buttons, links, accents |
| Primary Dark | `#0284C7` | Hover states |
| Primary Light | `#7DD3FC` | Light backgrounds |
| Font Family | System UI stack | Body text |
| Monospace Font | JetBrains Mono, Fira Code, Cascadia Code | Technical/data elements |
| Tone | Professional, trustworthy | Copy and visual style |

## 6. Technical Architecture

### 6.1 Stack
- **Framework**: React 18 with TypeScript (strict mode)
- **Build**: Vite 5
- **Styling**: Tailwind CSS 3 with CSS custom properties
- **Testing**: Vitest + React Testing Library (SSR-style testing)
- **Deployment**: Static single-page application (SPA)

### 6.2 Key Patterns
- Lazy loading with `React.lazy` + `Suspense` for code splitting
- Error boundaries for graceful failure handling
- CSS custom properties for theme tokens
- localStorage for client-side persistence
- Component-based architecture

### 6.3 File Structure
```
src/
  components/
    Header.tsx
    Hero.tsx
    Features.tsx
    HowItWorks.tsx
    StatsAndCTA.tsx
    Testimonials.tsx
    FAQ.tsx
    RiskAssessmentForm.tsx
    CoverageRecommendations.tsx
    RiskBreakdownChart.tsx
    CoverageComparisonTable.tsx
    Modal.tsx
    Footer.tsx
    index.ts (barrel export)
  types/
    index.ts
  utils/
    reportGenerator.ts
  index.css
  App.tsx
  main.tsx
```

## 7. Non-Functional Requirements

- **Performance**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Accessibility**: WCAG 2.1 AA compliance (skip links, ARIA labels, semantic HTML, keyboard navigation)
- **Responsive**: Mobile, tablet, and desktop breakpoints
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 8. Out of Scope (MVP)

- Real-time API integration with insurance providers
- User authentication/accounts
- Payment processing
- Actual quote comparison from multiple insurers
- Admin dashboard
- Email notifications
- Analytics tracking

## 9. Success Metrics (Post-Launch)

- Assessment completion rate
- Quote request conversion rate
- Time on page for recommendations view
- Report download rate
