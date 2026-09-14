"use client";

import { useState, useEffect } from "react";
import PremiumButton from "@/components/ui/PremiumButton";
import { 
  MessageSquare, 
  Briefcase, 
  Users, 
  FileText, 
  CheckCircle2, 
  Search, 
  Copy, 
  Check, 
  Clock, 
  Eye, 
  AlertCircle,
  XCircle,
  ArrowRight
} from "lucide-react";
import { submitCitizenRequest, trackCitizenRequest, TrackedCitizenRequest } from "./actions";
import { createClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";

type ActiveTabType = "grievance" | "assistance" | "meeting" | "suggestion" | "track";
type FormState = "idle" | "submitting" | "success" | "error";

export default function PublicService() {
  const t = useTranslations("PublicService");
  const [activeTab, setActiveTab] = useState<ActiveTabType>("grievance");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [generatedTrackingId, setGeneratedTrackingId] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Tracking state
  const [trackInput, setTrackInput] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [trackedResult, setTrackedResult] = useState<TrackedCitizenRequest | null>(null);
  const [trackError, setTrackError] = useState<string>("");

  // Handle URL hash on mount or change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (["grievance", "assistance", "meeting", "suggestion", "track"].includes(hash)) {
        setActiveTab(hash as ActiveTabType);
      }
    }
  }, []);

  const tabs = [
    { id: "grievance" as const, label: t("tabGrievance"), icon: MessageSquare },
    { id: "assistance" as const, label: t("tabAssistance"), icon: Briefcase },
    { id: "meeting" as const, label: t("tabMeeting"), icon: Users },
    { id: "suggestion" as const, label: t("tabSuggestion"), icon: FileText },
    { id: "track" as const, label: t("tabTrack"), icon: Search },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const panchayat = (formData.get("panchayat") as string)?.trim();
    const details = (formData.get("details") as string)?.trim();

    if (!name || !phone || !panchayat || !details) {
      setErrorMessage("All fields are required.");
      setFormState("error");
      return;
    }

    try {
      // Direct browser-to-Supabase call (ultra fast, eliminates Next.js proxy/gateway timeout)
      const supabase = createClient();
      const trackingId = `ADR-${Math.floor(10000 + Math.random() * 90000)}`;

      const { error } = await supabase.from("citizen_requests").insert([
        {
          tracking_id: trackingId,
          type: activeTab,
          name,
          phone,
          panchayat,
          details,
          status: "submitted",
        },
      ]);

      if (!error) {
        setGeneratedTrackingId(trackingId);
        setFormState("success");
        form.reset();
        return;
      }
    } catch (err) {
      console.warn("Direct insert failed, falling back to server action:", err);
    }

    // Fallback to server action
    formData.set("type", activeTab);
    const result = await submitCitizenRequest(formData);

    if (result.success && result.trackingId) {
      setGeneratedTrackingId(result.trackingId);
      setFormState("success");
      form.reset();
    } else {
      setErrorMessage(result.error || "Submission failed. Please try again.");
      setFormState("error");
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = trackInput.trim().toUpperCase();
    if (!cleanId) return;

    setIsSearching(true);
    setTrackError("");
    setTrackedResult(null);

    try {
      // Direct browser-to-Supabase query
      const supabase = createClient();
      const { data, error } = await supabase
        .from("citizen_requests")
        .select("tracking_id, type, name, panchayat, details, status, created_at, updated_at")
        .eq("tracking_id", cleanId)
        .maybeSingle();

      if (data) {
        setTrackedResult(data as TrackedCitizenRequest);
        setIsSearching(false);
        return;
      } else if (!error && !data) {
        setTrackError("No request found with this Reference ID. Please check the number and try again.");
        setIsSearching(false);
        return;
      }
    } catch (err) {
      console.warn("Direct track lookup failed, falling back to server action:", err);
    }

    // Fallback to server action
    const result = await trackCitizenRequest(cleanId);

    if (result.success && result.request) {
      setTrackedResult(result.request);
    } else {
      setTrackError(result.error || "No request found. Please check your Reference ID.");
    }
    setIsSearching(false);
  };

  // Helper for tracking progress steps
  const getStepStatus = (currentStatus: string, stepIndex: number) => {
    // 0: submitted, 1: viewed, 2: under_process, 3: resolved
    const statusOrder: Record<string, number> = {
      submitted: 0,
      viewed: 1,
      under_process: 2,
      resolved: 3,
      rejected: -1,
    };

    const currentRank = statusOrder[currentStatus] ?? 0;
    if (currentStatus === "rejected") return "rejected";
    if (currentRank > stepIndex) return "completed";
    if (currentRank === stepIndex) return "active";
    return "pending";
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-warm dark:bg-charcoal">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <header className="mb-16 text-center">
          <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-bold mb-4">
            {t("badge")}
          </h2>
          <h1 className="text-4xl md:text-6xl font-sans font-bold leading-tight tracking-tighter mb-6 text-charcoal dark:text-ivory">
            {t("title")}
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </header>

        <div className="bg-ivory dark:bg-charcoal-light rounded-3xl shadow-xl overflow-hidden border border-black/5 dark:border-white/5 flex flex-col md:flex-row min-h-[620px]">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 bg-forest-green p-6 sm:p-8 text-ivory flex flex-col gap-2">
            <h3 className="font-bold uppercase tracking-wider mb-4 opacity-70 text-xs sm:text-sm">
              {t("services")}
            </h3>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setFormState("idle");
                    setErrorMessage("");
                  }}
                  className={`flex items-center gap-4 w-full text-left p-3.5 sm:p-4 rounded-xl transition-all ${
                    isSelected
                      ? "bg-ivory text-forest-green shadow-md font-bold"
                      : "hover:bg-forest-green-light text-ivory/90"
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isSelected ? "text-forest-green" : "opacity-70"}`} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}

            <div className="mt-auto pt-8 border-t border-white/10 hidden md:block">
              <h4 className="font-bold text-xs uppercase tracking-wider mb-2 text-gold">
                {t("officeLocation")}
              </h4>
              <p className="text-xs opacity-80 mb-4 leading-relaxed whitespace-pre-line">
                {t("officeAddress")}
              </p>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-2 text-gold">
                {t("contactHeading")}
              </h4>
              <p className="text-xs opacity-80 leading-relaxed font-mono">
                {t("contactPhone")}<br />
                {t("contactEmail")}
              </p>
            </div>
          </div>

          {/* Main Area */}
          <div className="w-full md:w-2/3 p-6 sm:p-10 md:p-12 relative flex items-center justify-center">
            {/* TAB: TRACK STATUS */}
            {activeTab === "track" ? (
              <div className="w-full max-w-lg mx-auto animate-in fade-in duration-300">
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gold/15 text-gold flex items-center justify-center mx-auto mb-4">
                    <Search size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t("trackHeading")}</h3>
                  <p className="text-sm opacity-70">{t("trackDescription")}</p>
                </div>

                <form onSubmit={handleTrackSubmit} className="mb-8">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder={t("referencePlaceholder")}
                      value={trackInput}
                      onChange={(e) => setTrackInput(e.target.value.toUpperCase())}
                      className="flex-1 px-4 py-3 rounded-xl bg-charcoal/5 dark:bg-white/5 border border-charcoal/20 dark:border-ivory/20 focus:border-forest-green dark:focus:border-gold outline-none font-mono font-bold tracking-wider uppercase text-sm"
                    />
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="px-6 py-3 rounded-xl bg-forest-green dark:bg-gold text-ivory dark:text-charcoal font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
                    >
                      {isSearching ? t("checkingBtn") : t("checkStatusBtn")}
                    </button>
                  </div>
                </form>

                {trackError && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm text-center flex items-center justify-center gap-2">
                    <AlertCircle size={16} />
                    <span>{trackError}</span>
                  </div>
                )}

                {trackedResult && (
                  <div className="p-6 rounded-2xl bg-charcoal/5 dark:bg-white/5 border border-black/5 dark:border-white/5 animate-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-start border-b border-black/10 dark:border-white/10 pb-4 mb-4">
                      <div>
                        <span className="text-xs uppercase font-bold tracking-wider opacity-60">
                          {t("referenceId")}
                        </span>
                        <h4 className="font-mono text-xl font-bold text-gold mt-0.5">
                          {trackedResult.tracking_id}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xs uppercase font-bold tracking-wider opacity-60">Category</span>
                        <p className="text-sm font-bold capitalize mt-0.5">{trackedResult.type}</p>
                      </div>
                    </div>

                    {/* Citizen Name, Date & Submission Details */}
                    <div className="bg-charcoal/5 dark:bg-white/5 rounded-2xl p-4 mb-6 border border-black/5 dark:border-white/5 space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="font-bold opacity-60 uppercase tracking-wider block">
                            {t("trackedCitizenName")}
                          </span>
                          <span className="font-bold text-sm text-charcoal dark:text-ivory mt-0.5 block">
                            {trackedResult.name || "Citizen"}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold opacity-60 uppercase tracking-wider block">
                            {t("trackedDate")}
                          </span>
                          <span className="font-medium text-charcoal dark:text-ivory mt-0.5 block">
                            {new Date(trackedResult.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>

                      {trackedResult.panchayat && (
                        <div className="text-xs pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                          <span className="font-bold opacity-60 uppercase tracking-wider">
                            {t("trackedLocation")}:
                          </span>
                          <span className="font-semibold text-charcoal dark:text-ivory">
                            {trackedResult.panchayat}
                          </span>
                        </div>
                      )}

                      {trackedResult.details && (
                        <div className="text-xs pt-2 border-t border-black/5 dark:border-white/5">
                          <span className="font-bold opacity-60 uppercase tracking-wider block mb-1">
                            {t("trackedSummary")}:
                          </span>
                          <p className="opacity-80 italic bg-black/[0.02] dark:bg-white/[0.02] p-2.5 rounded-xl text-xs leading-relaxed line-clamp-3">
                            "{trackedResult.details}"
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Progress Timeline */}
                    <div className="space-y-6">
                      {[
                        { title: t("stageSubmitted"), desc: t("stageSubmittedDesc"), icon: CheckCircle2 },
                        { title: t("stageViewed"), desc: t("stageViewedDesc"), icon: Eye },
                        { title: t("stageUnderProcess"), desc: t("stageUnderProcessDesc"), icon: Clock },
                        { title: t("stageResolved"), desc: t("stageResolvedDesc"), icon: Check },
                      ].map((step, idx) => {
                        const stepState = getStepStatus(trackedResult.status, idx);
                        const StepIcon = step.icon;

                        return (
                          <div key={idx} className="flex gap-4 items-start relative">
                            {/* Vertical connecting line */}
                            {idx < 3 && (
                              <div
                                className={`absolute left-4 top-8 bottom-0 w-0.5 -ml-px ${
                                  stepState === "completed"
                                    ? "bg-emerald-500"
                                    : "bg-charcoal/20 dark:bg-ivory/20"
                                }`}
                              />
                            )}

                            {/* Node icon */}
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                                stepState === "completed"
                                  ? "bg-emerald-500 text-white shadow-sm"
                                  : stepState === "active"
                                  ? "bg-gold text-charcoal shadow-md ring-4 ring-gold/20 animate-pulse"
                                  : "bg-charcoal/10 dark:bg-white/10 text-charcoal/40 dark:text-ivory/40"
                              }`}
                            >
                              <StepIcon size={16} />
                            </div>

                            <div className="flex-1 pt-0.5">
                              <h5
                                className={`text-sm font-bold ${
                                  stepState === "completed" || stepState === "active"
                                    ? "text-charcoal dark:text-ivory"
                                    : "opacity-50"
                                }`}
                              >
                                {step.title}
                              </h5>
                              <p className="text-xs opacity-70 mt-0.5">{step.desc}</p>
                            </div>
                          </div>
                        );
                      })}

                      {trackedResult.status === "rejected" && (
                        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-3">
                          <XCircle size={18} className="shrink-0" />
                          <div>
                            <span className="font-bold">{t("stageRejected")}: </span>
                            {t("stageRejectedDesc")}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : formState === "success" ? (
              /* SUCCESS STATE WITH REFERENCE ID */
              <div className="text-center animate-in fade-in zoom-in-95 duration-500 max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mb-6">
                  <CheckCircle2 size={44} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t("successTitle")}</h3>
                <p className="opacity-80 text-sm mb-6 leading-relaxed">
                  {t("successSubtitle")}
                </p>

                {/* Reference ID Box */}
                <div className="p-6 rounded-2xl bg-charcoal/5 dark:bg-white/5 border border-gold/30 mb-8 shadow-inner">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">
                    {t("referenceId")}
                  </p>
                  <div className="font-mono text-3xl font-extrabold tracking-wider text-charcoal dark:text-ivory mb-4">
                    {generatedTrackingId}
                  </div>
                  <button
                    onClick={() => handleCopy(generatedTrackingId)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold/90 transition-colors shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check size={14} /> {t("copied")}
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> {t("copyId")}
                      </>
                    )}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setActiveTab("track");
                      setTrackInput(generatedTrackingId);
                      setFormState("idle");
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-forest-green text-ivory dark:bg-gold dark:text-charcoal font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    {t("trackNow")} <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => setFormState("idle")}
                    className="flex-1 px-6 py-3 rounded-xl border border-black/15 dark:border-white/15 text-xs font-bold uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    {t("submitAnother")}
                  </button>
                </div>
              </div>
            ) : (
              /* FORM STATE */
              <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto animate-in fade-in duration-300">
                <h3 className="text-2xl font-bold mb-8">
                  {tabs.find((tab) => tab.id === activeTab)?.label}
                </h3>

                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                      {t("fullName")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Ayush Hari"
                      className="w-full bg-transparent border-b-2 border-charcoal/20 dark:border-ivory/20 focus:border-forest-green dark:focus:border-gold py-2 outline-none transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                      {t("phoneNumber")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="e.g. 9876543210"
                      className="w-full bg-transparent border-b-2 border-charcoal/20 dark:border-ivory/20 focus:border-forest-green dark:focus:border-gold py-2 outline-none transition-colors text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="panchayat" className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                      {t("panchayat")}
                    </label>
                    <input
                      type="text"
                      id="panchayat"
                      name="panchayat"
                      required
                      placeholder="e.g. Adoor Municipality / Erathu / Kadampanad"
                      className="w-full bg-transparent border-b-2 border-charcoal/20 dark:border-ivory/20 focus:border-forest-green dark:focus:border-gold py-2 outline-none transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="details" className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                      {t("details")}
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      rows={4}
                      required
                      placeholder="Please describe your request or grievance clearly..."
                      className="w-full bg-charcoal/5 dark:bg-ivory/5 border-2 border-transparent focus:border-forest-green dark:focus:border-gold rounded-xl p-4 outline-none transition-colors resize-none text-sm leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <PremiumButton variant="primary" className="w-full">
                      {formState === "submitting" ? t("submittingBtn") : t("submitBtn")}
                    </PremiumButton>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
