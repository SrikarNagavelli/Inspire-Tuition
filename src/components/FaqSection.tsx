import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import { RevealOnScroll } from './RevealOnScroll';

export function FaqSection({ questionIds, title = 'Frequently Asked Questions' }: { questionIds?: string[]; title?: string }) {
  const questions = questionIds
    ? businessConfig.faqs.filter((item) => questionIds.includes(item.id))
    : businessConfig.faqs;
  const [openId, setOpenId] = useState<string | null>(questions[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-13 sm:py-18 bg-gradient-to-b from-[#F5F8FC] via-[#F8FAFE] to-[#F5F8FC] border-y border-slate-200/70"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <RevealOnScroll>
          <h2 className="section-heading text-center">{title}</h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <div className="mt-7 divide-y divide-slate-200 bg-white rounded-2xl border border-slate-200/90 card-3d overflow-hidden">
            {questions.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `faq-panel-${item.id}`;
              const buttonId = `faq-btn-${item.id}`;

              return (
                <div key={item.id}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#F5F8FC]/70 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#2563EB]"
                    >
                      <span className="font-display font-semibold text-base text-[#102A43]">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#2563EB]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed"
                    >
                      <p>{item.answer}</p>
                      {item.id === 'faq-5' && (
                        <Link to="/classes#schedule" className="mt-2 inline-block font-semibold text-[#204D92] hover:underline">
                          View batch timings
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
