import { useEffect, useState } from 'react';
import {
  AlertCircle,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  X,
} from 'lucide-react';
import {
  resolveMaterialUrl,
  type StudyMaterialItem,
} from '../config/studyMaterialsConfig';

interface PdfPreviewModalProps {
  material: StudyMaterialItem | null;
  onClose: () => void;
  onDownload: (material: StudyMaterialItem) => void;
}

export function PdfPreviewModal({
  material,
  onClose,
  onDownload,
}: PdfPreviewModalProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (!material) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [material, onClose]);

  useEffect(() => {
    if (!material) return;

    let active = true;
    let objectUrl: string | null = null;
    setStatus('loading');
    setErrorMsg('');
    setBlobUrl(null);

    const fileUrl = resolveMaterialUrl(material);

    fetch(fileUrl)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Document unavailable (HTTP ${res.status})`);
        }
        const contentType = res.headers.get('content-type') || '';
        const blob = await res.blob();
        if (!blob.size || (contentType && !contentType.includes('pdf') && !contentType.includes('octet-stream'))) {
          throw new Error('The requested study file is not a valid PDF document.');
        }
        objectUrl = URL.createObjectURL(blob);
        if (active) {
          setBlobUrl(objectUrl);
          setStatus('ready');
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setStatus('error');
          setErrorMsg(
            err instanceof Error
              ? err.message
              : 'Unable to load PDF preview right now.'
          );
        }
      });

    return () => {
      active = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [material]);

  if (!material) return null;

  const directUrl = resolveMaterialUrl(material);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-preview-title"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#102A43]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-4xl h-[88vh] sm:h-[86vh] bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-4 bg-[#F5F8FC] border-b border-slate-200 flex items-start sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#2563EB] font-medium">
              <span>{material.classLabel}</span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span>{material.subject}</span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span>{material.materialType}</span>
            </div>
            <h3
              id="pdf-preview-title"
              className="mt-1 font-display font-bold text-base sm:text-lg text-[#102A43] truncate"
            >
              {material.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onDownload(material)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white btn-3d-primary rounded-lg cursor-pointer"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close PDF preview"
              className="w-10 h-10 rounded-xl text-slate-500 hover:text-[#102A43] hover:bg-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer Body */}
        <div className="relative flex-1 bg-slate-100 flex flex-col">
          {status === 'loading' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin mb-3" />
              <p className="font-display font-semibold text-sm text-[#102A43]">
                Loading PDF Preview...
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Preparing {material.title} ({material.fileSize})
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
              <p className="font-display font-semibold text-base text-[#102A43]">
                Could Not Display PDF Preview
              </p>
              <p className="mt-1.5 text-sm text-slate-600 max-w-md">
                {errorMsg}
              </p>
            </div>
          )}

          {status === 'ready' && blobUrl && (
            <iframe
              title={material.title}
              src={blobUrl}
              className="w-full flex-1 border-0 bg-white"
            />
          )}
        </div>

        {/* Mobile-Friendly Bottom Action Bar */}
        <div className="px-4 sm:px-6 py-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="inline-flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#2563EB] shrink-0" aria-hidden="true" />
            <span>
              {material.isSampleResource
                ? 'Prototype Sample Resource'
                : 'Verified Resource'}{' '}
              · <span className="font-mono-nums">{material.fileSize}</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#102A43] bg-[#F5F8FC] hover:bg-slate-100 border border-slate-300 rounded-lg"
            >
              Open PDF Tab
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => onDownload(material)}
              className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white btn-3d-primary rounded-lg cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
