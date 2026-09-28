'use client';

import React, { useState, useEffect } from 'react';
import { X, Play, RotateCcw, CheckCircle2, ArrowRight, Brain, Sparkles, ChevronRight } from 'lucide-react';

interface DealMemoryReplayModalProps {
  dealId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DealMemoryReplayModal({ dealId, isOpen, onClose }: DealMemoryReplayModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      step: 1,
      title: "Interaction 01 — Discovery Call",
      date: "Sep 10",
      memoryAdded: "Fleet size 4,200 vehicles; 14% fuel waste pain point identified.",
      impact: "Generic understanding established.",
      color: "border-blue-500/50 bg-blue-950/20 text-blue-300"
    },
    {
      step: 2,
      title: "Interaction 03 — Technical Sandbox Demo",
      date: "Sep 15",
      memoryAdded: "CTO Daniel Brooks evaluated REST API ingestion speed and SOC2 security.",
      impact: "CTO technical objections cleared.",
      color: "border-purple-500/50 bg-purple-950/20 text-purple-300"
    },
    {
      step: 3,
      title: "Interaction 05 — CFO Intro & Price Discount Request",
      date: "Sep 21",
      memoryAdded: "CFO Maya Chen requested 15% discount; initial concessions failed.",
      impact: "Learned: Discounting fails with Maya Chen; value proof required.",
      color: "border-amber-500/50 bg-amber-950/20 text-amber-300"
    },
    {
      step: 4,
      title: "Interaction 07 — Competitor Threat Identified",
      date: "Sep 23",
      memoryAdded: "Salesforce internal build cited as alternative with zero license fee.",
      impact: "Identified need for $450k Total Cost of Ownership (TCO) comparison.",
      color: "border-rose-500/50 bg-rose-950/20 text-rose-300"
    },
    {
      step: 5,
      title: "Interaction 08 — Quantified ROI Breakdown Presentation",
      date: "Sep 24",
      memoryAdded: "Presented $320k annual fuel savings model. CFO Maya Chen shifted to positive sponsor.",
      impact: "ROI messaging completely neutralized pricing objections.",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300"
    },
    {
      step: 6,
      title: "Interaction 10 — Procurement Milestone Alignment",
      date: "Sep 28",
      memoryAdded: "Alex Morgan from Procurement reviewing Net-45 milestone billing.",
      impact: "Final recommendation generated: Lead closing call with board ROI deck & milestone terms.",
      color: "border-cyan-500/50 bg-cyan-950/20 text-cyan-300"
    }
  ];

  useEffect(() => {
    let timer: any;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 2000);
    } else if (currentStep === steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-3xl bg-slate-900 border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden glass-card">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Brain className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>DEAL MEMORY REPLAY</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300">
                  Hindsight Progression
                </span>
              </h3>
              <p className="text-xs text-slate-400">Watch how historical deal memories accumulated to shape the Next Best Action</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Replay Controls & Body */}
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isPlaying ? 'Pause Replay' : 'Play Animated Journey'}</span>
              </button>
              <button
                onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="flex items-center gap-1 font-mono text-xs text-slate-400">
              Step <span className="text-indigo-400 font-bold">{currentStep + 1}</span> of {steps.length}
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-6 gap-2">
            {steps.map((st, idx) => (
              <button
                key={idx}
                onClick={() => { setCurrentStep(idx); setIsPlaying(false); }}
                className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                  idx === currentStep
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/30'
                    : idx < currentStep
                    ? 'bg-slate-800 text-indigo-300 border-slate-700'
                    : 'bg-slate-950 text-slate-500 border-slate-900'
                }`}
              >
                Int #{st.step}
              </button>
            ))}
          </div>

          {/* Active Replay Step Highlight */}
          <div className={`p-6 rounded-2xl border ${steps[currentStep].color} transition-all duration-300 space-y-3`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700 text-slate-300">
                {steps[currentStep].date}
              </span>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Memory Retained
              </span>
            </div>

            <h4 className="text-lg font-extrabold text-white">
              {steps[currentStep].title}
            </h4>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
              <div className="text-xs text-slate-300">
                <strong className="text-indigo-400">What Happened: </strong>
                {steps[currentStep].memoryAdded}
              </div>
              <div className="text-xs text-emerald-300">
                <strong className="text-emerald-400">Agent Insight: </strong>
                {steps[currentStep].impact}
              </div>
            </div>
          </div>

          {/* Progression Summary Footer */}
          {currentStep === steps.length - 1 && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 border border-emerald-500/40 text-center animate-fadeIn">
              <div className="flex items-center justify-center gap-2 text-emerald-300 font-extrabold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>10 interactions transformed into one intelligent recommendation.</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                "Your CRM remembers records. DealMind remembers relationships."
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
