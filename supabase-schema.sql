-- Supabase 데이터베이스 스키마
-- 이 SQL을 Supabase 대시보드의 SQL Editor에서 실행하세요

-- leads 테이블 생성
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    outcome TEXT CHECK (outcome IN ('stamina', 'routine', 'focus', 'overload')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- quiz_responses 테이블 생성
CREATE TABLE IF NOT EXISTS quiz_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    answers JSONB NOT NULL,
    scores JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_lead_id ON quiz_responses(lead_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_created_at ON quiz_responses(created_at);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기/쓰기 가능하도록 설정 (프로덕션에서는 더 엄격한 정책 필요)
CREATE POLICY "Enable all operations for all users" ON leads FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON quiz_responses FOR ALL USING (true);
