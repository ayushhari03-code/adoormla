'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { createEvent, updateEvent } from '../actions';

export default function EventForm({ locale, event }: { locale: string, event?: any }) {
  const [loading, setLoading] = useState(false);

  let dateValue = '';
  let timeValue = '';
  if (event?.event_date) {
    const d = new Date(event.event_date);
    // Convert to YYYY-MM-DD
    dateValue = d.toISOString().split('T')[0];
    // Convert to HH:mm
    timeValue = d.toTimeString().slice(0, 5);
  }

  return (
    <form 
      action={event ? updateEvent : createEvent}
      onSubmit={() => setLoading(true)}
      className="bg-ivory dark:bg-charcoal-light p-8 rounded-3xl border border-black/5 dark:border-white/5 space-y-6"
    >
      <input type="hidden" name="locale" value={locale} />
      {event && <input type="hidden" name="id" value={event.id} />}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold mb-2">Event Title</label>
          <input
            name="title"
            required
            defaultValue={event?.title}
            className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow"
            placeholder="E.g., Inauguration of New Road"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Location</label>
          <input
            name="location"
            defaultValue={event?.location}
            className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow"
            placeholder="E.g., Adoor Town Hall"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-bold mb-2">Date</label>
          <input
            type="date"
            name="date"
            defaultValue={dateValue}
            className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Time</label>
          <input
            type="time"
            name="time"
            defaultValue={timeValue}
            className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Publish Status</label>
          <select
            name="published"
            defaultValue={event?.published ? 'true' : 'false'}
            className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow"
          >
            <option value="false" className="text-black dark:text-white dark:bg-charcoal">Draft (Hidden)</option>
            <option value="true" className="text-black dark:text-white dark:bg-charcoal">Published (Visible)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-2">Description</label>
        <textarea
          name="description"
          rows={6}
          defaultValue={event?.description}
          className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow"
          placeholder="Detailed description of the event..."
        />
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t border-black/5 dark:border-white/5">
        <Link
          href={`/admin/events`}
          className="px-6 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 font-bold transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="bg-gold text-charcoal px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-gold/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
}
