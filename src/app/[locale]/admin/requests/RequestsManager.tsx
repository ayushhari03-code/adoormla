'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Briefcase, 
  Users, 
  FileText, 
  Phone, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  Eye, 
  AlertCircle, 
  Copy, 
  Check, 
  X,
  Trash2,
  Send
} from 'lucide-react';
import { markRequestAsViewed, updateRequestStatus, deleteCitizenRequest } from './actions';

export type CitizenRequestItem = {
  id: string;
  tracking_id: string;
  type: string;
  name: string;
  phone: string;
  panchayat: string;
  details: string;
  status: 'submitted' | 'viewed' | 'under_process' | 'resolved' | 'rejected' | string;
  admin_notes: string | null;
  viewed_at: string | null;
  created_at: string;
  updated_at: string;
};

interface RequestsManagerProps {
  initialRequests: CitizenRequestItem[];
}

export default function RequestsManager({ initialRequests }: RequestsManagerProps) {
  const [requests, setRequests] = useState<CitizenRequestItem[]>(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState<CitizenRequestItem | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notesInput, setNotesInput] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Copy tracking ID helper
  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Open detail modal and automatically mark as 'viewed' if it was 'submitted'
  const handleOpenDetail = async (req: CitizenRequestItem) => {
    setSelectedRequest(req);
    setNotesInput(req.admin_notes || '');

    if (req.status === 'submitted') {
      // Optimistic update in UI
      setRequests((prev) =>
        prev.map((r) => (r.id === req.id ? { ...r, status: 'viewed', viewed_at: new Date().toISOString() } : r))
      );
      setSelectedRequest((prev) => (prev ? { ...prev, status: 'viewed' } : null));
      await markRequestAsViewed(req.id);
    }
  };

  // Handle status change
  const handleStatusChange = async (newStatus: 'submitted' | 'viewed' | 'under_process' | 'resolved' | 'rejected') => {
    if (!selectedRequest) return;
    setIsUpdating(true);
    
    // Update local state
    setRequests((prev) =>
      prev.map((r) => (r.id === selectedRequest.id ? { ...r, status: newStatus, admin_notes: notesInput } : r))
    );
    setSelectedRequest((prev) => (prev ? { ...prev, status: newStatus, admin_notes: notesInput } : null));

    await updateRequestStatus(selectedRequest.id, newStatus, notesInput);
    setIsUpdating(false);
  };

  // Handle saving notes
  const handleSaveNotes = async () => {
    if (!selectedRequest) return;
    setIsUpdating(true);
    await updateRequestStatus(
      selectedRequest.id,
      selectedRequest.status as any,
      notesInput
    );
    setRequests((prev) =>
      prev.map((r) => (r.id === selectedRequest.id ? { ...r, admin_notes: notesInput } : r))
    );
    setSelectedRequest((prev) => (prev ? { ...prev, admin_notes: notesInput } : null));
    setIsUpdating(false);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this request?')) return;
    setRequests((prev) => prev.filter((r) => r.id !== id));
    if (selectedRequest?.id === id) {
      setSelectedRequest(null);
    }
    await deleteCitizenRequest(id);
  };

  // Filtered requests
  const filtered = requests.filter((req) => {
    const matchesStatus = statusFilter === 'all' ? true : req.status === statusFilter;
    const matchesType = typeFilter === 'all' ? true : req.type === typeFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      req.tracking_id.toLowerCase().includes(q) ||
      req.name.toLowerCase().includes(q) ||
      req.phone.toLowerCase().includes(q) ||
      req.panchayat.toLowerCase().includes(q) ||
      req.details.toLowerCase().includes(q);

    return matchesStatus && matchesType && matchesQuery;
  });

  // Counts
  const counts = {
    total: requests.length,
    submitted: requests.filter((r) => r.status === 'submitted').length,
    viewed: requests.filter((r) => r.status === 'viewed').length,
    under_process: requests.filter((r) => r.status === 'under_process').length,
    resolved: requests.filter((r) => r.status === 'resolved').length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <AlertCircle size={12} /> New
          </span>
        );
      case 'viewed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Eye size={12} /> Viewed
          </span>
        );
      case 'under_process':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Clock size={12} /> Under Process
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle size={12} /> Resolved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <X size={12} /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-charcoal/10 dark:bg-ivory/10">
            {status}
          </span>
        );
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'grievance':
        return <MessageSquare size={16} className="text-rose-500" />;
      case 'assistance':
        return <Briefcase size={16} className="text-blue-500" />;
      case 'meeting':
        return <Users size={16} className="text-amber-500" />;
      case 'suggestion':
        return <FileText size={16} className="text-emerald-500" />;
      default:
        return <MessageSquare size={16} />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <button
          onClick={() => setStatusFilter('all')}
          className={`p-5 rounded-2xl border text-left transition-all ${
            statusFilter === 'all'
              ? 'bg-gold/15 border-gold shadow-md'
              : 'bg-ivory dark:bg-charcoal-light border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20'
          }`}
        >
          <p className="text-xs uppercase font-bold tracking-wider opacity-70 mb-1">All Requests</p>
          <h3 className="text-3xl font-bold">{counts.total}</h3>
        </button>

        <button
          onClick={() => setStatusFilter('submitted')}
          className={`p-5 rounded-2xl border text-left transition-all ${
            statusFilter === 'submitted'
              ? 'bg-amber-500/20 border-amber-500 shadow-md'
              : 'bg-ivory dark:bg-charcoal-light border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs uppercase font-bold tracking-wider opacity-70">New / Unread</p>
            {counts.submitted > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            )}
          </div>
          <h3 className="text-3xl font-bold text-amber-600 dark:text-amber-400">{counts.submitted}</h3>
        </button>

        <button
          onClick={() => setStatusFilter('viewed')}
          className={`p-5 rounded-2xl border text-left transition-all ${
            statusFilter === 'viewed'
              ? 'bg-purple-500/20 border-purple-500 shadow-md'
              : 'bg-ivory dark:bg-charcoal-light border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20'
          }`}
        >
          <p className="text-xs uppercase font-bold tracking-wider opacity-70 mb-1">Viewed</p>
          <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400">{counts.viewed}</h3>
        </button>

        <button
          onClick={() => setStatusFilter('under_process')}
          className={`p-5 rounded-2xl border text-left transition-all ${
            statusFilter === 'under_process'
              ? 'bg-blue-500/20 border-blue-500 shadow-md'
              : 'bg-ivory dark:bg-charcoal-light border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20'
          }`}
        >
          <p className="text-xs uppercase font-bold tracking-wider opacity-70 mb-1">Under Process</p>
          <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">{counts.under_process}</h3>
        </button>

        <button
          onClick={() => setStatusFilter('resolved')}
          className={`p-5 rounded-2xl border text-left transition-all col-span-2 sm:col-span-1 ${
            statusFilter === 'resolved'
              ? 'bg-emerald-500/20 border-emerald-500 shadow-md'
              : 'bg-ivory dark:bg-charcoal-light border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20'
          }`}
        >
          <p className="text-xs uppercase font-bold tracking-wider opacity-70 mb-1">Resolved</p>
          <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{counts.resolved}</h3>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-ivory dark:bg-charcoal-light p-4 rounded-2xl border border-black/5 dark:border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            type="text"
            placeholder="Search by ID, name, phone, panchayat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-transparent focus:border-gold outline-none text-sm"
          />
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={16} className="opacity-50" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-transparent focus:border-gold outline-none text-sm font-medium w-full sm:w-auto cursor-pointer"
          >
            <option value="all">All Request Types</option>
            <option value="grievance">Grievance</option>
            <option value="assistance">Assistance</option>
            <option value="meeting">Meeting</option>
            <option value="suggestion">Suggestion</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-ivory dark:bg-charcoal-light rounded-3xl border border-black/5 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
              <tr>
                <th className="p-4 font-bold uppercase text-xs tracking-wider opacity-70">Ref ID</th>
                <th className="p-4 font-bold uppercase text-xs tracking-wider opacity-70">Citizen</th>
                <th className="p-4 font-bold uppercase text-xs tracking-wider opacity-70">Type & Panchayat</th>
                <th className="p-4 font-bold uppercase text-xs tracking-wider opacity-70">Status</th>
                <th className="p-4 font-bold uppercase text-xs tracking-wider opacity-70">Date</th>
                <th className="p-4 font-bold uppercase text-xs tracking-wider opacity-70 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center opacity-60">
                    <p className="text-base font-semibold">No requests found</p>
                    <p className="text-sm mt-1">Try clearing your search query or status filter.</p>
                  </td>
                </tr>
              )}
              {filtered.map((req) => (
                <tr
                  key={req.id}
                  className={`hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-pointer ${
                    req.status === 'submitted' ? 'bg-amber-500/[0.04]' : ''
                  }`}
                  onClick={() => handleOpenDetail(req)}
                >
                  <td className="p-4">
                    <div className="inline-flex items-center gap-1.5 font-mono font-bold text-sm text-gold">
                      <span>{req.tracking_id}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(req.tracking_id);
                        }}
                        className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors"
                        title="Copy Reference ID"
                      >
                        {copiedId === req.tracking_id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-sm">{req.name}</div>
                    <div className="text-xs opacity-70 font-mono mt-0.5">{req.phone}</div>
                  </td>
                  <td className="p-4">
                    <div className="inline-flex items-center gap-1.5 text-sm font-medium capitalize">
                      {getTypeIcon(req.type)}
                      <span>{req.type}</span>
                    </div>
                    <div className="text-xs opacity-70 mt-0.5">{req.panchayat}</div>
                  </td>
                  <td className="p-4">{getStatusBadge(req.status)}</td>
                  <td className="p-4 text-xs opacity-70 whitespace-nowrap">
                    {new Date(req.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => handleOpenDetail(req)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gold/15 text-gold hover:bg-gold hover:text-charcoal transition-colors"
                      >
                        View & Manage
                      </button>
                      <button
                        onClick={() => handleDelete(req.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Delete Request"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-ivory dark:bg-charcoal border border-black/10 dark:border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-black/10 dark:border-white/10 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl font-bold text-gold tracking-wide">
                    {selectedRequest.tracking_id}
                  </span>
                  {getStatusBadge(selectedRequest.status)}
                </div>
                <p className="text-xs opacity-60 mt-1">
                  Submitted on {new Date(selectedRequest.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Citizen Details */}
            <div className="grid sm:grid-cols-2 gap-4 bg-charcoal/5 dark:bg-white/5 p-4 rounded-2xl mb-6">
              <div>
                <p className="text-xs uppercase font-bold opacity-60">Citizen Name</p>
                <p className="text-base font-bold mt-0.5">{selectedRequest.name}</p>
              </div>
              <div>
                <p className="text-xs uppercase font-bold opacity-60">Phone Number</p>
                <p className="text-base font-mono font-bold mt-0.5">{selectedRequest.phone}</p>
              </div>
              <div>
                <p className="text-xs uppercase font-bold opacity-60">Panchayat / Municipality</p>
                <p className="text-sm font-medium mt-0.5">{selectedRequest.panchayat}</p>
              </div>
              <div>
                <p className="text-xs uppercase font-bold opacity-60">Request Category</p>
                <p className="text-sm font-medium capitalize mt-0.5 flex items-center gap-1.5">
                  {getTypeIcon(selectedRequest.type)}
                  {selectedRequest.type}
                </p>
              </div>
            </div>

            {/* Request Message Details */}
            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider font-bold opacity-70 mb-2">
                Citizen's Submission / Grievance Details
              </h4>
              <div className="p-4 bg-charcoal/5 dark:bg-white/5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap">
                {selectedRequest.details}
              </div>
            </div>

            {/* Direct Contact Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href={`tel:${selectedRequest.phone}`}
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-forest-green text-ivory dark:bg-gold dark:text-charcoal font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                <Phone size={16} /> Call Citizen
              </a>
              <a
                href={`https://wa.me/91${selectedRequest.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Namaskaram ${selectedRequest.name}, this is from the Office of Adv. CV Santhakumar MLA regarding your request (Ref ID: ${selectedRequest.tracking_id}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#128C7E] transition-colors"
              >
                <Send size={16} /> WhatsApp Citizen
              </a>
            </div>

            {/* Status Change Buttons */}
            <div className="border-t border-black/10 dark:border-white/10 pt-6 mb-6">
              <h4 className="text-xs uppercase tracking-wider font-bold opacity-70 mb-3">
                Update Status (Citizen will see this on track page)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  disabled={isUpdating || selectedRequest.status === 'viewed'}
                  onClick={() => handleStatusChange('viewed')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    selectedRequest.status === 'viewed'
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10'
                  }`}
                >
                  Viewed
                </button>

                <button
                  disabled={isUpdating || selectedRequest.status === 'under_process'}
                  onClick={() => handleStatusChange('under_process')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    selectedRequest.status === 'under_process'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10'
                  }`}
                >
                  Under Process
                </button>

                <button
                  disabled={isUpdating || selectedRequest.status === 'resolved'}
                  onClick={() => handleStatusChange('resolved')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    selectedRequest.status === 'resolved'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10'
                  }`}
                >
                  Resolved
                </button>

                <button
                  disabled={isUpdating || selectedRequest.status === 'rejected'}
                  onClick={() => handleStatusChange('rejected')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    selectedRequest.status === 'rejected'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10'
                  }`}
                >
                  Reject / Close
                </button>
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold opacity-70 mb-2">
                Internal Office Notes (Private to MLA & Staff)
              </h4>
              <textarea
                rows={3}
                placeholder="e.g., Forwarded to PWD engineer, follow up on Friday..."
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                className="w-full p-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm outline-none focus:border-gold resize-none mb-2"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveNotes}
                  disabled={isUpdating}
                  className="px-4 py-2 rounded-xl bg-charcoal dark:bg-ivory text-ivory dark:text-charcoal text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  {isUpdating ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
