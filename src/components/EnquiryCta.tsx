import { ExternalLink, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { businessConfig } from '../config/businessConfig';
import { getTelUrl, getWhatsAppUrl } from '../utils/validation';
import { CallAction } from './CallAction';
import { WhatsAppIcon } from './WhatsAppIcon';

interface EnquiryCtaProps {
  onContactSetupNotice?: (channel: string) => void;
  showContactDetails?: boolean;
}

const whatsappClass = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/45 bg-[#102A43]/65 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#20476b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-5';

export function WhatsAppAction({ onContactSetupNotice }: Pick<EnquiryCtaProps, 'onContactSetupNotice'>) {
  const url = getWhatsAppUrl();
  const content = <><WhatsAppIcon />WhatsApp Us</>;

  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className={whatsappClass}>{content}</a>
  ) : (
    <button type="button" onClick={() => onContactSetupNotice?.('WhatsApp')} className={`${whatsappClass} cursor-pointer`}>{content}</button>
  );
}

export function EnquiryCta({ onContactSetupNotice, showContactDetails = false }: EnquiryCtaProps) {
  const { brand, contact, location } = businessConfig;
  const phoneUrl = getTelUrl();

  const actions = (
    <div className="flex flex-wrap gap-3">
      <CallAction className="btn-3d-gold inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-[#102A43] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-5" />
      {onContactSetupNotice && <WhatsAppAction onContactSetupNotice={onContactSetupNotice} />}
    </div>
  );

  return (
    <section className="detail-banner" id={showContactDetails ? 'contact-details' : undefined}>
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-9 sm:px-8 sm:py-11 lg:flex-row lg:items-center">
        <div>
          <h2 className="section-heading text-white">Let’s Help Your Child Succeed.</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-slate-200">
            Take the first step toward confident learning. Call us to ask about classes or a free demo.
          </p>
          {showContactDetails && <div className="mt-5">{actions}</div>}
        </div>
        {showContactDetails ? (
          <div className="w-full rounded-2xl border border-white/20 bg-white/10 p-5 text-white sm:p-6 lg:max-w-md">
            <h3 className="text-lg font-bold">Contact Details</h3>
            <address className="mt-4 space-y-3 text-sm leading-relaxed not-italic text-slate-200">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-[#FFDA86]" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-white">{brand.name}</p>
                  <p className="mt-0.5">{location.fullAddress}</p>
                </div>
              </div>
              {phoneUrl && (
                <a href={phoneUrl} className="inline-flex min-h-11 items-center gap-3 font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  <Phone className="size-5 shrink-0 text-[#FFDA86]" aria-hidden="true" />
                  {contact.phoneDisplay || contact.phoneE164}
                </a>
              )}
            </address>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 border-t border-white/20 pt-2 text-sm font-semibold">
              <a href={location.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-[#FFDA86] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Open in Google Maps
                <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
              </a>
              <Link to="/contact" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Contact page
              </Link>
            </div>
          </div>
        ) : actions}
      </div>
    </section>
  );
}
