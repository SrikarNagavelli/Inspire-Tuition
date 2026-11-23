import { CalendarClock, MessageCircle } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import { getWhatsAppUrl } from '../utils/validation';
import type { DemoPrefill } from '../types/enquiry';
import { RevealOnScroll } from './RevealOnScroll';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ScheduleSectionProps {
  onAskAboutFees: (prefill: DemoPrefill) => void;
}

export function ScheduleSection({ onAskAboutFees }: ScheduleSectionProps) {
  const feeWhatsAppUrl = getWhatsAppUrl(
    'Hello Inspire Educational Institutions, I would like to know the batch timings and tuition fee details for my child.'
  );

  return (
    <section id="schedule" className="py-13 sm:py-18 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <RevealOnScroll>
          <div className="max-w-2xl">
            <h2 className="section-heading">Batch Timings &amp; Fees</h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Ask about available batches for your child’s class and school hours.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="min-w-0 lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 card-3d overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <CalendarClock className="w-5 h-5 text-[#2563EB]" aria-hidden="true" />
                  <h3 className="font-display font-semibold text-base text-[#102A43]">
                    Example Batch Schedule
                  </h3>
                </div>
                <span className="text-xs text-slate-500">
                  Subject to seat confirmation
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-[#F5F8FC]/60 text-xs font-semibold text-slate-600">
                      <th scope="col" className="py-3.5 px-5">Class Group</th>
                      <th scope="col" className="py-3.5 px-4">Batch</th>
                      <th scope="col" className="py-3.5 px-4">Timing</th>
                      <th scope="col" className="py-3.5 px-4">Days</th>
                      <th scope="col" className="py-3.5 px-5">Availability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {businessConfig.scheduleExamples.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-[#F5F8FC]/60 transition-colors"
                      >
                        <td className="py-4 px-5 font-medium text-[#102A43]">
                          {row.classGroup}
                        </td>
                        <td className="py-4 px-4 text-slate-600">{row.batchName}</td>
                        <td className="py-4 px-4 font-mono-nums text-slate-800 whitespace-nowrap">
                          {row.timing}
                        </td>
                        <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                          {row.days}
                        </td>
                        <td className="py-4 px-5 text-slate-600 whitespace-nowrap">
                          {row.availability}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-4 bg-gradient-to-br from-[#163A5C] via-[#102A43] to-[#0B1E30] text-white rounded-2xl p-6 sm:p-8 shadow-[0_18px_40px_-10px_rgba(16,42,67,0.38),inset_0_1px_0_rgba(255,255,255,0.12)] flex flex-col justify-between">
              <div>
                <h3 className="mt-2 font-display font-bold text-2xl text-white tracking-tight">
                  Contact Us for Fee Details
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Fees vary by class, subject, and session type.
                </p>
              </div>

              <div className="mt-7 space-y-3">
                {feeWhatsAppUrl ? (
                  <a
                    href={feeWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#102A43] btn-3d-gold rounded-xl"
                  >
                    <WhatsAppIcon className="brightness-0" />
                    Ask About Fees
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onAskAboutFees({
                        sourceLabel: 'Schedule & Fees: Ask About Fees',
                      })
                    }
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#102A43] btn-3d-gold rounded-xl cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    Ask About Fees
                  </button>
                )}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
