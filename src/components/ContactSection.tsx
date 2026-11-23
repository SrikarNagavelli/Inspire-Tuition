import { Clock, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { businessConfig } from '../config/businessConfig';
import type { EnquiryApiResponse } from '../types/enquiry';
import { getWhatsAppUrl } from '../utils/validation';
import { CenterGoogleMap } from './CenterGoogleMap';
import { DemoEnquiryForm } from './DemoEnquiryForm';
import { RevealOnScroll } from './RevealOnScroll';
import { CallAction } from './CallAction';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ContactSectionProps {
  quotaExceeded: boolean;
  onSubmittedSuccess: (response: EnquiryApiResponse) => void;
  onContactSetupNotice: (channel: string) => void;
}

export function ContactSection({
  quotaExceeded,
  onSubmittedSuccess,
  onContactSetupNotice,
}: ContactSectionProps) {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section id="contact" className="py-13 sm:py-18 bg-[#F5F8FC] border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <RevealOnScroll delay={0.05}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Address, Contact Actions & Google Maps */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-[#F5F8FC] to-white card-3d p-6 space-y-5">
                <div>
                  <h2 className="font-display font-bold text-lg text-[#102A43]">
                    {businessConfig.brand.name}
                  </h2>
                  <p className="mt-2 flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                    <MapPin
                      className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{businessConfig.location.fullAddress}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-[#102A43] inline-flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                      Phone
                    </p>
                    <p className="mt-1 text-slate-600">
                      {businessConfig.contact.phoneDisplay ||
                        'Available by online enquiry'}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#102A43] inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                      Business Timings
                    </p>
                    <p className="mt-1 text-slate-600">
                      {businessConfig.contact.businessHours}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    to="#contact-map"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#102A43] bg-white hover:bg-slate-50 border border-slate-300 btn-3d-secondary rounded-xl"
                  >
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    View map
                  </Link>

                  <CallAction className="btn-3d-primary inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]" />

                  {whatsappUrl ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-[0_4px_12px_rgba(5,150,105,0.3)] transition-all"
                    >
                      <WhatsAppIcon className="brightness-0 invert" />
                      WhatsApp
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onContactSetupNotice('WhatsApp')}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 btn-3d-secondary rounded-xl cursor-pointer"
                    >
                      <WhatsAppIcon />
                      WhatsApp
                    </button>
                  )}
                </div>
              </div>

              <div id="contact-map" tabIndex={-1} className="rounded-2xl card-3d overflow-hidden">
                <CenterGoogleMap quotaExceeded={quotaExceeded} />
              </div>
            </div>

            {/* Right Column: Inline Free Demo Enquiry Form */}
            <div id="contact-enquiry" className="lg:col-span-6 rounded-2xl border border-slate-200/90 bg-white card-3d p-6 sm:p-8">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#102A43]">
                Send an Enquiry
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 mb-6">
                Share your child&apos;s class and preferred timing below to request a free demo session.
              </p>

              <DemoEnquiryForm
                idPrefix="contact"
                sourceLabel="Contact Section Form"
                onSuccess={onSubmittedSuccess}
              />
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
