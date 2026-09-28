-- Supabase Migration for DealMind
-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deals Table
CREATE TABLE IF NOT EXISTS deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    deal_name TEXT NOT NULL,
    deal_value NUMERIC(15, 2) NOT NULL DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'USD',
    stage TEXT NOT NULL DEFAULT 'Discovery',
    probability INT NOT NULL DEFAULT 50,
    health_score INT NOT NULL DEFAULT 70,
    status TEXT NOT NULL DEFAULT 'active', -- active, won, lost, at_risk
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Interactions Table
CREATE TABLE IF NOT EXISTS interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- Meeting, Email, Call, Demo, Negotiation, Follow-up
    title TEXT NOT NULL,
    date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    transcript TEXT,
    summary TEXT,
    outcome TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stakeholders Table
CREATE TABLE IF NOT EXISTS stakeholders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT,
    priorities TEXT[],
    concerns TEXT[],
    influence TEXT DEFAULT 'Medium', -- High, Medium, Low
    sentiment TEXT DEFAULT 'Neutral', -- Positive, Cautiously Positive, Neutral, Negative
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Objections Table
CREATE TABLE IF NOT EXISTS objections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
    objection TEXT NOT NULL,
    response_used TEXT,
    outcome TEXT,
    effectiveness_score INT DEFAULT 50, -- 0-100%
    first_seen TIMESTAMPTZ DEFAULT NOW(),
    last_seen TIMESTAMPTZ DEFAULT NOW()
);

-- Competitors Table
CREATE TABLE IF NOT EXISTS competitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    strengths TEXT[],
    weaknesses TEXT[],
    mentions INT DEFAULT 1,
    threat_level TEXT DEFAULT 'Medium' -- High, Medium, Low
);

-- Commitments Table
CREATE TABLE IF NOT EXISTS commitments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
    owner TEXT NOT NULL,
    commitment TEXT NOT NULL,
    due_date TIMESTAMPTZ,
    status TEXT DEFAULT 'pending' -- pending, completed, overdue
);

-- Recommendations Table
CREATE TABLE IF NOT EXISTS recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
    recommendation TEXT NOT NULL,
    reasoning TEXT NOT NULL,
    confidence INT DEFAULT 85,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Memory Events Table
CREATE TABLE IF NOT EXISTS memory_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
    interaction_id UUID REFERENCES interactions(id) ON DELETE SET NULL,
    memory_type TEXT NOT NULL, -- Experience, World/Entity, Observation/Pattern
    hindsight_reference TEXT,
    summary TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_interactions_deal_id ON interactions(deal_id);
CREATE INDEX IF NOT EXISTS idx_stakeholders_deal_id ON stakeholders(deal_id);
CREATE INDEX IF NOT EXISTS idx_objections_deal_id ON objections(deal_id);
CREATE INDEX IF NOT EXISTS idx_competitors_deal_id ON competitors(deal_id);
CREATE INDEX IF NOT EXISTS idx_memory_events_deal_id ON memory_events(deal_id);
