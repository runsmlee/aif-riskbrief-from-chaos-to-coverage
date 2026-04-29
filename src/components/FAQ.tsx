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
    question: 'How does RiskBrief generate my risk assessment?',
    answer: 'RiskBrief uses a proprietary algorithm that considers your age, lifestyle, health conditions, assets, and financial profile. We analyze these factors against industry risk models to produce a personalized risk score and coverage recommendations.',
  },
  {
    id: 'faq-2',
    question: 'Is my personal information secure?',
    answer: 'Absolutely. We use bank-level encryption to protect your data. Your information is never sold to third parties, and we only collect what is necessary to generate your assessment. You can delete your data at any time.',
  },
  {
    id: 'faq-3',
    question: 'How long does the assessment take?',
    answer: 'The full assessment typically takes 3-5 minutes. We designed it to be quick while still gathering enough information to provide meaningful, personalized recommendations.',
  },
  {
    id: 'faq-4',
    question: 'Are the coverage recommendations binding?',
    answer: 'No. RiskBrief provides educational recommendations to help you understand your coverage needs. To purchase insurance, you will need to connect with a licensed insurance provider. We can help facilitate that connection if you choose.',
  },
  {
    id: 'faq-5',
    question: 'Is RiskBrief free to use?',
    answer: 'Yes, the basic risk assessment and coverage recommendations are completely free. There are no hidden fees or obligations. We believe everyone deserves access to clear insurance guidance.',
  },
  {
    id: 'faq-6',
    question: 'How often should I retake the assessment?',
    answer: 'We recommend retaking the assessment whenever you experience a major life change such as getting married, buying a home, having children, or changing jobs. At minimum, we suggest an annual review to ensure your coverage stays aligned with your needs.',
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
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Got questions? We&apos;ve got answers.
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
