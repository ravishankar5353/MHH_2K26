'use client';

import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';

export default function MemoryStatusBadge() {
  const [status, setStatus] = useState({
    status: 'Connected (Hindsight Memory Active)',
    is_demo_mode: true,
    total_memories: 127,
    last_updated: 'Just now'
  });

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/memory-status');
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch (e) {
      // Keep default status gracefully
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-xs shadow-inner">
      <div className="relative flex items-center justify-center">
        <Brain className="w-3.5 h-3.5 text-indigo-400 animate-pulse-subtle" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500"></span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-slate-200">HINDSIGHT MEMORY</span>
        <span className="text-slate-500">•</span>
        <span className="text-emerald-400 font-semibold">{status.total_memories} memories</span>
        {status.is_demo_mode && (
          <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono uppercase tracking-wider">
            DEMO MEMORY
          </span>
        )}
      </div>
    </div>
  );
}
