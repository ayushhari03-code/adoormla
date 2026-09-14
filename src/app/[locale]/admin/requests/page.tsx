import { createClient } from '@/lib/supabase/server';
import RequestsManager from './RequestsManager';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Citizen Requests & Grievances | Admin Panel',
};

export default async function AdminRequestsPage() {
  const supabase = await createClient();

  const { data: requests, error } = await supabase
    .from('citizen_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching citizen requests:', error);
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Citizen Requests & Grievances</h1>
        <p className="opacity-70">
          Review, manage, and track public submissions from the citizens of Adoor.
        </p>
      </header>

      <RequestsManager initialRequests={requests || []} />
    </div>
  );
}
