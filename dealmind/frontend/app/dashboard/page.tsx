'use client';

import React from 'react';
import Link from 'next/link';
import {
  Briefcase, TrendingUp, AlertTriangle, HeartPulse,
  Brain, ArrowRight, Clock, Users, ShieldAlert, CheckCircle2, Database
} from 'lucide-react';

export default function DashboardPage() {
  const deals = [
    {
      id: 'nova-fleet-185k',
      company: 'NovaFleet Technologies',
      name: 'Enterprise Fleet Intelligence Platform',
      arr: '$185,000',
      stage: 'Negotiation',
      health: 78,
      status: 'active',
      memoryCount: 127,
      lastInteraction: 'Sep 28 — Executive Alignment'
    },
    {
      id: 'apex-logistics',
      company: 'Apex Global Logistics',
      name: 'Automated Routing Engine',
      arr: '$120,000',
      stage: 'Discovery',
      health: 64,
      status: 'at_risk',
      memoryCount: 34,
      lastInteraction: 'Sep 22 — Pricing Discussion'
    },
    {
      id: 'vanguard-trans',
      company: 'Vanguard Transports',
      name: 'Telematics Edge Node Upgrade',
      arr: '$95,000',
      stage: 'Demo',
      health: 88,
      status: 'active',
      memoryCount: 52,
      lastInteraction: 'Sep 25 — Technical Architecture'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Sales Executive Dashboard</h1>
          <p className="text-xs text-slate-400">Persistent Hindsight memory active across 3 enterprise pipeline deals</p>
        </div>
        <Link
          href="/deals/nova-fleet-185k"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all"
        >
          <Brain className="w-4 h-4" />
          <span>Open NovaFleet Deal Workspace ($185k)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Top 4 Dashboard Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-blue-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Active Deals</span>
            <Briefcase className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">3</div>
          <p className="text-[11px] text-blue-300">All memory banks active</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-indigo-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Pipeline Value</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-indigo-300">$400,000</div>
          <p className="text-[11px] text-slate-400">Weighted ARR pipeline</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-rose-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>At-Risk Deals</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-rose-400">1</div>
          <p className="text-[11px] text-rose-300">Apex Global Logistics (Pricing objection)</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Average Deal Health</span>
            <HeartPulse className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-300">77 / 100</div>
          <p className="text-[11px] text-emerald-400 font-medium">+5 pts after ROI presentation</p>
        </div>
      </div>

      {/* Memory Intelligence Summary Widget (Section 10 requirement) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 glass-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h3 className="text-base font-bold text-white">Memory Intelligence Engine</h3>
          </div>
          <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
            HINDSIGHT LIVE
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-xl font-black text-indigo-400">21</div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">Interactions Remembered</div>
            <div className="text-[10px] text-slate-400 mt-1">Full transcript history retained</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-xl font-black text-rose-400">8</div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">Objections Tracked</div>
            <div className="text-[10px] text-slate-400 mt-1">Pricing, API, Contract terms</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-xl font-black text-purple-400">12</div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">Stakeholders Understood</div>
            <div className="text-[10px] text-slate-400 mt-1">CFO, CTO, Procurement profiles</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-xl font-black text-emerald-400">15</div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">Successful Tactics Learned</div>
            <div className="text-[10px] text-slate-400 mt-1">Quantified ROI & API sandbox</div>
          </div>
        </div>
      </div>

      {/* Main Deals Table */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Active Enterprise Deals</h3>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden glass-card">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Company & Deal</th>
                <th className="px-6 py-3.5">Value (ARR)</th>
                <th className="px-6 py-3.5">Stage</th>
                <th className="px-6 py-3.5">Health Score</th>
                <th className="px-6 py-3.5">Memory Bank</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white text-sm">{deal.company}</div>
                    <div className="text-xs text-slate-400">{deal.name}</div>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-indigo-300">{deal.arr}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[11px] font-semibold">
                      {deal.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${deal.health > 75 ? 'bg-emerald-400' : 'bg-rose-400'}`}
                          style={{ width: `${deal.health}%` }}
                        ></div>
                      </div>
                      <span className="font-mono font-bold text-white">{deal.health}/100</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-purple-400 font-medium">
                      <Database className="w-3.5 h-3.5" />
                      <span>{deal.memoryCount} memories</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/deals/${deal.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white font-semibold transition-all"
                    >
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
