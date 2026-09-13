'use client';

import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';

export default function DeleteButton({ id, locale, deleteAction }: { id: string, locale: string, deleteAction: any }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      startTransition(() => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('locale', locale);
        deleteAction(formData);
      });
    }
  };

  return (
    <button 
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 bg-charcoal/5 dark:bg-white/5 rounded-lg hover:text-red-500 transition-colors disabled:opacity-50"
    >
      <Trash2 size={16} />
    </button>
  );
}
