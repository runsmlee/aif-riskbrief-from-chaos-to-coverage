import { useState, useCallback } from 'react';
import type { ReactElement } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What are the most common insurance coverage gaps?',
    answer: 'The most frequent gaps we see are underinsured life coverage (employer plans typically cover only 1x salary when you need 5–10x), missing disability insurance, and duplicate rental car coverage across auto and credit card policies. Run our free 5-minute check to find which ones affect you.',
  },
  {
    id: 'faq-2',
    question: 'How do I check if I have duplicate insurance coverage?',
    answer: 'Start by listing every policy you pay for — auto, home, health, life, and any add-ons from credit cards or employer benefits. Look for overlapping benefits like roadside assistance (auto + credit card) or rental car damage (auto + card + standalone policy). Our tool cross-checks all your policies automatically in 12 questions.',
  },
  {
    id: 'faq-3',
    question: 'What insurance gaps are typical at age 30, 40, and 50?',
    answer: 'At 30, the biggest gap is usually no disability insurance despite depending on your income. At 40, it\'s life insurance that hasn\'t kept up with a growing family and mortgage. At 50, long-term care and umbrella liability coverage are commonly missing. Our assessment adjusts recommendations to your exact life stage.',
  },
  {
    id: 'faq-4',
    question: 'Is my homeowner\'s policy enough, or do I have coverage gaps?',
    answer: 'Most standard homeowner\'s policies exclude flood damage, sewer backup, earthquake, and high-value items like jewelry over $1,500. If you live in a flood zone — and 1 in 4 flood claims come from low-risk areas — you likely need a separate flood policy. Our tool flags exactly which perils your home policy misses.',
  },
  {
    id: 'faq-5',
    question: 'How much life insurance do I actually need?',
    answer: 'A common rule of thumb is 5–10x your annual income, but the real number depends on your mortgage balance, number of dependents, and existing coverage. Many people with employer-provided life insurance (typically 1x salary) are drastically underinsured. Our assessment calculates your exact gap based on your real numbers.',
  },
  {
    id: 'faq-6',
    question: 'Does employer-provided insurance leave me with gaps?',
    answer: 'Yes — employer coverage usually stops the day you leave your job, and it\'s often limited to 1x salary for life and 60% of income for disability. If you have a mortgage, dependents, or health conditions, that\'s rarely enough. Our free check shows exactly where your employer coverage falls short.',
  },
];

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}): ReactElement {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <h3 id={item.id}>
        <button
          type="button"
          className="w-full flex items-center justify-between py-5 px-4 -mx-4 rounded-lg text-left font-semibold text-gray-900 hover:text-primary-500 hover:bg-primary-50/50 transition-all duration-200 focus:outline-none focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          aria-expanded={isOpen}
          aria-controls={`${item.id}-panel`}
          onClick={onToggle}
        >
          <span className="pr-4">{item.question}</span>
          <svg
            className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h3>
      <div
        id={`${item.id}-panel`}
        role="region"
        aria-labelledby={item.id}
        aria-hidden={!isOpen}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="px-4 text-gray-600 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

interface FAQProps {
  className?: string;
}

export function FAQ({ className = '' }: FAQProps): ReactElement {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      id="faq"
      className={`py-16 sm:py-24 bg-gray-50 ${className}`}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900"
          >
            Insurance Coverage Gap FAQ
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Common questions about finding and fixing insurance coverage gaps.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm divide-y-0">
          {faqItems.map((item) => (
            <FAQAccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
