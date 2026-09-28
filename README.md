# 🧠 DealMind — Persistent Memory-Powered Sales Deal Intelligence Agent

> **"Every conversation remembered. Every deal smarter."**  
> *“Your CRM remembers records. DealMind remembers relationships.”*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-brightgreen?style=for-the-badge&logo=vercel)](https://frontend-liard-ten-36.vercel.app)
[![Hackathon](https://img.shields.io/badge/Hackathon-Vectorize%20Hindsight%20AI%20Agents-blue?style=for-the-badge)](https://hindsight.vectorize.io/)
[![Tech Stack](https://img.shields.io/badge/Next.js%2014-FastAPI-purple?style=for-the-badge)](https://nextjs.org/)

---

## 🌐 Quick Links

* 🚀 **Live Production App:** [https://frontend-liard-ten-36.vercel.app](https://frontend-liard-ten-36.vercel.app)
* 📖 **FastAPI Swagger API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs) *(when running locally)*
* 🎬 **Demo Walkthrough Guide:** [`dealmind/DEMO.md`](file:///c:/Users/raviy/OneDrive/Desktop/MHH/dealmind/DEMO.md)

---

## 📌 Problem Statement & Hackathon Alignment

In enterprise sales, representatives interact with prospects across dozens of touchpoints—discovery calls, technical demos, pricing negotiations, and executive follow-ups. Important context gets fragmented across scattered CRM notes:
* Stakeholder priorities & hidden objections
* Competitor threats mentioned in passing
* Commercial terms & discount requests
* What messaging resonated vs. what failed

Standard AI sales assistants suffer from **AI amnesia**: they can summarize a single call transcript, but fail to remember the evolving relationship across the deal cycle.

### **The DealMind Solution**
Built for the **Vectorize Hindsight AI Agents Hackathon** (*Category: Sales & Revenue - Deal Intelligence Agent*), **DealMind** leverages **Hindsight Long-term Memory** (`bank_id: deal_<deal_id>`) to remember every interaction. Before every call or recommendation, DealMind recalls historical experiences, entity facts, and learned observation patterns to guide reps toward closing deals faster.

---

## 🌟 Key Features

* 💼 **Deal Workspace (`/deals/nova-fleet-185k`)**: Centralized command center with real-time **AI Deal Intelligence** & **Next Best Action** recommendations.
* 💬 **Ask DealMind AI Chat Assistant**: Interactive, context-aware conversational agent that queries the deal's Hindsight memory bank in real time.
* 🎬 **Deal Memory Replay Timeline**: Signature feature animating the 6-step memory evolution journey across 10 raw interactions.
* 📈 **Learning Curve Visualization**: Dynamic graph tracking AI recommendation conviction from Interaction #1 (generic) to #10 (personalized).
* 📝 **AI Meeting Prep Generator**: Generates 30-Second Executive Briefs, active objections, strategy, smart questions, and tailored openings.
* 🔍 **Memory Explorer**: Searchable memory bank categorized into **Experience**, **World/Entity facts**, and **Observation patterns**.
* 📥 **Live Interaction Capture**: Real-time transcript processing that retains new memories into Hindsight and updates deal intelligence live.

---

## 🧬 How Hindsight Memory is Leveraged

DealMind integrates directly with Vectorize Hindsight API mechanisms:

```
Interaction Transcript ➔ Extract ➔ Retain (Hindsight Bank) ➔ Recall ➔ Reason (LLM) ➔ Recommend ➔ Learn
```

1. `retain`: Analyzes call transcripts and saves structured **Experience** memories, **World/Entity** facts (e.g., CFO Maya Chen cares about EBITDA ROI), and **Observation** patterns.
2. `recall`: Queries top-K relevant memories prior to generating meeting briefs or Next Best Action recommendations.
3. `reflect`: Synthesizes accumulated deal history to detect emerging risks (e.g., price discounting failed on Sep 21, but ROI modeling succeeded on Sep 24).

---

## 🏗️ System Architecture

```
                                  DEALMIND
                                     │
                           ┌─────────▼─────────┐
                           │   Next.js / UI    │
                           │  (Vercel App)     │
                           └─────────┬─────────┘
                                     │ Next.js /api Proxy
                           ┌─────────▼─────────┐
                           │   Agent Backend   │
                           │ (FastAPI Server)  │
                           └────┬────────┬─────┘
                                │        │
                        ┌───────▼───┐ ┌──▼─────────┐
                        │ Gemini /  │ │ Hindsight  │
                        │ Azure AI  │ │ Long-term  │
                        │ Stack     │ │ Memory     │
                        └───────┬───┘ └──┬─────────┘
                                │        │
                                └────┬───┘
                                     ▼
                              Deal Intelligence
                                     │
                                     ▼
                              Next Best Action
```

---

## 📁 Repository Structure

```
MHH_2K26/
├── dealmind/
│   ├── backend/                   # Python FastAPI Backend
│   │   ├── app/
│   │   │   ├── api/               # REST API Endpoints (/api/deals, /api/chat, etc.)
│   │   │   ├── memory/            # Hindsight Engine & In-memory Store
│   │   │   ├── services/          # LLM Service (Gemini / Azure / OpenAI)
│   │   │   └── main.py            # FastAPI Server Entrypoint
│   │   ├── Dockerfile             # Container image configuration
│   │   ├── Procfile               # Production execution specification
│   │   └── requirements.txt       # Python dependencies
│   ├── frontend/                  # Next.js 14 App Router Frontend
│   │   ├── app/                   # Page Routes (Landing, Deals, Memory, Replay)
│   │   ├── components/            # React Components (AskDealMindChat, ReplayModal, etc.)
│   │   ├── package.json           # Frontend dependencies
│   │   └── next.config.js         # Next.js configuration & API rewrites
│   ├── DEMO.md                    # 3-5 Minute Hackathon Demo Script
│   ├── dev.js                     # One-command concurrent dev script
│   └── render.yaml                # Render cloud deployment config
├── package.json                   # Root package manager configuration
└── README.md                      # Primary project documentation
```

---

## 🚀 Local Development Setup

### Prerequisites
* Node.js v18+
* Python 3.10+

### Quick Start (One Command)
1. **Clone the repository:**
   ```bash
   git clone https://github.com/ravishankar5353/MHH_2K26.git
   cd MHH_2K26
   ```

2. **Install & Run Dev Server:**
   ```bash
   npm install
   npm run dev
   ```

Running `npm run dev` automatically starts both services concurrently:
* 🌐 **Frontend**: `http://localhost:3000`
* ⚡ **Backend**: `http://localhost:8000`
* 📚 **API Documentation**: `http://localhost:8000/docs`

---

## 📄 License & Credits
Built for the **Vectorize Hindsight AI Agents Hackathon**. Powered by [Vectorize Hindsight](https://hindsight.vectorize.io/).
