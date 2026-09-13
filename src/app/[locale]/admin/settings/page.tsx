import { createClient } from '@/lib/supabase/server';

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="opacity-70">Manage your admin account settings.</p>
      </header>

      <div className="bg-ivory dark:bg-charcoal-light p-8 rounded-3xl border border-black/5 dark:border-white/5 max-w-2xl space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1 opacity-70">Email Address</label>
              <div className="font-mono bg-black/5 dark:bg-white/5 p-3 rounded-lg">
                {user?.email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 opacity-70">Account ID</label>
              <div className="font-mono text-xs bg-black/5 dark:bg-white/5 p-3 rounded-lg break-all">
                {user?.id}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 dark:border-white/5">
          <h2 className="text-xl font-bold mb-4">Security</h2>
          <p className="opacity-70 mb-4 text-sm">
            To change your password or security settings, please use the Supabase dashboard directly, as strict security policies restrict modifying admin credentials through this interface.
          </p>
          <button disabled className="px-6 py-3 bg-black/5 dark:bg-white/5 rounded-xl font-bold opacity-50 cursor-not-allowed">
            Change Password (Disabled)
          </button>
        </div>
      </div>
    </div>
  );
}
