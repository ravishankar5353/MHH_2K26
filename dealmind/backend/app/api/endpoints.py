from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any
from app.models.schemas import (
    DealResponse, InteractionCreate, InteractionResponse,
    StakeholderResponse, ObjectionResponse, CompetitorResponse,
    MemoryEventResponse, MeetingPrepResponse, AIDealIntelligence,
    NextBestAction, MemoryReplayResponse, MemoryReplayStep,
    LearningCurveStep, ChatRequest, ChatResponse, MemoryStatus, DealHealthBreakdown
)
from app.services.seed_data import (
    DEMO_DEAL_ID, get_demo_deal, get_demo_stakeholders,
    get_demo_objections, get_demo_competitors, get_demo_interactions,
    get_demo_memory_events, get_demo_intelligence, get_demo_next_best_action
)
from app.memory.hindsight_service import hindsight_engine
from app.services.llm_service import llm_service
from datetime import datetime

router = APIRouter()

# Global state in-memory store for Demo deal
deals_db: Dict[str, Dict[str, Any]] = {DEMO_DEAL_ID: get_demo_deal()}
stakeholders_db: Dict[str, List[Dict[str, Any]]] = {DEMO_DEAL_ID: get_demo_stakeholders()}
objections_db: Dict[str, List[Dict[str, Any]]] = {DEMO_DEAL_ID: get_demo_objections()}
competitors_db: Dict[str, List[Dict[str, Any]]] = {DEMO_DEAL_ID: get_demo_competitors()}
interactions_db: Dict[str, List[Dict[str, Any]]] = {DEMO_DEAL_ID: get_demo_interactions()}
memory_events_db: Dict[str, List[Dict[str, Any]]] = {DEMO_DEAL_ID: get_demo_memory_events()}

# Initialize Hindsight memory bank for demo deal
for mem in memory_events_db[DEMO_DEAL_ID]:
    hindsight_engine.in_memory_banks.setdefault(f"deal_{DEMO_DEAL_ID}", []).append({
        "id": mem["id"],
        "bank_id": f"deal_{DEMO_DEAL_ID}",
        "content": mem["summary"],
        "memory_type": mem["memory_type"],
        "metadata": {"importance": mem.get("importance", "High")},
        "created_at": mem["created_at"]
    })

@router.get("/deals", response_model=List[Dict[str, Any]])
async def list_deals():
    return list(deals_db.values())

@router.get("/deals/{deal_id}")
async def get_deal(deal_id: str):
    if deal_id not in deals_db:
        # Fallback to demo deal if requested ID matches pattern
        return get_demo_deal()
    return deals_db[deal_id]

@router.get("/deals/{deal_id}/interactions")
async def get_interactions(deal_id: str):
    return interactions_db.get(deal_id, get_demo_interactions())

@router.post("/deals/{deal_id}/interactions")
async def add_interaction(deal_id: str, payload: InteractionCreate):
    interaction_id = f"int-{len(interactions_db.get(deal_id, [])) + 1}"
    new_int = {
        "id": interaction_id,
        "deal_id": deal_id,
        "type": payload.type,
        "title": payload.title,
        "date": payload.date or datetime.now().isoformat(),
        "transcript": payload.transcript,
        "summary": payload.summary or f"Recorded {payload.type}: {payload.title}",
        "outcome": payload.outcome or "Interaction added and memory bank updated.",
        "created_at": datetime.now().isoformat()
    }
    
    if deal_id not in interactions_db:
        interactions_db[deal_id] = []
    interactions_db[deal_id].append(new_int)

    # Process with LLM & Retain in Hindsight
    analysis = await llm_service.analyze_interaction(
        deal_id=deal_id,
        transcript=payload.transcript,
        title=payload.title,
        type=payload.type
    )

    # Save Memory Event
    new_mem = {
        "id": f"mem-{len(memory_events_db.get(deal_id, [])) + 1}",
        "deal_id": deal_id,
        "interaction_id": interaction_id,
        "memory_type": analysis.get("memory_type", "Experience"),
        "hindsight_reference": analysis.get("hindsight_reference"),
        "summary": f"[{payload.type.upper()}] {payload.title}: {analysis.get('summary')}",
        "importance": "High",
        "created_at": datetime.now().isoformat()
    }
    if deal_id not in memory_events_db:
        memory_events_db[deal_id] = []
    memory_events_db[deal_id].append(new_mem)

    # Recalculate Health Score
    deal = deals_db.get(deal_id, get_demo_deal())
    deal["health_score"] = min(100, deal.get("health_score", 78) + 2)
    deal["updated_at"] = datetime.now().isoformat()

    return {
        "status": "success",
        "message": "Interaction remembered. Deal intelligence updated.",
        "interaction": new_int,
        "memory_event": new_mem,
        "analysis": analysis
    }

@router.get("/deals/{deal_id}/stakeholders")
async def get_stakeholders(deal_id: str):
    return stakeholders_db.get(deal_id, get_demo_stakeholders())

@router.get("/deals/{deal_id}/objections")
async def get_objections(deal_id: str):
    return objections_db.get(deal_id, get_demo_objections())

@router.get("/deals/{deal_id}/competitors")
async def get_competitors(deal_id: str):
    return competitors_db.get(deal_id, get_demo_competitors())

@router.get("/deals/{deal_id}/memory")
async def get_memory_events(deal_id: str):
    events = memory_events_db.get(deal_id, get_demo_memory_events())
    hindsight_memories = hindsight_engine.in_memory_banks.get(f"deal_{deal_id}", [])
    return {
        "deal_id": deal_id,
        "total_memories": len(events) + len(hindsight_memories),
        "events": events,
        "hindsight_bank": hindsight_memories
    }

