# RiskBrief — Test Specification

## Overview

All tests use **Vitest** with **React SSR-style testing** (`renderToString` + `createElement` from `react-dom/server`). Tests verify rendered HTML output contains expected content, attributes, and structure.

Run all tests: `npm test`  
Watch mode: `npm run test -- --watch`

## Test Files

### Component Tests (16 files, ~139 tests)

| File | Component | Tests | Key Assertions |
|------|-----------|--------|----------------|
| `src/App.test.tsx` | App | ~15 | Skip link, Header, Hero, ErrorBoundary, Assessment toggle, Footer |
| `src/components/Header.test.tsx` | Header | ~8 | Brand name, nav links, mobile menu, primary-500 class |
| `src/components/Hero.test.tsx` | Hero | ~10 | Headline, CTA button, stats, gradient text |
| `src/components/Features.test.tsx` | Features | ~6 | Section heading, feature cards, icon presence |
| `src/components/HowItWorks.test.tsx` | HowItWorks | ~5 | Step titles, step numbers, descriptions |
| `src/components/StatsAndCTA.test.tsx` | StatsAndCTA | ~7 | Stat items, CTA button, section structure |
| `src/components/Testimonials.test.tsx` | Testimonials | ~6 | Testimonial cards, quotes, author names |
| `src/components/FAQ.test.tsx` | FAQ | ~6 | Question/answer pairs, accordion toggle |
| `src/components/Footer.test.tsx` | Footer | ~12 | Brand, copyright, nav sections with dedicated anchors, social links, legal links |
| `src/components/Modal.test.tsx` | Modal | ~7 | isOpen render, backdrop, close button, children |
| `src/components/RiskAssessmentForm.test.tsx` | RiskAssessmentForm | ~16 | Step progression, form fields (incl. smoking status, coverage status), validation, completion, history limit (3) |
| `src/components/CoverageRecommendations.test.tsx` | CoverageRecommendations | ~17 | Risk score, level badge, recommendations, totals, actions |
| `src/components/RiskBreakdownChart.test.tsx` | RiskBreakdownChart | ~5 | Factor labels, values, meter ARIA, bar colors |
| `src/components/CoverageComparisonTable.test.tsx` | CoverageComparisonTable | ~5 | Table headers, recommendation data, total row |

### Utility Tests (1 file)

| File | Utility | Tests | Key Assertions |
|------|---------|--------|----------------|
| `src/utils/reportGenerator.test.ts` | reportGenerator | ~5 | HTML structure, recommendations, risk score, download trigger |

## Testing Patterns

### SSR-Style Rendering
All component tests use `renderToString` + `createElement` instead of `@testing-library/react`'s `render`. This means:
- Tests verify HTML string output, not DOM behavior
- React SSR inserts comment nodes between JSX expression boundaries (e.g., `{isExpanded ? 'Hide' : 'View'} key benefits` renders as `View<!-- --> key benefits`)
- Use `.toContain()` for substring matching rather than exact match

```tsx
const html = renderToString(createElement(MyComponent, { prop: 'value' }));
expect(html).toContain('value');
```

### Color Assertions
- Brand colors use Tailwind classes (`text-primary-500`, `bg-primary-50`) or hex values (`#0ea5e9`)
- Semantic colors use their own palette (red for errors/danger, green for success, yellow for warnings)
- The risk score gauge uses `#0ea5e9` (brand), `#eab308` (yellow), `#22c55e` (green)
- Risk level badge uses semantic colors (`bg-red-100 text-red-700` for high risk)

### Accessibility Checks
Tests verify semantic HTML:
- `role="meter"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- `aria-labelledby` on sections
- `aria-expanded` on toggle buttons
- Skip link present in App

## Test Coverage by Feature

### Risk Assessment Flow
- [x] Form step rendering (profile, lifestyle, assets)
- [x] Smoking status field (never / former / current) in lifestyle step
- [x] Current coverage status field (none / partial / comprehensive) in assets step
- [x] Input validation (HTML5)
- [x] Risk score calculation (includes smoking status and coverage status)
- [x] Assessment completion callback
- [x] localStorage persistence of history (max 3 entries per PRD §4.2)

### Coverage Recommendations
- [x] Risk score gauge display
- [x] Risk level badge
- [x] Recommendation card rendering (title, description, priority, amount, premium)
- [x] Benefit expansion toggle
- [x] Summary cards (monthly total, annual savings, coverage types)
- [x] Total premium banner
- [x] Action buttons (Start New Assessment, Download Report, Get Quotes)
- [x] Quote modal with form fields
- [x] Comparison table toggle
- [x] Previous assessment history

### Quote Request Flow
- [x] Email field (required)
- [x] Phone field (optional)
- [x] Form submission persists to localStorage
- [x] Success confirmation state

### Report Generation
- [x] HTML output contains all recommendations
- [x] Risk score and level rendered
- [x] Brand styling applied
- [x] Print button included

### Footer
- [x] All navigation links have dedicated anchor destinations (no placeholder `#features` on Company/Legal)
- [x] Company links: About Us → `#features`, Careers → `#how-it-works`, Blog → `#testimonials`, Contact → `#faq`
- [x] Legal links: Privacy → `#privacy`, Terms → `#terms`, Cookies → `#cookies`, Disclaimer → `#disclaimer`
- [x] Social media links have external URLs with `target="_blank"` and `rel="noopener noreferrer"`
- [x] Copyright year is dynamic

## Running Tests

```bash
# Run all tests once
npm test

# Run in watch mode
npm run test -- --watch

# Run with coverage
npm run test -- --coverage

# Run specific test file
npm run test -- src/components/CoverageRecommendations.test.tsx
```

## Test Data Conventions

- Mock assessments use realistic values (score: 0–100, levels: low/moderate/high)
- Coverage amounts use formatted strings (`'$500K'`, `'$100K/$300K'`)
- Premiums use formatted strings (`'$65'`, `'$250'`)
- Priority values: `'high'`, `'medium'`, `'low'`
- Coverage types: `'life'`, `'health'`, `'auto'`, `'home'`, `'disability'`
