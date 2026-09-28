'use client';

import React from 'react';
import Link from 'next/link';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import LearningCurveChart from '@/components/LearningCurveChart';
import {
  Brain, Sparkles, ArrowRight, CheckCircle2, ShieldAlert,
  Zap, Database, TrendingUp, Briefcase, FileText, Play, Layers
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 px-6">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 shadow-lg">
            <Brain className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-xs font-semibold text-indigo-300">
              Hindsight Memory-Powered Sales Intelligence
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Every conversation remembered. <br />
            <span className="gradient-text">Every deal smarter.</span>
          </h1>

          <p className="text-lg md:text-xl font-medium text-indigo-200/90 max-w-3xl mx-auto">
            “Your CRM remembers records. DealMind remembers relationships.”
          </p>

          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Most AI sales assistants have amnesia—they summarize single calls but forget the evolving relationship behind the deal. DealMind retains complete deal history using <strong>Hindsight long-term memory</strong> to deliver evidence-backed Next Best Actions.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/deals/nova-fleet-185k"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>LOAD DEMO DEAL (NovaFleet $185k)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 hover:border-slate-600 transition-all"
            >
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>Explore Dashboard</span>
            </Link>
            <Link
              href="/deals/nova-fleet-185k/memory"
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 hover:border-slate-600 transition-all"
            >
              <Database className="w-4 h-4 text-purple-400" />
              <span>View Memory Explorer</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-2xl font-extrabold text-white">10</div>
              <div className="text-xs text-slate-400 mt-0.5">Historical Interactions</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-2xl font-extrabold text-emerald-400">89%</div>
              <div className="text-xs text-slate-400 mt-0.5">ROI Response Effectiveness</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-2xl font-extrabold text-indigo-400">127</div>
              <div className="text-xs text-slate-400 mt-0.5">Hindsight Memory Entries</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-2xl font-extrabold text-cyan-400">78 / 100</div>
              <div className="text-xs text-slate-400 mt-0.5">Deal Health Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture Section */}
      <section className="max-w-6xl mx-auto px-6">
        <ArchitectureDiagram />
      </section>

      {/* Progression Story Section */}
      <section className="max-w-5xl mx-auto px-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">The Core Hackathon Story</h2>
          <p className="text-xs text-slate-400 mt-1">
            How DealMind gets visibly smarter as interactions build over time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { step: 'Int #1', title: 'Generic Understanding', desc: 'Captures basic fleet size and raw deal requirements.' },
            { step: 'Int #3', title: 'Objection Awareness', desc: 'Remembers CTO security and API latency concerns.' },
            { step: 'Int #5', title: 'Stakeholder Priorities', desc: 'Understands CFO Maya Chen requires financial ROI proof.' },
            { step: 'Int #7', title: 'Tactical Learning', desc: 'Discovers discounting fails; value-backed ROI models work.' },
            { step: 'Int #10', title: 'Personalized Strategy', desc: 'Generates tailored closing strategy for Procurement & CFO.' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl glass-card border border-indigo-500/20 space-y-2 relative">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                0{idx + 1}
              </div>
              <h4 className="text-xs font-bold text-indigo-300">{item.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Curve Chart */}
      <section className="max-w-5xl mx-auto px-6">
        <LearningCurveChart />
      </section>

      {/* Memory Types Breakdown */}
      <section className="max-w-5xl mx-auto px-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Three Memory Dimensions</h2>
          <p className="text-xs text-slate-400 mt-1">
            Categorized memory representation for transparent AI reasoning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-card border border-blue-500/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Experience Memory</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Chronological log of what happened, what was said, actions taken, and immediate outcomes across meetings.
            </p>
            <div className="text-[11px] text-blue-300 font-mono bg-blue-950/40 p-2 rounded-lg">
              e.g., "Sep 24: Presented $320k ROI model to CFO."
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-purple-500/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">World / Entity Memory</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Persistent facts regarding stakeholder roles, buying criteria, competitor threats, and company specs.
            </p>
            <div className="text-[11px] text-purple-300 font-mono bg-purple-950/40 p-2 rounded-lg">
              e.g., "Maya Chen (CFO) priorities: EBITDA & ROI."
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-emerald-500/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Observation / Pattern</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthesized learnings on what approaches succeeded, what failed, recurring objections, and deal risks.
            </p>
            <div className="text-[11px] text-emerald-300 font-mono bg-emerald-950/40 p-2 rounded-lg">
              e.g., "Price discounting failed on Sep 21."
            </div>
          </div>
        </div>
      </section>

      {/* Demo Call to Action Banner */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900/90 via-blue-900/90 to-purple-900/90 border border-indigo-400/30 text-center space-y-4 shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl font-bold text-white">Ready to see memory-powered sales in action?</h2>
          <p className="text-xs text-indigo-200 max-w-xl mx-auto">
            Launch the pre-seeded NovaFleet Technologies deal workspace with 10 historical interactions, stakeholder matrix, objection tracker, and meeting prep generator.
          </p>
          <div className="pt-2">
            <Link
              href="/deals/nova-fleet-185k"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-950 font-extrabold text-sm hover:bg-indigo-50 shadow-lg transition-all"
            >
              <span>LAUNCH DEMO DEAL NOW</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
