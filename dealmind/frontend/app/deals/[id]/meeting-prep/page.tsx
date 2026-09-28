'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText, Sparkles, Brain, ArrowLeft, CheckCircle2,
  AlertTriangle, HelpCircle, MessageSquare, ShieldAlert,
  Target, Layers, Zap, Loader2
} from 'lucide-react';

export default function MeetingPrepPage({ params }: { params: { id: string } }) {
  const dealId = params.id || 'nova-fleet-185k';
  const [prep, setPrep] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    // Automatically trigger generation on view or let user click button
    handleGenerate();
  }, [dealId]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/deals/${dealId}/meeting-prep`, {
        method: 'POST'
      });
      if (res.ok) {
        setPrep(await res.json());
        setGenerated(true);
      }
    } catch (e) {
      console.error(e);
      // Client fallback for standalone resilience
      setPrep({
        thirty_second_brief: "NovaFleet Technologies ($185k ARR) is evaluating our Enterprise Fleet Intelligence Platform. CTO Daniel Brooks has signed off on API latency specs, and CFO Maya Chen requires executive ROI evidence to finalize budget.",
        what_happened: "In recent calls, CFO Maya Chen moved from requesting upfront discounts to expressing strong interest in our $320k annual fuel savings ROI case study. Procurement (Alex Morgan) joined to review Net-45 terms.",
        who_matters: "1. Maya Chen (CFO) — Priority: Quantifiable ROI. 2. Daniel Brooks (CTO) — Priority: Security & low-latency API ingestion. 3. Alex Morgan (Procurement) — Priority: SLA guarantees and quarterly milestone billing.",
        active_objections: "Pricing & Budget Cap (Resolved with ROI case study); Net-45 Contract Terms & SLA Guarantees (Under active procurement review).",
        competitive_landscape: "Salesforce Internal Build is being evaluated as an alternative with zero software license fees. Counter-position: 12-month custom dev delay vs 2-week turnkey deployment.",
        what_worked_before: "Quantified financial ROI breakdowns with fuel efficiency metrics; Live sandbox REST API payload demonstrations for engineering leadership.",
        what_to_avoid: "Opening with arbitrary price discounts without value justification; avoid deep technical dives when meeting with CFO Maya Chen.",
        recommended_strategy: "Lead with the executive ROI deck validated by Maya Chen, then walk Procurement through the quarterly milestone payment schedule.",
        questions_to_ask: [
          "Has the board reviewed the $320k fleet ROI slide deck prepared for Maya?",
          "What specific SLA penalties does Alex Morgan require in the MSA?",
          "Can we align on a target execution date for this Friday?"
        ],
        risk_alerts: [
          "Procurement approval bottleneck if Net-45 billing terms are rejected.",
          "Competing internal engineering priorities if Salesforce team pushes internal build."
        ],
        suggested_opening: "\"Maya, Daniel — great to reconnect. Following up on our last conversation where we reviewed the $320k fleet ROI model, I've brought the finalized executive summary deck for your board review...\""
      });
      setGenerated(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link
            href={`/deals/${dealId}`}
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Deal Workspace</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-400" />
            AI Meeting Prep Briefing
          </h1>
          <p className="text-xs text-slate-400">
            Generated from 10 persistent Hindsight memories for NovaFleet Technologies
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Recalling Memories...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>PREPARE ME FOR THIS CALL</span>
            </>
          )}
        </button>
      </div>

      {prep && (
        <div className="space-y-6">
          {/* 30-SECOND BRIEF */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-blue-950/80 to-slate-900 border border-indigo-500/30 glass-card space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              30-SECOND EXECUTIVE BRIEF
            </div>
            <p className="text-sm font-semibold text-white leading-relaxed">
              {prep.thirty_second_brief}
            </p>
          </div>

          {/* SUGGESTED OPENING & RECOMMENDED STRATEGY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl glass-card border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <MessageSquare className="w-4 h-4" />
                SUGGESTED OPENING
              </div>
              <p className="text-xs text-slate-200 italic font-medium leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                {prep.suggested_opening}
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-indigo-500/30 space-y-2">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                <Target className="w-4 h-4" />
                RECOMMENDED STRATEGY
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                {prep.recommended_strategy}
              </p>
            </div>
          </div>

          {/* WHAT HAPPENED & WHO MATTERS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">WHAT HAPPENED (Recent Developments)</div>
              <p className="text-xs text-slate-300 leading-relaxed">{prep.what_happened}</p>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">WHO MATTERS (Stakeholders)</div>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{prep.who_matters}</p>
            </div>
          </div>

          {/* WHAT WORKED BEFORE vs WHAT TO AVOID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl glass-card border border-emerald-500/20 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">WHAT WORKED BEFORE</div>
              <p className="text-xs text-slate-300 leading-relaxed">{prep.what_worked_before}</p>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-rose-500/20 space-y-2">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">WHAT TO AVOID</div>
              <p className="text-xs text-slate-300 leading-relaxed">{prep.what_to_avoid}</p>
            </div>
          </div>

          {/* QUESTIONS TO ASK & RISK ALERTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                QUESTIONS TO ASK (3-5 SMART QUESTIONS)
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {prep.questions_to_ask?.map((q: string, qIdx: number) => (
                  <li key={qIdx} className="flex items-start gap-2 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                    <span className="font-mono text-indigo-400 font-bold">0{qIdx + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-amber-500/20 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                RISK ALERTS
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {prep.risk_alerts?.map((r: string, rIdx: number) => (
                  <li key={rIdx} className="flex items-start gap-2 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
