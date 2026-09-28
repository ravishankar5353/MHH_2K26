'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Database, Search, Filter, Brain, Layers, Users, ShieldAlert,
  Target, TrendingUp, ArrowLeft, Clock, Sparkles
} from 'lucide-react';

export default function MemoryExplorerPage({ params }: { params: { id: string } }) {
  const dealId = params.id || 'nova-fleet-185k';
  const [memories, setMemories] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemories();
  }, [dealId]);

  const fetchMemories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/deals/${dealId}/memory`);
      if (res.ok) {
        const data = await res.json();
        setMemories(data.events || []);
      }
    } catch (e) {
      console.error(e);
      // Fallback data
      setMemories([
        { id: 'm1', memory_type: 'Experience', summary: 'Sep 10: Discovery call established fleet size (4,200 vehicles) and 14% fuel inefficiency.', importance: 'Medium', created_at: '2026-09-10' },
        { id: 'm2', memory_type: 'World/Entity', summary: 'Sep 12: Identified CTO Daniel Brooks as key decision maker focused on API latency & SOC2.', importance: 'High', created_at: '2026-09-12' },
        { id: 'm3', memory_type: 'Observation/Pattern', summary: 'Sep 15: Demonstrating live REST API sandbox payload successfully cleared technical objections.', importance: 'High', created_at: '2026-09-15' },
        { id: 'm4', memory_type: 'World/Entity', summary: 'Sep 18: Identified CFO Maya Chen as financial authority requiring quantifiable EBITDA payback proof.', importance: 'High', created_at: '2026-09-18' },
        { id: 'm5', memory_type: 'Observation/Pattern', summary: 'Sep 21: Standard price discounting failed with CFO Maya Chen; she requires financial value modeling.', importance: 'High', created_at: '2026-09-21' },
        { id: 'm6', memory_type: 'World/Entity', summary: 'Sep 23: Salesforce internal custom build identified as main competitive threat due to zero license cost.', importance: 'High', created_at: '2026-09-23' },
        { id: 'm7', memory_type: 'Observation/Pattern', summary: 'Sep 24: Quantified ROI breakdown ($320k savings) converted CFO Maya Chen from skeptic to deal sponsor.', importance: 'High', created_at: '2026-09-24' },
        { id: 'm8', memory_type: 'World/Entity', summary: 'Sep 26: Alex Morgan from Procurement introduced Net-45 payment terms and SLA focus.', importance: 'Medium', created_at: '2026-09-26' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredMemories = memories.filter((mem) => {
    const matchesSearch = mem.summary.toLowerCase().includes(search.toLowerCase());
    if (filter === 'All') return matchesSearch;
    if (filter === 'Experiences') return matchesSearch && mem.memory_type === 'Experience';
    if (filter === 'People') return matchesSearch && (mem.memory_type === 'World/Entity' || mem.summary.includes('CFO') || mem.summary.includes('CTO'));
    if (filter === 'Objections') return matchesSearch && (mem.summary.toLowerCase().includes('objection') || mem.summary.toLowerCase().includes('discount') || mem.summary.toLowerCase().includes('pricing'));
    if (filter === 'Competitors') return matchesSearch && mem.summary.toLowerCase().includes('salesforce');
    if (filter === 'Patterns') return matchesSearch && mem.memory_type === 'Observation/Pattern';
    return matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
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
            <Database className="w-6 h-6 text-purple-400" />
            Hindsight Memory Explorer
          </h1>
          <p className="text-xs text-slate-400">
            Search and inspect persistent long-term deal memories retained for NovaFleet Technologies
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Total Memories</div>
            <div className="text-lg font-extrabold text-indigo-300 font-mono">127</div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Learned Patterns</div>
            <div className="text-lg font-extrabold text-emerald-400 font-mono">15</div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search memory contents (e.g. Maya Chen, ROI, Salesforce, pricing)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {['All', 'Experiences', 'People', 'Objections', 'Competitors', 'Patterns'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filter === cat
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Memory List Cards */}
      <div className="space-y-4">
        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
          Showing {filteredMemories.length} Memory Entries
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredMemories.map((mem, idx) => (
            <div
              key={mem.id || idx}
              className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-indigo-500/30 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                    mem.memory_type === 'Experience'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : mem.memory_type === 'World/Entity'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {mem.memory_type}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {mem.created_at ? new Date(mem.created_at).toLocaleDateString() : 'Sep 2026'}
                  </span>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                  Importance: {mem.importance || 'High'}
                </span>
              </div>

              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                {mem.summary}
              </p>

              <div className="text-[11px] text-slate-500 font-mono pt-1">
                Bank ID: deal_{dealId} • Reference: {mem.hindsight_reference || `mem_ref_${idx + 101}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
