import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarCheck, X } from 'lucide-react';
import type { DemoPrefill, EnquiryApiResponse } from '../types/enquiry';
const DemoEnquiryForm = lazy(() => import('./DemoEnquiryForm').then(({ DemoEnquiryForm }) => ({ default: DemoEnquiryForm })));

interface DemoEnquiryModalProps {
  isOpen: boolean;
  prefill: DemoPrefill | null;
  onClose: () => void;
  onSubmittedSuccess: (response: EnquiryApiResponse) => void;
}

export function DemoEnquiryModal({
  isOpen,
  prefill,
  onClose,
  onSubmittedSuccess,
}: DemoEnquiryModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#102A43]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto"
          >
            <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 bg-[#F5F8FC]">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB]">
                  <CalendarCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Inspire Educational Institutions · East Marredpally</span>
                </div>
                <h2
                  id="demo-modal-heading"
                  className="mt-1.5 font-display font-bold text-xl sm:text-2xl text-[#102A43]"
                >
                  Send a Tuition Enquiry
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Give your child the right guidance. Enquire today to schedule a demo class.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close demo enquiry popup"
                className="w-10 h-10 -mr-2 -mt-1 rounded-xl text-slate-500 hover:text-[#102A43] hover:bg-white transition-colors flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <Suspense fallback={<p role="status" className="text-sm text-slate-600">Loading enquiry form…</p>}>
                <DemoEnquiryForm
                  idPrefix="modal"
                  sourceLabel={prefill?.sourceLabel || 'Demo Popup Modal'}
                  prefill={prefill}
                  autoFocusName={true}
                  onSuccess={onSubmittedSuccess}
                />
              </Suspense>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
