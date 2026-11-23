import { getWhatsAppUrl } from '../utils/validation';
import { CallAction } from './CallAction';
import { WhatsAppIcon } from './WhatsAppIcon';

interface MobileStickyBarProps {
  onContactSetupNotice: (channel: string) => void;
}

export function MobileStickyBar({
  onContactSetupNotice,
}: MobileStickyBarProps) {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <div
      aria-label="Quick Mobile Contact Actions"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_16px_rgba(16,42,67,0.08)] px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        <CallAction className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-[#F5F8FC] px-4 py-2.5 text-sm font-semibold text-[#102A43] transition-transform active:scale-[0.99]" />

        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm active:scale-[0.99] transition-transform"
          >
            <WhatsAppIcon className="brightness-0 invert" />
            WhatsApp
          </a>
        ) : (
          <button
            type="button"
            onClick={() => onContactSetupNotice('WhatsApp')}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm cursor-pointer"
          >
            <WhatsAppIcon className="brightness-0 invert" />
            WhatsApp
          </button>
        )}
      </div>
    </div>
  );
}
