import { businessConfig } from '../config/businessConfig';

/**
 * Strips spaces, dashes, leading 0, or +91 / 91 country prefix and checks
 * whether the remaining number is a valid 10-digit Indian mobile number
 * starting with 6, 7, 8, or 9.
 */
export function normalizeIndianMobile(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

export function validateIndianMobile(raw: string): string | true {
  const normalized = normalizeIndianMobile(raw);
  if (!normalized) {
    return 'Please enter a valid 10-digit mobile number.';
  }
  if (!/^[6-9]\d{9}$/.test(normalized)) {
    return 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.';
  }
  return true;
}

export function getWhatsAppUrl(customMessage?: string): string | null {
  const number = businessConfig.contact.whatsappE164.replace(/\D/g, '');
  if (!number) return null;
  const message = encodeURIComponent(
    customMessage || businessConfig.contact.whatsappPrefillMessage
  );
  return `https://wa.me/${number}?text=${message}`;
}

export function getTelUrl(): string | null {
  const phone = businessConfig.contact.phoneE164.trim();
  if (!phone) return null;
  return `tel:${phone}`;
}
