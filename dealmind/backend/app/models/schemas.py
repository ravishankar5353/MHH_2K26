from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from uuid import UUID

class DealBase(BaseModel):
    company_name: str
    deal_name: str
    deal_value: float
    currency: str = "USD"
    stage: str = "Discovery"
    probability: int = 50
    health_score: int = 70
    status: str = "active"
    description: Optional[str] = None

class DealCreate(DealBase):
    pass

class DealResponse(DealBase):
    id: str
    created_at: datetime
    updated_at: datetime

class InteractionCreate(BaseModel):
    type: str  # Meeting, Email, Call, Demo, Negotiation, Follow-up
    title: str
    date: Optional[str] = None
    transcript: str
    summary: Optional[str] = None
    outcome: Optional[str] = None

class InteractionResponse(BaseModel):
    id: str
    deal_id: str
    type: str
    title: str
    date: datetime
    transcript: str
    summary: Optional[str] = None
    outcome: Optional[str] = None
    created_at: datetime

class StakeholderResponse(BaseModel):
    id: str
    deal_id: str
    name: str
    role: str
    department: Optional[str] = None
    priorities: List[str] = []
    concerns: List[str] = []
    influence: str = "Medium"
    sentiment: str = "Neutral"
    created_at: datetime

class ObjectionResponse(BaseModel):
    id: str
    deal_id: str
    objection: str
    response_used: Optional[str] = None
    outcome: Optional[str] = None
    effectiveness_score: int = 50
    first_seen: datetime
    last_seen: datetime
    best_response_rationale: Optional[str] = None

class CompetitorResponse(BaseModel):
    id: str
    deal_id: str
    name: str
    strengths: List[str] = []
    weaknesses: List[str] = []
    mentions: int = 1
    threat_level: str = "Medium"
    competitive_talking_point: Optional[str] = None

class CommitmentResponse(BaseModel):
    id: str
    deal_id: str
    owner: str
    commitment: str
    due_date: Optional[datetime] = None
    status: str = "pending"

class MemoryEventResponse(BaseModel):
    id: str
    deal_id: str
    interaction_id: Optional[str] = None
    memory_type: str  # Experience, World/Entity, Observation/Pattern
    hindsight_reference: Optional[str] = None
    summary: str
    importance: str = "High"  # High, Medium, Low
    created_at: datetime

class DealHealthBreakdown(BaseModel):
    budget_fit: int
    budget_fit_reason: str
    decision_maker_alignment: int
    decision_maker_alignment_reason: str
    product_fit: int
    product_fit_reason: str
    competitive_risk: int
    competitive_risk_reason: str
    engagement: int
    engagement_reason: str
    next_step_confidence: int
    next_step_confidence_reason: str
    overall_score: int

class AIDealIntelligence(BaseModel):
    current_assessment: str
    what_changed: str
    what_worked: str
    what_didn_t_work: str
    what_matters_now: str

class NextBestAction(BaseModel):
    action: str
    why: List[str]
    memory_sources: List[Dict[str, str]]

class MeetingPrepResponse(BaseModel):
    thirty_second_brief: str
    what_happened: str
    who_matters: str
    active_objections: str
    competitive_landscape: str
    what_worked_before: str
    what_to_avoid: str
    recommended_strategy: str
    questions_to_ask: List[str]
    risk_alerts: List[str]
    suggested_opening: str

class MemoryReplayStep(BaseModel):
    step_number: int
    title: str
    date: str
    event_summary: str
    insight_gained: str
    recommendation_shift: str

class MemoryReplayResponse(BaseModel):
    deal_id: str
    journey: List[MemoryReplayStep]
    final_takeaway: str = "10 interactions transformed into one intelligent recommendation."

class LearningCurveStep(BaseModel):
    interaction_num: int
    label: str
    level: str
    description: str

class ChatMessage(BaseModel):
    role: str # user or assistant
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    reply: str
    memory_sources: List[str] = []

class MemoryStatus(BaseModel):
    status: str  # Connected, Demo Mode, Offline
    is_demo_mode: bool
    total_memories: int
    last_updated: str
