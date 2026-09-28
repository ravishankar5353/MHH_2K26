'use client';

import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, Brain, CheckCircle2 } from 'lucide-react';

export default function LearningCurveChart() {
  const data = [
    { name: 'Int #1', intelligence: 20, level: 'Basic Context', desc: 'Recorded fleet count & deal value' },
    { name: 'Int #3', intelligence: 45, level: 'Objection Awareness', desc: 'Identified CTO security & API concerns' },
    { name: 'Int #5', intelligence: 65, level: 'Stakeholder Priorities', desc: 'Captured CFO Maya Chen financial criteria' },
    { name: 'Int #7', intelligence: 82, level: 'Tactic Effectiveness', desc: 'Learned price discounts fail; ROI works' },
    { name: 'Int #10', intelligence: 98, level: 'Personalized Strategy', desc: 'Generated Next Best Action strategy' }
  ];

  return (
    <div className="p-6 rounded-2xl glass-card border border-indigo-500/20 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" />
            HOW DEALMIND LEARNED
          </h3>
          <p className="text-xs text-slate-400">
            Agent recommendation conviction increases as Hindsight memory accumulates
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>98% Conviction</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="learningGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              formatter={(val: any) => [`${val}% Recommendation Quality`, 'Memory Intelligence']}
            />
            <Area type="monotone" dataKey="intelligence" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#learningGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Learning Progression Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 pt-2 border-t border-slate-800">
        {data.map((item, idx) => (
          <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/30 transition-all">
            <div className="text-[10px] font-mono text-indigo-400 font-bold">{item.name}</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">{item.level}</div>
            <div className="text-[11px] text-slate-400 mt-1 leading-tight">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
