'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AddInteractionModal from '@/components/AddInteractionModal';
import DealMemoryReplayModal from '@/components/DealMemoryReplayModal';
import LearningCurveChart from '@/components/LearningCurveChart';
import AskDealMindChat from '@/components/AskDealMindChat';
import {
  Brain, Sparkles, Play, Plus, Clock, Users, ShieldAlert,
  Target, CheckCircle2, ChevronRight, FileText, ArrowUpRight,
  Database, RefreshCw, AlertCircle, TrendingUp, Layers
} from 'lucide-react';

export default function DealWorkspacePage({ params }: { params: { id: string } }) {
  const dealId = params.id || 'nova-fleet-185k';
  const [deal, setDeal] = useState<any>(null);
  const [stakeholders, setStakeholders] = useState<any[]>([]);
  const [objections, setObjections] = useState<any[]>([]);
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [interactions, setInteractions] = useState<any[]>([]);
  const [intelligence, setIntelligence] = useState<any>(null);
  const [healthBreakdown, setHealthBreakdown] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReplayModalOpen, setIsReplayModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDealData();
  }, [dealId]);

  const fetchDealData = async () => {
    setLoading(true);
    try {
      const [dRes, sRes, oRes, cRes, iRes, intRes, hRes] = await Promise.all([
        fetch(`/api/deals/${dealId}`),
        fetch(`/api/deals/${dealId}/stakeholders`),
        fetch(`/api/deals/${dealId}/objections`),
        fetch(`/api/deals/${dealId}/competitors`),
        fetch(`/api/deals/${dealId}/interactions`),
        fetch(`/api/deals/${dealId}/intelligence`),
        fetch(`/api/deals/${dealId}/health`)
      ]);

      if (dRes.ok) setDeal(await dRes.json());
      if (sRes.ok) setStakeholders(await sRes.json());
      if (oRes.ok) setObjections(await oRes.json());
      if (cRes.ok) setCompetitors(await cRes.json());
      if (iRes.ok) setInteractions(await iRes.json());
      if (intRes.ok) setIntelligence(await intRes.json());
      if (hRes.ok) setHealthBreakdown(await hRes.json());
    } catch (e) {
      console.error('Error fetching deal data:', e);
    } finally {
      setLoading(false);
    }
  };

  const currentDeal = deal || {
    company_name: "NovaFleet Technologies",
    deal_name: "Enterprise Fleet Intelligence Platform",
    deal_value: 185000,
    stage: "Negotiation",
    health_score: 78
  };

  const currentIntel = intelligence?.intelligence || {
    current_assessment: "The deal is progressing, but pricing remains the primary risk.",
    what_changed: "The CFO moved from general pricing concern to requesting measurable ROI evidence.",
    what_worked: "ROI-based messaging produced positive engagement in the previous interaction.",
    what_didn_t_work: "Leading with discounting did not resolve the concern.",
    what_matters_now: "Procurement has entered the process."
  };

  const nextBestAction = intelligence?.next_best_action || {
    action: "Lead the next conversation with the quantified ROI case instead of opening with another discount.",
    why: [
      "CFO raised pricing concerns in 3 interactions.",
      "ROI messaging produced positive engagement.",
      "Procurement is now involved.",
      "Previous discount discussion did not resolve the concern."
    ],
    memory_sources: [
      { label: "Sep 10 — Pricing Concern", date: "Sep 10" },
      { label: "Sep 21 — Discount Request", date: "Sep 21" },
      { label: "Sep 24 — ROI Response", date: "Sep 24" },
      { label: "Sep 26 — Procurement Review", date: "Sep 26" }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* 11. DEAL WORKSPACE HEADER */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {currentDeal.company_name}
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                {currentDeal.stage}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ${Number(currentDeal.deal_value).toLocaleString()} ARR
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1 font-medium">
              {currentDeal.deal_name}
            </p>
          </div>

          {/* Core Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/deals/${dealId}/meeting-prep`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>PREPARE ME FOR THIS CALL</span>
            </Link>

            <button
              onClick={() => setIsReplayModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 text-purple-200 font-bold text-xs border border-purple-500/30 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current text-purple-400" />
              <span>REPLAY DEAL MEMORY</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
            >
              <Plus className="w-4 h-4 text-indigo-400" />
              <span>Add Interaction</span>
            </button>
          </div>
        </div>

        {/* 12. DEAL HEALTH BREAKDOWN STRIP */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
              <span className="text-xl font-black text-indigo-300 font-mono">
                {currentDeal.health_score}
              </span>
              <span className="text-[10px] text-slate-500 absolute bottom-1">/100</span>
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Overall Deal Health Score</div>
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Calculated from 10 Hindsight memories & stakeholder sentiment
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 w-full md:w-auto text-center">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Budget Fit</div>
              <div className="text-xs font-bold text-emerald-400">85%</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Decision Maker</div>
              <div className="text-xs font-bold text-indigo-400">90%</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Product Fit</div>
              <div className="text-xs font-bold text-emerald-400">95%</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Comp. Risk</div>
              <div className="text-xs font-bold text-rose-400">65%</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Engagement</div>
              <div className="text-xs font-bold text-cyan-400">88%</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Next Confidence</div>
              <div className="text-xs font-bold text-emerald-400">92%</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-t border-slate-800/80 pt-4 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & AI Intelligence' },
            { id: 'timeline', label: 'Memory Timeline' },
            { id: 'stakeholders', label: 'Stakeholder Intelligence' },
            { id: 'objections', label: 'Objection Intelligence' },
            { id: 'competitors', label: 'Competitor Intelligence' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 18. NEXT BEST ACTION & 17. AI DEAL INTELLIGENCE VISUAL CENTERPIECE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Next Best Action & Deal Assessment */}
        <div className="lg:col-span-2 space-y-6">
          {/* LARGE PREMIUM CARD: NEXT BEST ACTION (Section 18) */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-teal-950/80 to-slate-900 border border-emerald-400/40 shadow-2xl space-y-4 glow-effect relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-emerald-300 tracking-wide uppercase">
                  NEXT BEST ACTION
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 font-bold border border-emerald-400/30">
                RECOMMENDED BY HINDSIGHT
              </span>
            </div>

            <p className="text-base font-bold text-white leading-relaxed">
              "{nextBestAction.action}"
            </p>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">WHY?</div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {nextBestAction.why.map((w: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clickable Memory Source Chips */}
            <div className="pt-2 border-t border-emerald-500/20">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                MEMORY SOURCES (Click to trace reasoning):
              </div>
              <div className="flex flex-wrap gap-2">
                {nextBestAction.memory_sources.map((chip: any, idx: number) => (
                  <Link
                    key={idx}
                    href={`/deals/${dealId}/memory`}
                    className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-emerald-950 text-slate-300 hover:text-emerald-300 text-xs font-medium border border-slate-700 hover:border-emerald-500/40 transition-all flex items-center gap-1.5"
                  >
                    <Database className="w-3 h-3 text-emerald-400" />
                    <span>"{chip.label}"</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 17. AI DEAL INTELLIGENCE CARD */}
          <div className="p-6 rounded-3xl glass-card border border-indigo-500/30 space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
              <h3 className="text-base font-bold text-white">AI DEAL INTELLIGENCE</h3>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Current Assessment</div>
              <p className="text-xs text-slate-200 mt-1">{currentIntel.current_assessment}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">WHAT CHANGED?</div>
                <p className="text-xs text-slate-300">{currentIntel.what_changed}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">WHAT WORKED?</div>
                <p className="text-xs text-slate-300">{currentIntel.what_worked}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">WHAT DIDN'T WORK?</div>
                <p className="text-xs text-slate-300">{currentIntel.what_didn_t_work}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">WHAT MATTERS NOW?</div>
                <p className="text-xs text-slate-300">{currentIntel.what_matters_now}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Col: Ask DealMind Chat Assistant */}
        <div className="space-y-6">
          <AskDealMindChat dealId={dealId} />
        </div>
      </div>

      {/* 23. LEARNING CURVE CHART */}
      <LearningCurveChart />

      {/* TAB CONTENT SECTIONS */}
      {/* 13. MEMORY TIMELINE SECTION */}
      {(activeTab === 'overview' || activeTab === 'timeline') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              13. Chronological Deal Memory Timeline
            </h3>
            <span className="text-xs text-slate-400">10 historical interactions remembered</span>
          </div>

          <div className="relative border-l-2 border-indigo-500/30 pl-6 ml-4 space-y-6">
            {(interactions.length > 0 ? interactions : [
              { title: "Discovery Call", date: "Sep 10", summary: "Pricing concern identified. CFO wants measurable ROI. CTO interested in API integration." },
              { title: "Product & Technical Demo", date: "Sep 15", summary: "CTO responded positively to REST API sandbox integration. CFO requested ROI proof." },
              { title: "Negotiation Call", date: "Sep 21", summary: "15% discount requested by CFO Maya Chen. Procurement joined." },
              { title: "ROI Follow-up", date: "Sep 24", summary: "ROI case study ($320k fuel savings) shared. CFO responded positively." },
              { title: "Executive Alignment", date: "Sep 28", summary: "Board approved ROI presentation deck. Final procurement contract review." }
            ]).map((item: any, idx: number) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-indigo-500 group-hover:bg-indigo-500 transition-colors"></div>
                <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-indigo-400">{item.date}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">{item.type || 'Meeting'}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.summary || item.transcript}</p>
                  {item.outcome && (
                    <div className="text-[11px] text-emerald-300 font-medium pt-1">
                      Outcome: {item.outcome}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 14. STAKEHOLDER INTELLIGENCE SECTION */}
      {(activeTab === 'overview' || activeTab === 'stakeholders') && (
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            14. Stakeholder Intelligence Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(stakeholders.length > 0 ? stakeholders : [
              { name: 'Maya Chen', role: 'CFO', priority: 'ROI', concern: 'Pricing', influence: 'High', sentiment: 'Cautiously Positive' },
              { name: 'Daniel Brooks', role: 'CTO', priority: 'Integration', concern: 'Security', influence: 'High', sentiment: 'Positive' },
              { name: 'Alex Morgan', role: 'Procurement', priority: 'Cost', concern: 'Contract Terms', influence: 'Medium', sentiment: 'Neutral' }
            ]).map((stk: any, idx: number) => (
              <div key={idx} className="p-5 rounded-2xl glass-card border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">{stk.name}</h4>
                    <span className="text-xs text-indigo-300 font-semibold">{stk.role}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    Influence: {stk.influence}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold">Priority: </span>
                    <span className="text-slate-200 font-medium">
                      {Array.isArray(stk.priorities) ? stk.priorities.join(', ') : stk.priority || 'ROI'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">Concern: </span>
                    <span className="text-slate-200 font-medium">
                      {Array.isArray(stk.concerns) ? stk.concerns.join(', ') : stk.concern || 'Pricing'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">Sentiment: </span>
                    <span className="text-emerald-400 font-bold">{stk.sentiment}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 15. OBJECTION INTELLIGENCE SECTION */}
      {(activeTab === 'overview' || activeTab === 'objections') && (
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
            15. Objection Intelligence Tracker
          </h3>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden glass-card">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase">
                <tr>
                  <th className="px-6 py-3.5">Objection</th>
                  <th className="px-6 py-3.5">Frequency</th>
                  <th className="px-6 py-3.5">Response Used</th>
                  <th className="px-6 py-3.5">Effectiveness</th>
                  <th className="px-6 py-3.5">Last Seen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {(objections.length > 0 ? objections : [
                  { objection: "Pricing & Value", frequency: "3 times", response_used: "ROI comparison ($320k savings)", effectiveness_score: 89, last_seen: "Sep 24" },
                  { objection: "Integration & API", frequency: "2 times", response_used: "Technical demo & sandbox connector", effectiveness_score: 82, last_seen: "Sep 15" },
                  { objection: "Contract Terms", frequency: "1 time", response_used: "Legal clarification & milestone schedule", effectiveness_score: 70, last_seen: "Sep 26" }
                ]).map((obj: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-850/50">
                    <td className="px-6 py-4 font-bold text-white">{obj.objection}</td>
                    <td className="px-6 py-4 font-mono">{obj.frequency || '2 times'}</td>
                    <td className="px-6 py-4 text-slate-300">{obj.response_used}</td>
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-emerald-400">{obj.effectiveness_score}%</span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono">{obj.last_seen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 16. COMPETITOR INTELLIGENCE SECTION */}
      {(activeTab === 'overview' || activeTab === 'competitors') && (
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            16. Competitor Intelligence
          </h3>
          {(competitors.length > 0 ? competitors : [
            {
              name: "Salesforce Internal Build",
              mentions: 4,
              threat_level: "High",
              strengths: ["Brand trust", "Existing ecosystem"],
              weaknesses: ["Integration complexity", "Higher implementation effort"],
              competitive_talking_point: "Salesforce requires 12 months of custom Apex development; DealMind delivers turnkey telematics AI out of the box in 2 weeks."
            }
          ]).map((comp: any, idx: number) => (
            <div key={idx} className="p-6 rounded-2xl glass-card border border-rose-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white">Competitor: {comp.name}</h4>
                  <span className="text-xs text-slate-400">Mentions in memory: {comp.mentions} times</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Threat Level: {comp.threat_level}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="font-bold text-slate-300 mb-1">Known Strengths:</div>
                  <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                    {comp.strengths?.map((s: string, sIdx: number) => <li key={sIdx}>{s}</li>)}
                  </ul>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="font-bold text-slate-300 mb-1">Known Weaknesses:</div>
                  <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                    {comp.weaknesses?.map((w: string, wIdx: number) => <li key={wIdx}>{w}</li>)}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs">
                <div className="font-bold text-indigo-300 mb-1">Competitive Talking Point (Generated from memory):</div>
                <p className="text-slate-200 italic">"{comp.competitive_talking_point}"</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <AddInteractionModal
        dealId={dealId}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => fetchDealData()}
      />

      <DealMemoryReplayModal
        dealId={dealId}
        isOpen={isReplayModalOpen}
        onClose={() => setIsReplayModalOpen(false)}
      />
    </div>
  );
}
