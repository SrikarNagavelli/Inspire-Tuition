import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertCircle, CheckCircle2, Info, Loader2 } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import type {
  DemoPrefill,
  EnquiryApiResponse,
  EnquiryFormValues,
} from '../types/enquiry';
import { normalizeIndianMobile, validateIndianMobile } from '../utils/validation';

interface DemoEnquiryFormProps {
  idPrefix: string;
  sourceLabel: string;
  prefill?: DemoPrefill | null;
  autoFocusName?: boolean;
  onSuccess?: (response: EnquiryApiResponse) => void;
}

export function DemoEnquiryForm({
  idPrefix,
  sourceLabel,
  prefill,
  autoFocusName = false,
  onSuccess,
}: DemoEnquiryFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedResult, setSubmittedResult] =
    useState<EnquiryApiResponse | null>(null);
  const lastSubmittedHashRef = useRef<string | null>(null);
  const submittingLockRef = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    defaultValues: {
      parentName: '',
      phoneNumber: '',
      studentClass:
        prefill?.studentClass || businessConfig.formOptions.studentClasses[1],
      subject: prefill?.subject || businessConfig.formOptions.subjects[0],
      preferredTime:
        prefill?.preferredTime || businessConfig.formOptions.preferredTimes[0],
    },
  });

  useEffect(() => {
    if (prefill?.studentClass) {
      setValue('studentClass', prefill.studentClass);
    }
    if (prefill?.subject) {
      setValue('subject', prefill.subject);
    }
    if (prefill?.preferredTime) {
      setValue('preferredTime', prefill.preferredTime);
    }
  }, [prefill, setValue]);

  const nameRegistration = register('parentName', {
    required: 'Please enter the parent or guardian name.',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters.',
    },
  });

  const onSubmit = async (values: EnquiryFormValues) => {
    if (submittingLockRef.current) return;

    const normalizedPhone = normalizeIndianMobile(values.phoneNumber);
    const submissionSignature = `${values.parentName.trim().toLowerCase()}|${normalizedPhone}|${values.studentClass}|${values.subject}`;

    if (lastSubmittedHashRef.current === submissionSignature && submittedResult) {
      return;
    }

    submittingLockRef.current = true;
    setServerError(null);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: values.parentName.trim(),
          phoneNumber: normalizedPhone,
          studentClass: values.studentClass,
          subject: values.subject,
          preferredTime: values.preferredTime,
          sourcePage: prefill?.sourceLabel || sourceLabel,
        }),
      });

      const data = (await response.json()) as EnquiryApiResponse;

      if (!response.ok || !data.ok) {
        setServerError(
          data.message ||
            'Could not submit your enquiry right now. Please try again.'
        );
        return;
      }

      lastSubmittedHashRef.current = submissionSignature;
      setSubmittedResult(data);
      onSuccess?.(data);
    } catch {
      setServerError(
        'Network error while submitting your enquiry. Please check your internet connection and try again.'
      );
    } finally {
      submittingLockRef.current = false;
    }
  };

  if (submittedResult) {
    const isDemo = submittedResult.mode === 'demo' || !submittedResult.savedToSheet;

    return (
      <div className="rounded-xl border border-slate-200 bg-[#F5F8FC] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          {isDemo ? (
            <Info
              className="w-6 h-6 text-[#2563EB] shrink-0 mt-0.5"
              aria-hidden="true"
            />
          ) : (
            <CheckCircle2
              className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5"
              aria-hidden="true"
            />
          )}
          <div>
            <h4 className="font-display font-semibold text-base text-[#102A43]">
              {isDemo
                ? 'Demo Mode: Enquiry Preview Validated'
                : 'Free Demo Class Request Received'}
            </h4>
            <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
              {isDemo
                ? 'Your enquiry details passed validation, but Google Sheets storage and automated email notifications are not configured in this environment yet. No lead was saved to an external sheet.'
                : 'Thank you. Your enquiry has been saved and our educator will contact you shortly to confirm the demo class timing.'}
            </p>

            {submittedResult.lead && (
              <dl className="mt-4 pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-600">
                <div>
                  <dt className="text-slate-500">Parent Name</dt>
                  <dd className="font-medium text-[#102A43]">
                    {submittedResult.lead.parentName}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Mobile</dt>
                  <dd className="font-mono-nums font-medium text-[#102A43]">
                    {submittedResult.lead.phoneNumber}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Class &amp; Subject</dt>
                  <dd className="font-medium text-[#102A43]">
                    {submittedResult.lead.studentClass} ·{' '}
                    {submittedResult.lead.subject}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Preferred Slot</dt>
                  <dd className="font-medium text-[#102A43]">
                    {submittedResult.lead.preferredTime}
                  </dd>
                </div>
              </dl>
            )}

            <button
              type="button"
              onClick={() => {
                setSubmittedResult(null);
                reset();
              }}
              className="mt-4 text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
            >
              Submit another enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {serverError && (
        <div
          role="alert"
          className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-2.5 text-sm text-red-800"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      <div>
        <label
          htmlFor={`${idPrefix}-parent-name`}
          className="block text-sm font-medium text-[#102A43] mb-1.5"
        >
          Parent Name <span className="text-red-600">*</span>
        </label>
        <input
          id={`${idPrefix}-parent-name`}
          type="text"
          autoFocus={autoFocusName}
          autoComplete="name"
          placeholder="Enter parent or guardian name"
          aria-invalid={Boolean(errors.parentName)}
          className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#1E293B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 focus:border-[#2563EB] ${
            errors.parentName ? 'border-red-400' : 'border-slate-300'
          }`}
          {...nameRegistration}
        />
        {errors.parentName && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {errors.parentName.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-phone`}
          className="block text-sm font-medium text-[#102A43] mb-1.5"
        >
          Phone Number (India) <span className="text-red-600">*</span>
        </label>
        <input
          id={`${idPrefix}-phone`}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="10-digit mobile number (e.g. 9876543210)"
          aria-invalid={Boolean(errors.phoneNumber)}
          className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#1E293B] font-mono-nums placeholder:font-sans placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 focus:border-[#2563EB] ${
            errors.phoneNumber ? 'border-red-400' : 'border-slate-300'
          }`}
          {...register('phoneNumber', {
            required: 'Please enter your 10-digit mobile number.',
            validate: validateIndianMobile,
          })}
        />
        {errors.phoneNumber && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`${idPrefix}-class`}
            className="block text-sm font-medium text-[#102A43] mb-1.5"
          >
            Student Class
          </label>
          <select
            id={`${idPrefix}-class`}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 focus:border-[#2563EB]"
            {...register('studentClass')}
          >
            {businessConfig.formOptions.studentClasses.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-subject`}
            className="block text-sm font-medium text-[#102A43] mb-1.5"
          >
            Subject
          </label>
          <select
            id={`${idPrefix}-subject`}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 focus:border-[#2563EB]"
            {...register('subject')}
          >
            {businessConfig.formOptions.subjects.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-time`}
          className="block text-sm font-medium text-[#102A43] mb-1.5"
        >
          Preferred Time
        </label>
        <select
          id={`${idPrefix}-time`}
          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 focus:border-[#2563EB]"
          {...register('preferredTime')}
        >
          {businessConfig.formOptions.preferredTimes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-white btn-3d-primary disabled:opacity-60 disabled:cursor-not-allowed rounded-xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
      >
        {isSubmitting && (
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        )}
        {isSubmitting ? 'Submitting Enquiry...' : 'Send Enquiry'}
      </button>
    </form>
  );
}
