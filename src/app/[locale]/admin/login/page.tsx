import { useTranslations } from 'next-intl';
import { login } from './actions';

export default async function LoginPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ locale: string }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const error = searchParams?.error as string | undefined;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-ivory dark:bg-charcoal-light rounded-3xl p-8 shadow-xl border border-black/5 dark:border-white/5">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-sans text-charcoal dark:text-ivory mb-2">Admin Dashboard</h1>
          <p className="text-sm opacity-70">Sign in to manage website content</p>
        </div>

        <form className="space-y-6">
          <input type="hidden" name="locale" value={params.locale} />
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold mb-2 text-charcoal dark:text-ivory" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              suppressHydrationWarning
              className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-ivory/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-charcoal dark:text-ivory" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              suppressHydrationWarning
              className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-ivory/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
              placeholder="••••••••"
            />
          </div>

          <button
            formAction={login}
            suppressHydrationWarning
            className="w-full bg-gold text-charcoal font-bold py-3 px-4 rounded-xl hover:bg-gold/90 transition-colors uppercase tracking-wider text-sm"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
