'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, ArrowRight, Database, TrendingUp, Search, Plus } from 'lucide-react';

export default function DealsListPage() {
  const deals = [
    {
      id: 'nova-fleet-185k',
      company: 'NovaFleet Technologies',
      name: 'Enterprise Fleet Intelligence Platform',
      arr: '$185,000',
      stage: 'Negotiation',
      health: 78,
      status: 'active',
      memoryCount: 127
    },
    {
      id: 'apex-logistics',
      company: 'Apex Global Logistics',
      name: 'Automated Routing Engine',
      arr: '$120,000',
      stage: 'Discovery',
      health: 64,
      status: 'at_risk',
      memoryCount: 34
    },
    {
      id: 'vanguard-trans',
      company: 'Vanguard Transports',
      name: 'Telematics Edge Node Upgrade',
      arr: '$95,000',
      stage: 'Demo',
      health: 88,
      status: 'active',
      memoryCount: 52
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">All Enterprise Deals</h1>
          <p className="text-xs text-slate-400">Manage pipeline deals with persistent Hindsight relationship memory</p>
        </div>
        <Link
          href="/deals/nova-fleet-185k"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all"
        >
          <Briefcase className="w-4 h-4" />
          <span>Open NovaFleet Hackathon Demo Deal</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div key={deal.id} className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4 hover:border-indigo-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold">
                {deal.stage}
              </span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{deal.arr} ARR</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">{deal.company}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{deal.name}</p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-purple-400">
                <Database className="w-3.5 h-3.5" />
                <span>{deal.memoryCount} memories</span>
              </div>
              <span className="font-mono font-bold text-slate-200">Health: {deal.health}/100</span>
            </div>

            <Link
              href={`/deals/${deal.id}`}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-slate-200 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Open Deal Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
