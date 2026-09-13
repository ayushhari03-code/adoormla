import EventForm from '../_components/EventForm';

export default async function NewEventPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
        <p className="opacity-70">Add a new public event to the schedule.</p>
      </header>

      <EventForm locale={locale} />
    </div>
  );
}
