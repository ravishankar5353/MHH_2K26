import uuid
from datetime import datetime, timedelta
from typing import Dict, Any, List

DEMO_DEAL_ID = "nova-fleet-185k"

def get_demo_deal() -> Dict[str, Any]:
    return {
        "id": DEMO_DEAL_ID,
        "company_name": "NovaFleet Technologies",
        "deal_name": "Enterprise Fleet Intelligence Platform",
        "deal_value": 185000.0,
        "currency": "USD",
        "stage": "Negotiation",
        "probability": 85,
        "health_score": 78,
        "status": "active",
        "description": "Deployment of real-time IoT telemetry, AI route optimization, and executive predictive analytics across 4,200 commercial vehicles.",
        "created_at": "2026-09-01T09:00:00Z",
        "updated_at": "2026-09-28T14:30:00Z"
    }

def get_demo_stakeholders() -> List[Dict[str, Any]]:
    return [
        {
            "id": "stk-1",
            "deal_id": DEMO_DEAL_ID,
            "name": "Maya Chen",
            "role": "Chief Financial Officer (CFO)",
            "department": "Finance & Operations",
            "priorities": ["Quantifiable ROI", "EBITDA Impact", "Predictable Billing Cycles"],
            "concerns": ["Upfront CapEx vs OpEx", "Pricing structure relative to internal build"],
            "influence": "High",
            "sentiment": "Cautiously Positive",
            "created_at": "2026-09-10T10:00:00Z"
        },
        {
            "id": "stk-2",
            "deal_id": DEMO_DEAL_ID,
            "name": "Daniel Brooks",
            "role": "Chief Technology Officer (CTO)",
            "department": "Engineering & IT",
            "priorities": ["REST/GraphQL API Latency", "SOC2 Type II Compliance", "Telematics Data Ingestion"],
            "concerns": ["Custom webhook reliability", "Data privacy during cloud transit"],
            "influence": "High",
            "sentiment": "Positive",
            "created_at": "2026-09-10T10:00:00Z"
        },
        {
            "id": "stk-3",
            "deal_id": DEMO_DEAL_ID,
            "name": "Alex Morgan",
            "role": "Head of Procurement",
            "department": "Procurement & Legal",
            "priorities": ["Contract terms", "SLAs (99.99%)", "Net-45 Payment Terms"],
            "concerns": ["Auto-renewal terms", "Indemnification caps"],
            "influence": "Medium",
            "sentiment": "Neutral",
            "created_at": "2026-09-26T14:00:00Z"
        }
    ]

def get_demo_objections() -> List[Dict[str, Any]]:
    return [
        {
            "id": "obj-1",
            "deal_id": DEMO_DEAL_ID,
            "objection": "Pricing vs Value / High Annual Contract Value",
            "response_used": "Quantified ROI breakdown with fleet fuel saving & maintenance case study ($320k annual impact)",
            "outcome": "CFO Maya Chen acknowledged positive ROI and requested executive board slide deck.",
            "effectiveness_score": 89,
            "first_seen": "2026-09-10T10:30:00Z",
            "last_seen": "2026-09-24T16:00:00Z",
            "best_response_rationale": "Leading with concrete financial payback figures worked far better than offering upfront price discounts."
        },
        {
            "id": "obj-2",
            "deal_id": DEMO_DEAL_ID,
            "objection": "API & ERP Integration Complexity",
            "response_used": "Live technical sandbox demo showcasing pre-built SAP and Salesforce connectors",
            "outcome": "CTO Daniel Brooks validated 15-minute connector setup.",
            "effectiveness_score": 82,
            "first_seen": "2026-09-12T11:00:00Z",
            "last_seen": "2026-09-15T14:00:00Z",
            "best_response_rationale": "Showing code & running live API payload demos eliminated integration hesitancy immediately."
        },
        {
            "id": "obj-3",
            "deal_id": DEMO_DEAL_ID,
            "objection": "Contract & Net-45 Payment Terms",
            "response_used": "Standard Legal clarification and tiered payment milestone schedule",
            "outcome": "Under review by Alex Morgan in Procurement.",
            "effectiveness_score": 70,
            "first_seen": "2026-09-21T15:00:00Z",
            "last_seen": "2026-09-26T11:00:00Z",
            "best_response_rationale": "Offering quarterly milestone billing neutralized procurement's budget locking rule."
        }
    ]

def get_demo_competitors() -> List[Dict[str, Any]]:
    return [
        {
            "id": "comp-1",
            "deal_id": DEMO_DEAL_ID,
            "name": "Salesforce Internal Build",
            "strengths": ["Brand trust", "Existing CRM ecosystem footprint", "No separate vendor approval"],
            "weaknesses": ["High internal engineering maintenance", "Lacks real-time IoT edge stream processing", "12-month implementation timeline"],
            "mentions": 4,
            "threat_level": "High",
            "competitive_talking_point": "Salesforce requires 12 months of expensive custom Apex development; DealMind delivers turnkey telematics AI in 2 weeks out of the box."
        }
    ]

