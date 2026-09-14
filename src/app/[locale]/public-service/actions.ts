'use server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

function generateTrackingId(): string {
  // Generate a clean, human-readable reference code like ADR-74892
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `ADR-${randomDigits}`;
}

export type CitizenRequestSubmission = {
  success: boolean;
  trackingId?: string;
  error?: string;
};

export type TrackedCitizenRequest = {
  tracking_id: string;
  type: string;
  name?: string;
  panchayat: string;
  details?: string;
  status: 'submitted' | 'viewed' | 'under_process' | 'resolved' | 'rejected' | string;
  created_at: string;
  updated_at?: string;
};

export async function submitCitizenRequest(formData: FormData): Promise<CitizenRequestSubmission> {
  try {
    const type = (formData.get('type') as string) || 'grievance';
    const name = (formData.get('name') as string)?.trim();
    const phone = (formData.get('phone') as string)?.trim();
    const panchayat = (formData.get('panchayat') as string)?.trim();
    const details = (formData.get('details') as string)?.trim();

    if (!name || !phone || !panchayat || !details) {
      return { success: false, error: 'All fields are required.' };
    }

    let trackingId = generateTrackingId();
    let attempts = 0;
    let inserted = false;

    // Retry once or twice if tracking_id collision happens
    while (!inserted && attempts < 3) {
      const { error } = await supabase.from('citizen_requests').insert([
        {
          tracking_id: trackingId,
          type,
          name,
          phone,
          panchayat,
          details,
          status: 'submitted',
        },
      ]);

      if (!error) {
        inserted = true;
      } else if (error.code === '23505') {
        // Unique violation, regenerate ID
        trackingId = generateTrackingId();
        attempts++;
      } else {
        console.error('Error inserting citizen request:', error);
        return { success: false, error: error.message };
      }
    }

    if (!inserted) {
      return { success: false, error: 'Failed to generate a unique tracking ID. Please try again.' };
    }

    return { success: true, trackingId };
  } catch (err: any) {
    console.error('Submission error:', err);
    return { success: false, error: err.message || 'An unexpected error occurred.' };
  }
}

export async function trackCitizenRequest(trackingId: string): Promise<{
  success: boolean;
  request?: TrackedCitizenRequest;
  error?: string;
}> {
  try {
    const cleanId = trackingId.trim().toUpperCase();

    const { data, error } = await supabase
      .from('citizen_requests')
      .select('tracking_id, type, name, panchayat, details, status, created_at, updated_at')
      .eq('tracking_id', cleanId)
      .maybeSingle();

    if (error) {
      console.error('Tracking query error:', error);
      return { success: false, error: error.message };
    }

    if (!data) {
      return { success: false, error: 'No request found with this Reference ID. Please check the number and try again.' };
    }

    return { success: true, request: data };
  } catch (err: any) {
    console.error('Tracking error:', err);
    return { success: false, error: err.message || 'Failed to check status.' };
  }
}