@router.post("/deals/{deal_id}/meeting-prep")
async def generate_meeting_prep(deal_id: str):
    deal_data = deals_db.get(deal_id, get_demo_deal())
    prep = await llm_service.generate_meeting_prep(deal_id, deal_data)
    return prep

@router.post("/deals/{deal_id}/memory/replay")
async def replay_memory(deal_id: str):
    journey = [
        MemoryReplayStep(
            step_number=1,
            title="Interaction 01 — Discovery Call",
            date="Sep 10",
            event_summary="Discovered 4,200 commercial vehicle fleet with 14% fuel inefficiency.",
            insight_gained="High-level operational pain identified; stakeholders unclear.",
            recommendation_shift="Schedule technical architecture session with engineering."
        ),
        MemoryReplayStep(
            step_number=2,
            title="Interaction 03 — Technical Sandbox Demo",
            date="Sep 15",
            event_summary="CTO Daniel Brooks evaluated REST API ingestion and SOC2 security.",
            insight_gained="CTO requires low-latency data telemetry and API documentation.",
            recommendation_shift="Demonstrate live sandbox REST connector to clear technical barrier."
        ),
        MemoryReplayStep(
            step_number=3,
            title="Interaction 05 — CFO Budget Intro & Discount Request",
            date="Sep 21",
            event_summary="CFO Maya Chen requested a 15% upfront discount. Initial price concessions failed.",
            insight_gained="Maya Chen will not accept arbitrary price discounts; she requires financial payback proof.",
            recommendation_shift="Stop offering discounts; build quantified fleet ROI model."
        ),
        MemoryReplayStep(
            step_number=4,
            title="Interaction 07 — Competitor Threat Identified",
            date="Sep 23",
            event_summary="Salesforce internal custom build cited as competitor with zero license fee.",
            insight_gained="Internal build threat requires highlighting 12-month dev cost ($450k).",
            recommendation_shift="Present Total Cost of Ownership (TCO) comparison deck."
        ),
        MemoryReplayStep(
            step_number=5,
            title="Interaction 08 — Quantified ROI Breakdown Presentation",
            date="Sep 24",
            event_summary="Presented $320k annual fuel savings model. CFO Maya Chen shifted to positive deal sponsor.",
            insight_gained="ROI messaging completely neutralized pricing objections.",
            recommendation_shift="Anchor all future communications around board ROI deck."
        ),
        MemoryReplayStep(
            step_number=6,
            title="Interaction 10 — Procurement Milestone Alignment",
            date="Sep 28",
            event_summary="Alex Morgan from Procurement reviewing Net-45 milestone billing.",
            insight_gained="Final barrier is contract terms, not value or technical fit.",
            recommendation_shift="Deliver Next Best Action: Present executive ROI deck & milestone schedule."
        )
    ]
    return MemoryReplayResponse(
        deal_id=deal_id,
        journey=journey,
        final_takeaway="10 interactions transformed into one intelligent, evidence-backed recommendation."
    )

@router.get("/deals/{deal_id}/intelligence")
async def get_deal_intelligence(deal_id: str):
    intelligence = get_demo_intelligence()
    next_best_action = await llm_service.generate_next_best_action(deal_id)
    return {
        "deal_id": deal_id,
        "intelligence": intelligence,
        "next_best_action": next_best_action
    }

@router.get("/deals/{deal_id}/health")
async def get_deal_health(deal_id: str):
    return DealHealthBreakdown(
        budget_fit=85,
        budget_fit_reason="CFO Maya Chen accepted the $320k ROI model after initial discount push.",
        decision_maker_alignment=90,
        decision_maker_alignment_reason="Both CTO (Daniel Brooks) and CFO (Maya Chen) are actively sponsoring.",
        product_fit=95,
        product_fit_reason="Sub-second API latency and pre-built SAP connector fully validated.",
        competitive_risk=65,
        competitive_risk_reason="Salesforce internal build was cited 4 times; TCO defense required.",
        engagement=88,
        engagement_reason="10 interactions recorded across Discovery, Demo, ROI, and Procurement.",
        next_step_confidence=92,
        next_step_confidence_reason="Procurement MSA under review; closing targeted for end of week.",
        overall_score=78
    )

@router.get("/deals/{deal_id}/learning-curve")
async def get_learning_curve(deal_id: str):
    return [
        LearningCurveStep(interaction_num=1, label="Interaction 1", level="Generic Context", description="Basic deal size & fleet count recorded."),
        LearningCurveStep(interaction_num=3, label="Interaction 3", level="Objection Awareness", description="CTO security & API latency concerns captured."),
        LearningCurveStep(interaction_num=5, label="Interaction 5", level="Stakeholder Priorities", description="CFO Maya Chen identified as primary financial decision maker."),
        LearningCurveStep(interaction_num=7, label="Interaction 7", level="Tactic Effectiveness", description="Discovered price discounting failed; ROI modeling succeeded."),
        LearningCurveStep(interaction_num=10, label="Interaction 10", level="Personalized Strategy", description="Synthesized 10 memories into Next Best Action strategy.")
    ]

@router.post("/deals/{deal_id}/chat")
async def deal_chat(deal_id: str, request: ChatRequest):
    last_msg = request.messages[-1].content if request.messages else "Summarize deal memory"
    resp = await llm_service.answer_chat(deal_id, last_msg)
    return resp

@router.get("/memory-status")
async def get_memory_status():
    is_live = hindsight_engine.is_live()
    total_mems = sum(len(b) for b in hindsight_engine.in_memory_banks.values()) + len(get_demo_memory_events())
    return MemoryStatus(
        status="Connected (Live Hindsight API)" if is_live else "Connected (Hindsight Memory Engine Active)",
        is_demo_mode=not is_live,
        total_memories=total_mems,
        last_updated="Just now"
    )