def get_demo_interactions() -> List[Dict[str, Any]]:
    return [
        {
            "id": "int-1",
            "deal_id": DEMO_DEAL_ID,
            "type": "Discovery",
            "title": "Initial Discovery Call",
            "date": "2026-09-10T10:00:00Z",
            "transcript": "Rep met with VP of Operations. NovaFleet operates 4,200 vehicles and is experiencing 14% fuel waste due to inefficient routing. Evaluated initial high-level requirements.",
            "summary": "Discovered fleet size of 4,200 vehicles and key pain point: fuel waste.",
            "outcome": "Agreed to schedule deep-dive technical architecture call with CTO."
        },
        {
            "id": "int-2",
            "deal_id": DEMO_DEAL_ID,
            "type": "Technical",
            "title": "Security & Architecture Review",
            "date": "2026-09-12T11:00:00Z",
            "transcript": "Met CTO Daniel Brooks. Daniel raised concerns about cloud security, SOC2 compliance, and how telematics data from vehicle CAN-bus sensors is encrypted.",
            "summary": "CTO expressed security and data governance concerns.",
            "outcome": "Shared SOC2 Type II audit report and end-to-end TLS 1.3 encryption specs."
        },
        {
            "id": "int-3",
            "deal_id": DEMO_DEAL_ID,
            "type": "Demo",
            "title": "Technical Sandbox Integration Demo",
            "date": "2026-09-15T14:00:00Z",
            "transcript": "Demonstrated live REST API data stream ingestion. CTO Daniel Brooks was impressed by sub-second latency and pre-built SAP connectors. Raised pricing concern tentatively.",
            "summary": "CTO satisfied with technical architecture & API performance. Initial pricing concern surfaced.",
            "outcome": "Technical validation complete. Daniel agreed to introduce CFO Maya Chen."
        },
        {
            "id": "int-4",
            "deal_id": DEMO_DEAL_ID,
            "type": "Meeting",
            "title": "Full Stakeholder Product Demo",
            "date": "2026-09-18T10:00:00Z",
            "transcript": "CFO Maya Chen joined. Presented overall platform dashboard. Maya asked how DealMind justifies the $185k ARR asking price compared to standard telematics software.",
            "summary": "CFO Maya Chen requested clear financial justification and ROI proof.",
            "outcome": "Promised custom fleet ROI audit report for NovaFleet."
        },
        {
            "id": "int-5",
            "deal_id": DEMO_DEAL_ID,
            "type": "Follow-up",
            "title": "CTO Technical Sign-off Follow-up",
            "date": "2026-09-20T15:00:00Z",
            "transcript": "CTO Daniel Brooks confirmed engineering sign-off on the API specs. Stated: 'If Maya approves the budget, IT is 100% ready to execute implementation.'",
            "summary": "CTO officially signed off on technical readiness.",
            "outcome": "All technical hurdles cleared. Decision now rests on CFO ROI alignment."
        },
        {
            "id": "int-6",
            "deal_id": DEMO_DEAL_ID,
            "type": "Negotiation",
            "title": "CFO Financial & Discount Discussion",
            "date": "2026-09-21T16:00:00Z",
            "transcript": "CFO Maya Chen requested a 15% upfront discount, citing internal budget caps. Rep offered a minor discount without linking to value, which Maya found unconvincing.",
            "summary": "CFO requested 15% discount. Initial discounting response failed to move the deal forward.",
            "outcome": "Deal paused. Identified that discounting alone does not resolve CFO concerns."
        },
        {
            "id": "int-7",
            "deal_id": DEMO_DEAL_ID,
            "type": "Call",
            "title": "Competitor Evaluation Call",
            "date": "2026-09-23T11:00:00Z",
            "transcript": "Maya revealed Salesforce internal custom build is being considered by internal IT steering committee. Highlighted that Salesforce build has no software licensing fee.",
            "summary": "Competitor threat identified: Internal Salesforce build.",
            "outcome": "Prepared comparative Total Cost of Ownership (TCO) analysis showing $450k internal build cost vs DealMind turnkey deployment."
        },
        {
            "id": "int-8",
            "deal_id": DEMO_DEAL_ID,
            "type": "Negotiation",
            "title": "Quantified ROI & TCO Presentation",
            "date": "2026-09-24T15:00:00Z",
            "transcript": "Presented $320k annual ROI breakdown based on 14% fuel reduction and maintenance prediction. Maya Chen shifted from requesting discounts to praising the ROI evidence.",
            "summary": "ROI messaging resonated strongly. CFO shifted sentiment to positive.",
            "outcome": "CFO requested board slide deck. Key milestone achieved."
        },
        {
            "id": "int-9",
            "deal_id": DEMO_DEAL_ID,
            "type": "Follow-up",
            "title": "Procurement Contract Onboarding",
            "date": "2026-09-26T13:00:00Z",
            "transcript": "Alex Morgan from Procurement joined. Reviewed standard MSA, SLA commitments (99.99%), and requested Net-45 payment terms.",
            "summary": "Procurement involved. Formal contract review in progress.",
            "outcome": "Draft MSA sent with quarterly billing milestone option."
        },
        {
            "id": "int-10",
            "deal_id": DEMO_DEAL_ID,
            "type": "Negotiation",
            "title": "Executive Final Alignment & Verbal Sign-off",
            "date": "2026-09-28T14:00:00Z",
            "transcript": "Final executive check-in with Maya Chen and Alex Morgan. Maya confirmed ROI case was accepted by board. Contract signature targeted for end of week.",
            "summary": "Verbal agreement reached. Finalizing procurement signature.",
            "outcome": "Next Best Action generated based on 10 accumulated deal memories."
        }
    ]

