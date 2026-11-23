# Inspire Educational Institutions — Home Tuition Website

Modern, mobile-first lead-generation website for **Inspire Educational Institutions** located Opposite HMWS Water Tank, East Marredpally, Secunderabad, Telangana, India.

---

## 1. Running Locally

### Prerequisites
- Node.js `v20+` (tested on `v22.x`)
- npm

### Setup Steps
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and add any available keys:
   ```bash
   cp .env.example .env
   ```
3. Start the full-stack development server (Express API + Vite on port `3000`):
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser.
5. Type-check and build for production:
   ```bash
   npm run lint
   npm run build
   npm start
   ```

---

## 2. Google Sheets & Email Notification Setup (Google Apps Script)

All demo class enquiries are submitted to `/api/enquiries` (server-side proxy) so your Google Apps Script URL and secret never leak to the browser.

1. Create a new Google Sheet (e.g. `Inspire Demo Class Enquiries`).
2. Go to **Extensions -> Apps Script** and paste the contents of `google-apps-script/Code.gs`.
3. Update `NOTIFICATION_EMAIL` in `Code.gs` to the teacher's email address to enable email alerts when a new lead arrives.
4. In Apps Script **Project Settings -> Script Properties**, add:
   - Key: `SCRIPT_SECRET`
   - Value: a strong random token (matching `GOOGLE_APPS_SCRIPT_SECRET` in `.env`).
5. Click **Deploy -> New deployment -> Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone
6. Copy the generated Web App URL (`https://script.google.com/macros/s/.../exec`) and set it as `GOOGLE_APPS_SCRIPT_URL` in your `.env` / hosting environment variables.

> **Demo Mode Behavior:** When `GOOGLE_APPS_SCRIPT_URL` is blank, the website operates transparently in **Demo Mode** and informs visitors that Google Sheets storage is not yet configured.

---

## 3. Deploying to Vercel

1. Push this repository to GitHub / GitLab / Bitbucket.
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. `vercel.json` serves the generated route HTML at clean URLs and preserves the `/api/enquiries` serverless function.
4. Add Environment Variables in **Vercel Project Settings -> Environment Variables**:
   - `GOOGLE_APPS_SCRIPT_URL`
   - `GOOGLE_APPS_SCRIPT_SECRET`
   - `VITE_GOOGLE_MAPS_API_KEY` (restricted to your production domain HTTP referrers in Google Cloud Console)
   - `SITE_CANONICAL_URL` (set this to the production origin if you use a custom domain. The build uses it for all page canonicals and sitemap entries.)
5. Deploy and verify `https://your-domain.com/robots.txt`, `https://your-domain.com/sitemap.xml`, and a test enquiry submission.

---

## 4. Pre-Launch Client Confirmation Checklist

Before switching the site from prototype preview to live client launch, confirm and update all items inside `src/config/businessConfig.ts`:

- [ ] **Teacher Profile**: Real name, educational qualifications, years of teaching experience, and authentic portrait photo (`photoUrl`).
- [ ] **Contact Details**: Verified phone number (`phoneDisplay`, `phoneE164`), WhatsApp number (`whatsappE164`), and optional email address.
- [ ] **Classes & Subjects**: Confirm exact grade levels (Classes 1–5, 6–8, 9–10, etc.) and individual subjects offered.
- [ ] **Education Boards**: Confirm whether CBSE, ICSE, and Telangana State Board are all supported.
- [ ] **Batch Timings & Availability**: Replace example schedule rows with real morning/evening batch timings and open seat status.
- [ ] **Student Results**: Replace the 3 sample student outcome cards with verified, parent-approved results (or toggle off until available).
- [ ] **Google Business Profile**: Add verified `profileUrl`, `verifiedRating`, `verifiedReviewCount`, and authentic parent reviews.
- [ ] **Lead Pipeline**: Connect `GOOGLE_APPS_SCRIPT_URL`, `GOOGLE_APPS_SCRIPT_SECRET`, and `NOTIFICATION_EMAIL`, then submit a live test enquiry.
- [ ] **SEO Domain**: Update `SITE_CANONICAL_URL` and `<loc>` in `public/sitemap.xml` to the final custom domain.
