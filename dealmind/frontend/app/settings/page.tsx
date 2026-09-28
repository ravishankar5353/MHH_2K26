'use client';

import React, { useState } from 'react';
import { Settings, Brain, Key, Database, Cpu, CheckCircle2, RefreshCw } from 'lucide-react';

export default function SettingsPage() {
  const [hindsightUrl, setHindsightUrl] = useState('https://api.hindsight.ai/v1');
  const [hindsightKey, setHindsightKey] = useState('hs_live_****************');
  const [geminiKey, setGeminiKey] = useState('AIzaSy****************');
  const [model, setModel] = useState('gemini-1.5-pro');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Environment settings updated successfully.');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-400" />
          DealMind System Settings
        </h1>
        <p className="text-xs text-slate-400">Configure Hindsight Memory service and AI reasoning providers</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hindsight Memory Settings */}
        <div className="p-6 rounded-2xl glass-card border border-indigo-500/30 space-y-4">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
            <Brain className="w-5 h-5 text-indigo-400" />
            Hindsight Long-Term Memory Service
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">HINDSIGHT_BASE_URL</label>
              <input
                type="text"
                value={hindsightUrl}
                onChange={(e) => setHindsightUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">HINDSIGHT_API_KEY</label>
              <input
                type="password"
                value={hindsightKey}
                onChange={(e) => setHindsightKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-200"
              />
            </div>
          </div>
        </div>

        {/* AI Model Settings */}
        <div className="p-6 rounded-2xl glass-card border border-purple-500/30 space-y-4">
          <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
            <Cpu className="w-5 h-5 text-purple-400" />
            AI LLM Reasoning Engine (Gemini / Azure / OpenAI)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GEMINI_API_KEY / AZURE_KEY</label>
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">LLM_MODEL</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200"
              >
                <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                <option value="gpt-4o">Azure OpenAI GPT-4o</option>
                <option value="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all"
        >
          Save Configuration
        </button>
      </form>
    </div>
  );
}
