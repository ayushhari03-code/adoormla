'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function markRequestAsViewed(id: string) {
  try {
    const supabase = await createClient();

    // Check if current status is 'submitted'
    const { data: current } = await supabase
      .from('citizen_requests')
      .select('status')
      .eq('id', id)
      .single();

    if (current && current.status === 'submitted') {
      const { error } = await supabase
        .from('citizen_requests')
        .update({
          status: 'viewed',
          viewed_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        console.error('Error marking request as viewed:', error);
        return { success: false, error: error.message };
      }

      revalidatePath('/en/admin/requests');
      revalidatePath('/ml/admin/requests');
      revalidatePath('/en/admin');
      revalidatePath('/ml/admin');
    }

    return { success: true };
  } catch (err: any) {
    console.error('Error in markRequestAsViewed:', err);
    return { success: false, error: err.message };
  }
}

export async function updateRequestStatus(
  id: string,
  status: 'submitted' | 'viewed' | 'under_process' | 'resolved' | 'rejected',
  adminNotes?: string
) {
  try {
    const supabase = await createClient();

    const updatePayload: Record<string, any> = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (adminNotes !== undefined) {
      updatePayload.admin_notes = adminNotes;
    }

    const { error } = await supabase
      .from('citizen_requests')
      .update(updatePayload)
      .eq('id', id);

    if (error) {
      console.error('Error updating request status:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/en/admin/requests');
    revalidatePath('/ml/admin/requests');
    revalidatePath('/en/admin');
    revalidatePath('/ml/admin');
    return { success: true };
  } catch (err: any) {
    console.error('Error in updateRequestStatus:', err);
    return { success: false, error: err.message };
  }
}

export async function deleteCitizenRequest(id: string) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('citizen_requests')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting citizen request:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/en/admin/requests');
    revalidatePath('/ml/admin/requests');
    revalidatePath('/en/admin');
    revalidatePath('/ml/admin');
    return { success: true };
  } catch (err: any) {
    console.error('Error in deleteCitizenRequest:', err);
    return { success: false, error: err.message };
  }
}
