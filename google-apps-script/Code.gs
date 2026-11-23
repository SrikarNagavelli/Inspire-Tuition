/**
 * Google Apps Script — Inspire Educational Institutions Lead Receiver
 * -------------------------------------------------------------------
 * Deploy as Web App:
 * 1. Open your Google Sheet -> Extensions -> Apps Script.
 * 2. Paste this code and update SHEET_NAME and NOTIFICATION_EMAIL.
 * 3. Set SCRIPT_SECRET in Script Properties (Project Settings -> Script Properties)
 *    matching GOOGLE_APPS_SCRIPT_SECRET in your server environment.
 * 4. Click Deploy -> New deployment -> Web app:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL into GOOGLE_APPS_SCRIPT_URL in .env / Vercel Env Vars.
 */

const SHEET_NAME = 'Demo Enquiries';
const NOTIFICATION_EMAIL = ''; // Set teacher/owner email address to enable alerts

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const props = PropertiesService.getScriptProperties();
    const expectedSecret = props.getProperty('SCRIPT_SECRET');

    if (expectedSecret && payload.secret !== expectedSecret) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: 'error', error: 'Unauthorized request' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Submission Timestamp',
        'Parent Name',
        'Phone Number',
        'Student Class',
        'Subject',
        'Preferred Time',
        'Source Page',
        'Lead Status',
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
    }

    const row = [
      payload.submissionTimestamp || new Date().toISOString(),
      payload.parentName || '',
      payload.phoneNumber || '',
      payload.studentClass || '',
      payload.subject || '',
      payload.preferredTime || '',
      payload.sourcePage || 'Website',
      payload.leadStatus || 'New Demo Enquiry',
    ];

    sheet.appendRow(row);

    let notificationSent = false;
    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL.indexOf('@') !== -1) {
      const emailSubject =
        'New Free Demo Enquiry: ' + (payload.parentName || 'Parent') + ' (' + (payload.studentClass || 'Class') + ')';
      const emailBody =
        'A new demo class enquiry was submitted on the Inspire Educational Institutions website.\n\n' +
        'Parent Name: ' + (payload.parentName || '') + '\n' +
        'Phone Number: ' + (payload.phoneNumber || '') + '\n' +
        'Student Class: ' + (payload.studentClass || '') + '\n' +
        'Subject: ' + (payload.subject || '') + '\n' +
        'Preferred Time: ' + (payload.preferredTime || '') + '\n' +
        'Submitted At: ' + (payload.submissionTimestamp || '') + '\n' +
        'Source: ' + (payload.sourcePage || 'Website') + '\n';

      MailApp.sendEmail(NOTIFICATION_EMAIL, emailSubject, emailBody);
      notificationSent = true;
    }

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'ok', notificationSent: notificationSent })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