def get_demo_memory_events() -> List[Dict[str, Any]]:
    return [
        {
            "id": "mem-1",
            "deal_id": DEMO_DEAL_ID,
            "memory_type": "Experience",
            "summary": "Sep 10: Discovery call established fleet size (4,200 vehicles) and primary pain point of 14% fuel inefficiency.",
            "importance": "Medium",
            "created_at": "2026-09-10T10:30:00Z"
        },
        {
            "id": "mem-2",
            "deal_id": DEMO_DEAL_ID,
            "memory_type": "World/Entity",
            "summary": "Sep 12: Identified CTO Daniel Brooks as key technical decision-maker focused on API latency and SOC2 Type II compliance.",
            "importance": "High",
            "created_at": "2026-09-12T11:30:00Z"
        },
        {
            "id": "mem-3",
            "deal_id": DEMO_DEAL_ID,
            "memory_type": "Observation/Pattern",
            "summary": "Sep 15: Demonstrating live REST API sandbox payload successfully neutralized technical integration objections.",
            "importance": "High",
            "created_at": "2026-09-15T14:30:00Z"
        },
        {
            "id": "mem-4",
            "deal_id": DEMO_DEAL_ID,
            "memory_type": "World/Entity",
            "summary": "Sep 18: Identified CFO Maya Chen as financial authority requiring rigorous quantifiable EBITDA payback proof.",
            "importance": "High",
            "created_at": "2026-09-18T10:30:00Z"
        },
        {
            "id": "mem-5",
            "deal_id": DEMO_DEAL_ID,
            "memory_type": "Observation/Pattern",
            "summary": "Sep 21: Standard price discounting failed with CFO Maya Chen; she requires financial value modeling, not arbitrary concessions.",
            "importance": "High",
            "created_at": "2026-09-21T16:30:00Z"
        },
        {
            "id": "mem-6",
            "deal_id": DEMO_DEAL_ID,
            "memory_type": "World/Entity",
            "summary": "Sep 23: Salesforce internal custom build identified as main competitive threat due to perceived zero-license cost.",
            "importance": "High",
            "created_at": "2026-09-23T11:30:00Z"
        },
        {
            "id": "mem-7",
            "deal_id": DEMO_DEAL_ID,
            "memory_type": "Observation/Pattern",
            "summary": "Sep 24: Quantified ROI breakdown ($320k annual savings) converted CFO Maya Chen from pricing skeptic to deal sponsor.",
            "importance": "High",
            "created_at": "2026-09-24T15:30:00Z"
        },
        {
            "id": "mem-8",
            "deal_id": DEMO_DEAL_ID,
            "memory_type": "World/Entity",
            "summary": "Sep 26: Alex Morgan from Procurement introduced Net-45 payment requirement and SLA clause focus.",
            "importance": "Medium",
            "created_at": "2026-09-26T13:30:00Z"
        }
    ]

def get_demo_intelligence() -> Dict[str, Any]:
    return {
        "current_assessment": "The deal is in the final negotiation stage with 85% probability. CFO Maya Chen is aligned on ROI, and CTO Daniel Brooks has signed off on tech architecture. Procurement is reviewing contract terms.",
        "what_changed": "CFO Maya Chen shifted from requesting price discounts to championing the $320k ROI case study after receiving the quantified fleet audit.",
        "what_worked": "Leading with concrete financial ROI case studies and demonstrating live sandbox REST API performance for the CTO.",
        "what_didn_t_work": "Offering generic upfront price discounts without linking to operational value failed to move CFO Maya Chen.",
        "what_matters_now": "Finalizing Net-45 payment terms and quarterly billing milestone schedule with Alex Morgan in Procurement."
    }

def get_demo_next_best_action() -> Dict[str, Any]:
    return {
        "action": "Lead the final closing call with the approved quantified ROI executive summary deck and present the quarterly milestone billing structure to Procurement.",
        "why": [
            "CFO Maya Chen raised pricing concerns across 3 interactions and responded enthusiastically to ROI proof on Sep 24.",
            "Leading with discounting on Sep 21 did NOT resolve budget concerns; value-backed ROI messaging did.",
            "CTO Daniel Brooks is 100% technically aligned since the Sep 15 integration demo.",
            "Procurement (Alex Morgan) requires clear payment milestone terms to execute final signatures."
        ],
        "memory_sources": [
            {"label": "Sep 15 — Integration Demo", "date": "Sep 15"},
            {"label": "Sep 21 — Discount Request", "date": "Sep 21"},
            {"label": "Sep 24 — ROI Case Study Response", "date": "Sep 24"},
            {"label": "Sep 26 — Procurement Contract Review", "date": "Sep 26"}
        ]
    }
