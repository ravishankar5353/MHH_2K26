# DEALMIND

> **"Every conversation remembered. Every deal smarter."**
> 
> *“Your CRM remembers records. DealMind remembers relationships.”*

DealMind is a persistent memory-powered **Sales Deal Intelligence Agent** built for enterprise sales teams. Powered by **Hindsight long-term memory**, DealMind ensures that every phone call, demo, pricing discussion, objection, and stakeholder commitment is retained and recalled to shape future recommendations.

---

## 🚀 One-Command Local Development

You only need **ONE URL** to run and explore DealMind:
👉 **[http://localhost:3000](http://localhost:3000)**

### Quick Start:
```bash
npm run dev
```

Running `npm run dev` in the root folder automatically launches:
1. **Next.js Frontend**: `http://localhost:3000`
2. **FastAPI Backend (Internal)**: `http://localhost:8000`
3. **Swagger API Documentation**: `http://localhost:8000/docs`

> 💡 **Next.js API Proxy**: Next.js automatically rewrites all `/api/*` frontend requests (such as `/api/health`, `/api/deals`, `/api/deals/123/meeting-prep`) to the internal FastAPI backend running on port 8000. You do **not** need to open port 8000 manually for normal usage.

---

## 1. Problem
Sales representatives interact with prospects across dozens of touchpoints—discovery calls, technical demos, pricing negotiations, and follow-ups. Important context gets fragmented across scattered CRM notes:
- Stakeholder priorities & hidden objections
- Competitor threats mentioned in passing
- Commercial terms & discount requests
- What messaging resonated vs. what failed

Standard AI sales assistants suffer from **amnesia**: they can summarize individual transcripts, but fail to remember the evolving relationship behind the deal.

---

## 2. Solution
DealMind uses **Hindsight memory** as a persistent long-term relationship memory bank (`bank_id: deal_<deal_id>`). Before every interaction, DealMind recalls historical experiences, entity facts, and learned observation patterns to generate:
- **30-Second Executive Briefs**
- **Next Best Action Recommendations** (with traceable memory evidence)
- **Stakeholder Sentiment & Priority Matrix**
- **Objection Response Effectiveness**
- **Deal Memory Replays**

---

## 3. Why Memory Matters
Persistent memory fundamentally changes sales recommendations. 
For example:
- **Interaction #1**: Captures basic fleet size (4,200 vehicles) and generic requirements.
- **Interaction #3**: Remembers CTO security and API latency concerns.
- **Interaction #5**: Identifies CFO Maya Chen as the primary financial authority.
- **Interaction #7**: Learns that upfront price discounting *failed* on Sep 21, but quantified ROI models *succeeded* on Sep 24.
- **Interaction #10**: Synthesizes 10 accumulated deal memories into a highly personalized closing strategy.

---

## 4. How Hindsight Is Used
DealMind leverages Hindsight's core capabilities:
- `retain`: Analyzes transcripts and retains structured Experience, World/Entity facts, and Observation patterns.
- `recall`: Retrieves top-K relevant memories prior to generating meeting prep or Next Best Actions.
- `reflect`: Synthesizes accumulated deal history to detect emerging risks and effective sales tactics.

### Hindsight Pipeline Flow
```
Interaction → Extract → Retain → Recall → Reason → Recommend → Learn
```

---

## 5. System Architecture
```
                    DEALMIND
                       │
             ┌─────────▼─────────┐
             │   Next.js / UI    │
             │ (localhost:3000)  │
             └─────────┬─────────┘
                       │ Next.js /api Proxy
             ┌─────────▼─────────┐
             │   Agent Backend   │
             │ (localhost:8000)  │
             └────┬────────┬─────┘
                  │        │
          ┌───────▼───┐ ┌──▼─────────┐
          │ Microsoft │ │ Hindsight  │
          │ AI / Azure│ │ Long-term  │
          │ AI stack  │ │ Memory     │
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

## 6. Features
- 🚀 **Interactive Hero Landing Page (`http://localhost:3000`)**: Architecture flow, memory progression story, and instant demo deal launch.
- 📊 **Executive SaaS Dashboard**: Active pipeline ARR, At-Risk deals, deal health scores, and Memory Intelligence metrics.
- 💼 **Deal Workspace (`/deals/nova-fleet-185k`)**: Centralized deal command center with AI Deal Intelligence & Next Best Action.
- ⚡ **Next Best Action Card**: Large card with evidence-backed reasoning and clickable memory chips (`Sep 10 Pricing`, `Sep 24 ROI`).
- 🎬 **Deal Memory Replay**: Signature hackathon feature animating the 6-step memory evolution journey.
- 📈 **Learning Curve Visualization**: Graph tracking recommendation conviction from Interaction #1 to #10.
- 📝 **AI Meeting Prep Generator**: 30-second brief, who matters, active objections, strategy, smart questions, and suggested openings.
- 🔍 **Memory Explorer**: Searchable memory bank filtered by Experience, Entity, and Pattern observations.
- 💬 **Ask DealMind Chat Assistant**: Secondary context-aware conversational assistant querying deal memory.
- 📥 **Interaction Capture**: Real-time transcript processing that retains memories and updates intelligence live.

---

## 7. Tech Stack
- **Frontend**: Next.js 14+ (App Router), React, TypeScript, Tailwind CSS, Lucide Icons, Recharts, Framer Motion
- **Backend**: Python FastAPI, REST APIs, Pydantic v2, `httpx`
- **Memory Engine**: Hindsight Long-term Memory API (`HINDSIGHT_BASE_URL` & `HINDSIGHT_API_KEY`)
- **AI Stack**: Gemini 1.5 Pro / Azure OpenAI / OpenAI API
- **Database**: Supabase PostgreSQL (SQL migrations in `supabase/migrations/`)

---

## 8. API Endpoints (Proxied via Next.js `/api/...`)
- `GET /api/health`: Backend health check `{"status": "ok", "service": "DealMind API"}`
- `GET /api/deals`: List active pipeline deals
- `GET /api/deals/{id}`: Fetch deal details
- `GET /api/deals/{id}/interactions`: Retrieve interaction transcript history
- `POST /api/deals/{id}/interactions`: Add interaction transcript & retain in Hindsight
- `GET /api/deals/{id}/stakeholders`: Fetch stakeholder intelligence
- `GET /api/deals/{id}/objections`: Fetch objection tracker
- `GET /api/deals/{id}/competitors`: Fetch competitor threat intelligence
- `GET /api/deals/{id}/memory`: Fetch Hindsight memory bank
- `POST /api/deals/{id}/meeting-prep`: Generate structured AI meeting prep
- `POST /api/deals/{id}/memory/replay`: Retrieve animated memory journey steps
- `GET /api/deals/{id}/intelligence`: Get AI Deal Intelligence & Next Best Action
- `POST /api/deals/{id}/chat`: Context-aware memory chat assistant
- `GET /docs`: FastAPI Interactive Swagger UI (`http://localhost:8000/docs`)
