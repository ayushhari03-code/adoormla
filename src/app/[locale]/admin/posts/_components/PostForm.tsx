'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { createPost, updatePost } from '../actions';

export default function PostForm({ locale, post }: { locale: string, post?: any }) {
  const [loading, setLoading] = useState(false);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!post) { // only auto-generate slug for new posts
      const slugInput = document.getElementById('slug') as HTMLInputElement;
      if (slugInput && !slugInput.dataset.manual) {
        slugInput.value = generateSlug(e.target.value);
      }
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.dataset.manual = 'true';
  };

  return (
    <form 
      action={post ? updatePost : createPost}
      onSubmit={() => setLoading(true)}
      className="bg-ivory dark:bg-charcoal-light p-8 rounded-3xl border border-black/5 dark:border-white/5 space-y-6"
    >
      <input type="hidden" name="locale" value={locale} />
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold mb-2">Title</label>
          <input
            name="title"
            required
            defaultValue={post?.title}
            onChange={handleTitleChange}
            className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow"
            placeholder="Post title"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Slug</label>
          <input
            id="slug"
            name="slug"
            required
            defaultValue={post?.slug}
            onChange={handleSlugChange}
            className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow"
            placeholder="post-slug"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold mb-2">Category</label>
          <select
            name="category"
            defaultValue={post?.category || 'News'}
            className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow"
          >
            <option value="News" className="text-black dark:text-white dark:bg-charcoal">News</option>
            <option value="Development" className="text-black dark:text-white dark:bg-charcoal">Development</option>
            <option value="Events" className="text-black dark:text-white dark:bg-charcoal">Events</option>
            <option value="Infrastructure" className="text-black dark:text-white dark:bg-charcoal">Infrastructure</option>
            <option value="Health" className="text-black dark:text-white dark:bg-charcoal">Health</option>
            <option value="Education" className="text-black dark:text-white dark:bg-charcoal">Education</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Publish Status</label>
          <select
            name="published"
            defaultValue={post?.published ? 'true' : 'false'}
            className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow"
          >
            <option value="false" className="text-black dark:text-white dark:bg-charcoal">Draft (Hidden)</option>
            <option value="true" className="text-black dark:text-white dark:bg-charcoal">Published (Visible)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-2">Excerpt (Short Summary)</label>
        <textarea
          name="excerpt"
          rows={3}
          defaultValue={post?.excerpt}
          className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow"
          placeholder="Brief summary for list views..."
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-2">Full Content</label>
        <textarea
          name="content"
          required
          rows={12}
          defaultValue={post?.content}
          className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow font-mono text-sm"
          placeholder="Write the full post content here... (HTML or Markdown supported depending on your renderer)"
        />
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t border-black/5 dark:border-white/5">
        <Link
          href={`/admin/posts`}
          className="px-6 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 font-bold transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="bg-gold text-charcoal px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-gold/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}
