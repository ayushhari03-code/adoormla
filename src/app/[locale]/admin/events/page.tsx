import { createClient } from '@/lib/supabase/server';
import { Link } from '@/i18n/routing';
import { Plus, Edit } from 'lucide-react';
import { deleteEvent } from './actions';
import DeleteEventButton from './_components/DeleteEventButton';

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const supabase = await createClient();

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Events</h1>
          <p className="opacity-70">Manage public events and constituency schedules.</p>
        </div>
        <Link 
          href={`/admin/events/new`}
          className="bg-gold text-charcoal px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:bg-gold/90 transition-colors"
        >
          <Plus size={18} /> New Event
        </Link>
      </header>

      <div className="bg-ivory dark:bg-charcoal-light rounded-3xl border border-black/5 dark:border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
              <tr>
                <th className="p-4 font-bold uppercase text-xs tracking-wider opacity-70">Event Title</th>
                <th className="p-4 font-bold uppercase text-xs tracking-wider opacity-70">Location</th>
                <th className="p-4 font-bold uppercase text-xs tracking-wider opacity-70">Date & Time</th>
                <th className="p-4 font-bold uppercase text-xs tracking-wider opacity-70">Status</th>
                <th className="p-4 font-bold uppercase text-xs tracking-wider opacity-70 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {events?.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center opacity-50">
                    No events found. Create your first event!
                  </td>
                </tr>
              )}
              {events?.map((event) => (
                <tr key={event.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium">{event.title}</td>
                  <td className="p-4 opacity-70 text-sm">{event.location || 'TBA'}</td>
                  <td className="p-4 opacity-70 text-sm">
                    {event.event_date ? new Date(event.event_date).toLocaleString() : 'TBA'}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      event.published 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {event.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/admin/events/${event.id}/edit`}
                        className="p-2 bg-charcoal/5 dark:bg-white/5 rounded-lg hover:text-gold transition-colors"
                      >
                        <Edit size={16} />
                      </Link>
                      <DeleteEventButton id={event.id} locale={locale} deleteAction={deleteEvent} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
