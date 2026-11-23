import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { businessConfig } from './src/config/businessConfig.ts';
import { findPage } from './src/config/pages.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

function normalizeIndianMobile(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
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

async function createApp() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'inspire-tuition-api' });
  });

  app.get('/api/location', (_req, res) => {
    const { fullAddress, coordinates } = businessConfig.location;
    const configured = Boolean(process.env.VITE_GOOGLE_MAPS_API_KEY?.trim());

    res.json({ configured, address: fullAddress, coordinates });
  });

  /**
   * Server-side proxy for Demo Class Enquiry submissions.
   * Forwards validated leads to Google Apps Script when configured,
   * or honestly reports Demo Mode when GOOGLE_APPS_SCRIPT_URL is unset.
   */
  app.post('/api/enquiries', async (req, res) => {
    const body = req.body as Record<string, unknown> | undefined;
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ ok: false, message: 'Invalid enquiry payload.' });
    }

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
      return res.status(400).json({
        ok: false,
        message: 'Please enter the parent or guardian name (at least 2 characters).',
      });
    }

    const normalizedPhone = normalizeIndianMobile(phoneRaw);
    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      return res.status(400).json({
        ok: false,
        message: 'Please enter a valid 10-digit Indian mobile number.',
      });
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
      return res.status(200).json({
        ok: true,
        mode: 'demo',
        savedToSheet: false,
        notificationSent: false,
        message:
          'Demo Mode: Enquiry validated in preview. Google Sheets storage and email alerts are not yet configured.',
        lead: leadRecord,
      });
    }

    if (!isAllowedAppsScriptUrl(appsScriptUrl)) {
      return res.status(500).json({
        ok: false,
        message: 'Server configuration error: Invalid Google Apps Script endpoint URL.',
      });
    }

    try {
      const forwardResponse = await fetch(appsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...leadRecord,
          secret: appsScriptSecret || undefined,
        }),
      });

      if (!forwardResponse.ok) {
        return res.status(502).json({
          ok: false,
          message:
            'Unable to save your enquiry to the Google Sheet right now. Please try again shortly.',
        });
      }

      const resultText = await forwardResponse.text();
      let parsed: { status?: string; notificationSent?: boolean; error?: string } = {};
      try {
        parsed = JSON.parse(resultText) as typeof parsed;
      } catch {
        // Some Apps Script deployments return plain text OK
      }

      if (parsed.status === 'error') {
        return res.status(502).json({
          ok: false,
          message: parsed.error || 'Could not record enquiry in Google Sheets.',
        });
      }

      return res.status(200).json({
        ok: true,
        mode: 'live',
        savedToSheet: true,
        notificationSent: Boolean(parsed.notificationSent),
        message: 'Your free demo class request has been received.',
        lead: leadRecord,
      });
    } catch {
      return res.status(502).json({
        ok: false,
        message:
          'Network error while saving your enquiry. Please check your connection and try again.',
      });
    }
  });

  if (!IS_PRODUCTION) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir, { redirect: false }));
    app.get('*', (req, res) => {
      const page = findPage(req.path);
      const file = page?.path === '/' ? 'index.html' : `${page?.path.slice(1) ?? '404'}.html`;
      const htmlPath = path.join(distDir, file);
      if (!fs.existsSync(htmlPath)) {
        res.status(404).send('Build output not found. Run npm run build first.');
        return;
      }
      res.status(page ? 200 : 404).sendFile(htmlPath);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Inspire Educational Institutions server running on http://0.0.0.0:${PORT}`);
  });
}

createApp();
