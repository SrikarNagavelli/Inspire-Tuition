export interface DemoPrefill {
  studentClass?: string;
  subject?: string;
  preferredTime?: string;
  sourceLabel?: string;
}

export interface EnquiryFormValues {
  parentName: string;
  phoneNumber: string;
  studentClass: string;
  subject: string;
  preferredTime: string;
}

export interface EnquiryApiResponse {
  ok: boolean;
  mode?: 'live' | 'demo';
  savedToSheet?: boolean;
  notificationSent?: boolean;
  message: string;
  lead?: {
    parentName: string;
    phoneNumber: string;
    studentClass: string;
    subject: string;
    preferredTime: string;
    submissionTimestamp: string;
    sourcePage: string;
    leadStatus: string;
  };
}
