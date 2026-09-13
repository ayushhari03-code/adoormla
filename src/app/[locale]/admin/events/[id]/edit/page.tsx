import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import EventForm from '../../_components/EventForm';

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ locale: string, id: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const id = resolvedParams.id;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (!event) {
    redirect(`/${locale}/admin/events`);
  }

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Edit Event</h1>
        <p className="opacity-70">Make changes to the event details.</p>
      </header>

      <EventForm locale={locale} event={event} />
    </div>
  );
}
