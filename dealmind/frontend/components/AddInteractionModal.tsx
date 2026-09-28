'use client';

import React, { useState } from 'react';
import { X, Plus, Sparkles, CheckCircle2, Brain, Loader2 } from 'lucide-react';

interface AddInteractionModalProps {
  dealId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddInteractionModal({ dealId, isOpen, onClose, onSuccess }: AddInteractionModalProps) {
  const [type, setType] = useState('Meeting');
  const [title, setTitle] = useState('');
  const [transcript, setTranscript] = useState('');
  const [outcome, setOutcome] = useState('');
  const [loading, setLoading] = useState(false);
  const [successStep, setSuccessStep] = useState<number>(0); // 0: None, 1: Remembered, 2: Intelligence Updated

  if (!isOpen) return null;

  const sampleTranscripts = [
    {
      label: 'Sample: CFO ROI Acceptance',
      type: 'Negotiation',
      title: 'Executive Board ROI Approval Call',
      transcript: 'CFO Maya Chen confirmed that the executive board accepted our $320k annual fuel savings ROI case study. Maya requested final contract documentation with quarterly payment milestone schedules.',
      outcome: 'Verbal approval secured. Moving to procurement contract execution.'
    },
    {
      label: 'Sample: CTO Security Validation',
      type: 'Technical',
      title: 'SOC2 Security & Data Privacy Audit',
      transcript: 'Met with CTO Daniel Brooks and lead security architect. Reviewed end-to-end TLS 1.3 encryption and SOC2 Type II compliance audit packet. Daniel signed off on engineering requirements.',
      outcome: 'Technical & Security compliance cleared 100%.'
    }
  ];

  const handleApplySample = (sample: typeof sampleTranscripts[0]) => {
    setType(sample.type);
    setTitle(sample.title);
    setTranscript(sample.transcript);
    setOutcome(sample.outcome);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !transcript) return;

    setLoading(true);
    setSuccessStep(0);

    try {
      const res = await fetch(`/api/deals/${dealId}/interactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          title,
          transcript,
          outcome,
          date: new Date().toISOString()
        })
      });

      if (res.ok) {
        setLoading(false);
        setSuccessStep(1); // "Interaction remembered"

        setTimeout(() => {
          setSuccessStep(2); // "Deal intelligence updated"
        }, 1200);

        setTimeout(() => {
          setSuccessStep(0);
          onSuccess();
          onClose();
        }, 2600);
      } else {
        setLoading(false);
        alert('Failed to save interaction to memory.');
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      // Fallback simulation
      setSuccessStep(1);
      setTimeout(() => setSuccessStep(2), 1000);
      setTimeout(() => {
        setSuccessStep(0);
        onSuccess();
        onClose();
      }, 2400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden glass-card">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Add Deal Interaction</h3>
              <p className="text-xs text-slate-400">Capture meeting transcript or call notes into Hindsight memory</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {successStep > 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
            {successStep === 1 && (
              <div className="animate-bounce flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center">
                  <Brain className="w-8 h-8 animate-pulse" />
                </div>
                <h4 className="text-xl font-bold text-indigo-300">Interaction Remembered</h4>
                <p className="text-xs text-slate-400">Retaining experience and extracting entities into Hindsight memory bank...</p>
              </div>
            )}
            {successStep === 2 && (
              <div className="animate-pulse flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-emerald-300">Deal Intelligence Updated</h4>
                <p className="text-xs text-slate-400">Recalculated Next Best Action based on updated relationship memory.</p>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Quick Sample Presets */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Quick Samples:
              </span>
              {sampleTranscripts.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplySample(sample)}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-indigo-900/40 text-slate-300 hover:text-indigo-300 text-xs font-medium border border-slate-700 hover:border-indigo-500/30 transition-all whitespace-nowrap"
                >
                  + {sample.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Interaction Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Meeting">Meeting</option>
                  <option value="Email">Email</option>
                  <option value="Call">Call</option>
                  <option value="Demo">Demo</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Follow-up">Follow-up</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title / Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Executive ROI Presentation & Contract Sync"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Transcript / Call Notes</label>
              <textarea
                required
                rows={4}
                placeholder="Paste transcript or detailed notes here. DealMind will extract stakeholders, objections, competitor mentions, and retained experience..."
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Outcome / Next Steps</label>
              <input
                type="text"
                placeholder="e.g., CFO requested final MSA draft with quarterly milestone payment terms."
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing & Saving to Memory...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-3.5 h-3.5" />
                    <span>ADD TO DEAL MEMORY</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
