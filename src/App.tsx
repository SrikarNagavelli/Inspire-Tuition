import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Info, X } from 'lucide-react';
import { useLocation } from 'react-router';
import { BackToTop } from './components/BackToTop';
import { DemoEnquiryModal } from './components/DemoEnquiryModal';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { Navbar } from './components/Navbar';
import { RouteUpdates } from './components/RouteUpdates';
import { SitePages } from './SitePages';
import type { DemoPrefill, EnquiryApiResponse } from './types/enquiry';

const DEMO_SUBMITTED_STORAGE_KEY = 'inspire_demo_submitted';
const AUTO_POPUP_DELAY_MS = 5000;

function hasSubmittedDemo() {
  try {
    return window.localStorage.getItem(DEMO_SUBMITTED_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoPrefill, setDemoPrefill] = useState<DemoPrefill | null>(null);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [setupChannelNotice, setSetupChannelNotice] = useState<string | null>(
    null
  );
  const userOpenedModalRef = useRef(false);

  const { pathname } = useLocation();

  // Listen for Google Maps Platform quota exhaustion events
  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // 5-second auto enquiry popup with localStorage persistence
  useEffect(() => {
    if (hasSubmittedDemo()) return;

    const timerId = window.setTimeout(() => {
      if (!userOpenedModalRef.current && !hasSubmittedDemo()) {
        setDemoPrefill({ sourceLabel: 'Auto 5s Demo Popup' });
        setIsDemoModalOpen(true);
      }
    }, AUTO_POPUP_DELAY_MS);

    return () => window.clearTimeout(timerId);
  }, []);

  const handleOpenDemoModal = useCallback((prefill?: DemoPrefill) => {
    userOpenedModalRef.current = true;
    setSetupChannelNotice(null);
    setDemoPrefill(prefill || { sourceLabel: 'Manual Enquiry' });
    setIsDemoModalOpen(true);
  }, []);

  const handleCloseDemoModal = useCallback(() => {
    setIsDemoModalOpen(false);
  }, []);

  const handleSubmittedSuccess = useCallback((response: EnquiryApiResponse) => {
    if (response.ok && response.savedToSheet) {
      userOpenedModalRef.current = true;
      try {
        window.localStorage.setItem(DEMO_SUBMITTED_STORAGE_KEY, 'true');
      } catch {
        // Ignore storage restrictions in private browsing
      }
    }
  }, []);

  const handleContactSetupNotice = useCallback((channel: string) => {
    setSetupChannelNotice(channel);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
        {quotaExceeded && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        <a href="#main-content" className="sr-only z-[60] rounded-lg bg-white px-4 py-3 font-semibold text-[#102A43] focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
        <Navbar />

        {setupChannelNotice && (
          <div
            role="status"
            className="fixed inset-x-4 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-45 mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl md:inset-x-auto md:right-5 md:bottom-5"
          >
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm text-[#102A43]">
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4 text-[#2563EB] shrink-0" aria-hidden="true" />
                <span>
                  <strong>{setupChannelNotice}</strong> is currently unavailable. You can send an enquiry online.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleOpenDemoModal({
                      sourceLabel: `${setupChannelNotice} Fallback Prompt`,
                    })
                  }
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#102A43] hover:bg-[#1B3E61] rounded-lg cursor-pointer"
                >
                  Send an Enquiry
                </button>
                <button
                  type="button"
                  onClick={() => setSetupChannelNotice(null)}
                  aria-label="Dismiss notice"
                  className="p-1 text-slate-500 hover:text-[#102A43] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        <RouteUpdates />
        <main id="main-content" key={pathname} tabIndex={-1} className="route-enter flex-1 outline-none">
          <SitePages
            onOpenDemo={handleOpenDemoModal}
            onContactSetupNotice={handleContactSetupNotice}
            onSubmittedSuccess={handleSubmittedSuccess}
            quotaExceeded={quotaExceeded}
          />
        </main>

        <Footer />

        <MobileStickyBar onContactSetupNotice={handleContactSetupNotice} />

        <BackToTop />

        <DemoEnquiryModal
          isOpen={isDemoModalOpen}
          prefill={demoPrefill}
          onClose={handleCloseDemoModal}
          onSubmittedSuccess={handleSubmittedSuccess}
        />
      </div>
    </MotionConfig>
  );
}
