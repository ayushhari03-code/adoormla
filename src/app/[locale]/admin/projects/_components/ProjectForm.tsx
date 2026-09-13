'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { createProject, updateProject } from '../actions';

export default function ProjectForm({ locale, project }: { locale: string, project?: any }) {
  const [loading, setLoading] = useState(false);

  return (
    <form 
      action={project ? updateProject : createProject}
      onSubmit={() => setLoading(true)}
      className="bg-ivory dark:bg-charcoal-light p-8 rounded-3xl border border-black/5 dark:border-white/5 space-y-6"
    >
      <input type="hidden" name="locale" value={locale} />
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold mb-2">Project Title</label>
          <input
            name="title"
            required
            defaultValue={project?.title}
            className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow"
            placeholder="E.g., New Government Hospital Wing"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Status</label>
          <select
            name="status"
            defaultValue={project?.status || 'Planned'}
            className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow"
          >
            <option value="Planned" className="text-black dark:text-white dark:bg-charcoal">Planned</option>
            <option value="Ongoing" className="text-black dark:text-white dark:bg-charcoal">Ongoing</option>
            <option value="Completed" className="text-black dark:text-white dark:bg-charcoal">Completed</option>
          </select>
        </div>
      </div>


      <div>
        <label className="block text-sm font-bold mb-2">Description</label>
        <textarea
          name="description"
          rows={6}
          defaultValue={project?.description}
          className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow"
          placeholder="Detailed description of the project, impact, and beneficiaries..."
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-2">Publish Status</label>
        <select
          name="published"
          defaultValue={project?.published ? 'true' : 'false'}
          className="w-full px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-gold outline-none transition-shadow"
        >
          <option value="false" className="text-black dark:text-white dark:bg-charcoal">Draft (Hidden)</option>
          <option value="true" className="text-black dark:text-white dark:bg-charcoal">Published (Visible)</option>
        </select>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t border-black/5 dark:border-white/5">
        <Link
          href={`/admin/projects`}
          className="px-6 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 font-bold transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="bg-gold text-charcoal px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-gold/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
}
