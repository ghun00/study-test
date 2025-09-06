import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { QuizAnswer, QuizScores, OutcomeType, Lead, QuizResponse } from '@/types/quiz';

// Supabase 클라이언트 설정 (환경변수 사용)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers, scores, contactInfo, outcome } = body;

    // 입력 데이터 검증
    if (!answers || !scores || !contactInfo || !outcome) {
      return NextResponse.json(
        { error: '필수 데이터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    if (!contactInfo.phone) {
      return NextResponse.json(
        { error: '휴대폰 번호는 필수입니다.' },
        { status: 400 }
      );
    }

    // Lead 데이터 생성
    const leadData: Omit<Lead, 'id' | 'created_at'> = {
      name: contactInfo.name || null,
      phone: contactInfo.phone,
      email: contactInfo.email || null,
      outcome: outcome as OutcomeType
    };

    // Lead 저장
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single();

    if (leadError) {
      console.error('Lead 저장 오류:', leadError);
      return NextResponse.json(
        { error: '데이터 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // Quiz Response 데이터 생성
    const quizResponseData: Omit<QuizResponse, 'id' | 'created_at'> = {
      lead_id: lead.id,
      answers: answers as QuizAnswer[],
      scores: scores as QuizScores
    };

    // Quiz Response 저장
    const { error: responseError } = await supabase
      .from('quiz_responses')
      .insert([quizResponseData]);

    if (responseError) {
      console.error('Quiz Response 저장 오류:', responseError);
      // Lead는 이미 저장되었으므로 에러를 반환하지 않고 계속 진행
    }

    // 성공 응답
    return NextResponse.json({
      success: true,
      outcome,
      leadId: lead.id
    });

  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
