'use client';

import React from 'react';
import { ArrowDown, Cpu, Database, Sparkles, Brain, CheckCircle2 } from 'lucide-react';

export default function ArchitectureDiagram() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass-card rounded-2xl border border-indigo-500/20 shadow-2xl relative overflow-hidden my-8">
      <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-indigo-400 bg-indigo-500/10 rounded-bl-xl border-l border-b border-indigo-500/20 flex items-center gap-1.5">
        <Sparkles className="w-3 h-3 text-indigo-400" />
        SYSTEM ARCHITECTURE FLOW
      </div>

      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
          <Brain className="w-5 h-5 text-indigo-400" />
          DealMind End-to-End Intelligence Pipeline
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          How persistent relationship memory transforms raw deal interactions into high-conviction Next Best Actions
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 text-xs font-medium relative">
        {/* Node 1: DEALMIND UI */}
        <div className="w-64 p-3.5 rounded-xl bg-gradient-to-r from-blue-900/80 to-indigo-900/80 border border-blue-400/30 text-center shadow-lg hover:border-blue-400 transition-all group">
          <div className="font-extrabold text-blue-200 tracking-wider text-sm flex items-center justify-center gap-2">
            <span>DEALMIND</span>
          </div>
          <div className="text-[11px] text-blue-300 font-mono mt-0.5">Next.js 14+ / React / Tailwind UI</div>
        </div>

        <ArrowDown className="w-5 h-5 text-indigo-400 animate-bounce" />

        {/* Node 2: Agent Backend */}
        <div className="w-64 p-3.5 rounded-xl bg-slate-900/90 border border-indigo-500/40 text-center shadow-lg hover:border-indigo-400 transition-all">
          <div className="font-bold text-indigo-200 text-sm flex items-center justify-center gap-1.5">
            <Cpu className="w-4 h-4 text-indigo-400" />
            Agent Backend (Azure / Python FastAPI)
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-mono">REST Endpoints & Entity Extraction</div>
        </div>

        <div className="w-full flex items-center justify-center gap-8 my-1">
          <div className="h-6 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500"></div>
          <div className="h-6 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500"></div>
        </div>

        {/* Parallel Node 3 & 4: Azure AI & Hindsight Memory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-blue-500/30 text-left shadow-lg relative group hover:border-blue-400 transition-all">
            <div className="flex items-center gap-2 font-bold text-blue-300 text-xs mb-1">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Microsoft AI / Azure AI Stack
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Generates structured deal assessments, meeting briefs, and reasoning over recalled context.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 text-left shadow-lg relative group hover:border-purple-400 transition-all">
            <div className="flex items-center gap-2 font-bold text-purple-300 text-xs mb-1">
              <Database className="w-4 h-4 text-purple-400" />
              Hindsight Long-Term Memory
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Retains Experience, World/Entity facts, and Observation patterns across deal history.
            </p>
          </div>
        </div>

        <ArrowDown className="w-5 h-5 text-purple-400" />

        {/* Node 5: Deal Intelligence */}
        <div className="w-72 p-3.5 rounded-xl bg-gradient-to-r from-purple-900/70 to-indigo-900/70 border border-purple-400/40 text-center shadow-lg">
          <div className="font-bold text-purple-200 text-xs tracking-wide uppercase">
            Deal Intelligence Engine
          </div>
          <div className="text-[11px] text-purple-300 mt-0.5">
            What Changed • What Worked • What Failed
          </div>
        </div>

        <ArrowDown className="w-5 h-5 text-emerald-400 animate-pulse" />

        {/* Node 6: Next Best Action */}
        <div className="w-80 p-4 rounded-xl bg-gradient-to-r from-emerald-900/80 via-teal-900/80 to-slate-900 border border-emerald-400/50 text-center shadow-xl glow-effect">
          <div className="font-extrabold text-emerald-300 text-sm tracking-wider uppercase flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Next Best Action Output
          </div>
          <p className="text-[11px] text-emerald-100 font-medium mt-1">
            "Lead the conversation with quantified ROI proof instead of opening with another discount."
          </p>
        </div>
      </div>
    </div>
  );
}
