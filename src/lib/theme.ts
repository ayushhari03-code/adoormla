import { createClient } from '@supabase/supabase-js';

export async function getActiveTheme(): Promise<string> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return 'default';
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch theme setting with timeout safety
    const queryPromise = supabase
      .from('gallery')
      .select('title')
      .eq('category', 'GLOBAL_THEME')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const timeoutPromise = new Promise<{ data: null; error: null }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: null }), 2500)
    );

    const result = await Promise.race([queryPromise, timeoutPromise]);

    if (result && 'data' in result && result.data?.title) {
      return result.data.title;
    }

    return 'default';
  } catch (err) {
    console.error('Error fetching active theme:', err);
    return 'default';
  }
}
