import type { IncomingMessage, ServerResponse } from 'node:http';

function normalizeIndianMobile(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits;
}

function isAllowedAppsScriptUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    return (
      parsed.protocol === 'https:' &&
      (parsed.hostname === 'script.google.com' ||
        parsed.hostname === 'script.googleusercontent.com')
    );
  } catch {
    return false;
  }
}

interface VercelRequest extends IncomingMessage {
  body?: unknown;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed' });
    return;
  }

  const body = (req.body || {}) as Record<string, unknown>;
  const parentName =
    typeof body.parentName === 'string' ? body.parentName.trim().slice(0, 120) : '';
  const phoneRaw =
    typeof body.phoneNumber === 'string' ? body.phoneNumber.trim().slice(0, 30) : '';
  const studentClass =
    typeof body.studentClass === 'string' ? body.studentClass.trim().slice(0, 80) : '';
  const subject =
    typeof body.subject === 'string' ? body.subject.trim().slice(0, 80) : '';
  const preferredTime =
    typeof body.preferredTime === 'string' ? body.preferredTime.trim().slice(0, 80) : '';
  const sourcePage =
    typeof body.sourcePage === 'string' ? body.sourcePage.trim().slice(0, 120) : 'Website';

  if (parentName.length < 2) {
    res.status(400).json({
      ok: false,
      message: 'Please enter the parent or guardian name (at least 2 characters).',
    });
    return;
  }

  const normalizedPhone = normalizeIndianMobile(phoneRaw);
  if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    res.status(400).json({
      ok: false,
      message: 'Please enter a valid 10-digit Indian mobile number.',
    });
    return;
  }

  const submissionTimestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const leadRecord = {
    parentName,
    phoneNumber: `+91 ${normalizedPhone}`,
    studentClass: studentClass || 'Not specified',
    subject: subject || 'Not specified',
    preferredTime: preferredTime || 'Flexible',
    submissionTimestamp,
    sourcePage,
    leadStatus: 'New Demo Enquiry',
  };

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL?.trim() || '';
  const appsScriptSecret = process.env.GOOGLE_APPS_SCRIPT_SECRET?.trim() || '';

  if (!appsScriptUrl) {
    res.status(200).json({
      ok: true,
      mode: 'demo',
      savedToSheet: false,
      notificationSent: false,
      message:
        'Demo Mode: Enquiry validated in preview. Google Sheets storage and email alerts are not yet configured.',
      lead: leadRecord,
    });
    return;
  }

  if (!isAllowedAppsScriptUrl(appsScriptUrl)) {
    res.status(500).json({
      ok: false,
      message: 'Invalid Google Apps Script endpoint URL configured.',
    });
    return;
  }

  try {
    const forwardResponse = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...leadRecord, secret: appsScriptSecret || undefined }),
    });

    if (!forwardResponse.ok) {
      res.status(502).json({
        ok: false,
        message: 'Unable to save your enquiry to Google Sheets right now.',
      });
      return;
    }

    const resultText = await forwardResponse.text();
    let parsed: { status?: string; notificationSent?: boolean; error?: string } = {};
    try {
      parsed = JSON.parse(resultText) as typeof parsed;
    } catch {
      // Plain text OK
    }

    if (parsed.status === 'error') {
      res.status(502).json({
        ok: false,
        message: parsed.error || 'Could not record enquiry in Google Sheets.',
      });
      return;
    }

    res.status(200).json({
      ok: true,
      mode: 'live',
      savedToSheet: true,
      notificationSent: Boolean(parsed.notificationSent),
      message: 'Your free demo class request has been received.',
      lead: leadRecord,
    });
  } catch {
    res.status(502).json({
      ok: false,
      message: 'Network error while saving your enquiry.',
    });
  }
}
