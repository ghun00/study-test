import { QuizQuestion, OutcomeType } from '@/types/quiz';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "Q1",
    title: "하루 기준 공부·실기 시간 비율은?",
    options: [
      { key: "A", label: "공부 위주(실기는 보조)", weights: { overload: 1 } },
      { key: "B", label: "실기 위주(작품·소묘·포폴 중심)", weights: { stamina: 2 } },
      { key: "C", label: "의도적으로 균형을 맞춘다", weights: { focus: 2 } },
      { key: "D", label: "날마다 들쭉날쭉하다", weights: { routine: 2 } }
    ]
  },
  {
    id: "Q2",
    title: "실기(소묘/포폴) 후 공부 전환 시 가장 큰 어려움은?",
    options: [
      { key: "A", label: "체력/집중 급락으로 아무것도 안 잡힌다", weights: { stamina: 2 } },
      { key: "B", label: "의지가 약해지고 효율이 떨어진다", weights: { focus: 2 } },
      { key: "C", label: "자꾸 딴짓/폰/채팅으로 샌다", weights: { focus: 1 } },
      { key: "D", label: "큰 문제 없이 금방 전환된다", weights: { overload: 2 } }
    ]
  },
  {
    id: "Q3",
    title: "실기 일정이 몰릴 때 공부 계획은?",
    options: [
      { key: "A", label: "계획이 무너지고 빈칸이 생긴다", weights: { routine: 2 } },
      { key: "B", label: "시간을 확보하되 강도는 낮춘다", weights: { focus: 2 } },
      { key: "C", label: "공부 시간을 줄이고 효율을 높인다(핵심만)", weights: { overload: 2 } },
      { key: "D", label: "무리해서라도 전부 채운다", weights: { overload: 2 } }
    ]
  },
  {
    id: "Q4",
    title: "주말/입시 실기평가 직전 공부 루틴은?",
    options: [
      { key: "A", label: "공부를 거의 포기한다", weights: { routine: 2 } },
      { key: "B", label: "암기/가벼운 과목만 한다", weights: { focus: 1 } },
      { key: "C", label: "평소 루틴을 그대로 유지한다", weights: { overload: 2 } },
      { key: "D", label: "오히려 긴장감으로 더 집중된다", weights: { overload: 2 } }
    ]
  },
  {
    id: "Q5",
    title: "내게 더 부족한 피드백은?",
    options: [
      { key: "A", label: "공부 피드백(계획/성적 관리)", weights: { routine: 2 } },
      { key: "B", label: "실기 피드백(체력·기술·작품 방향)", weights: { stamina: 2 } },
      { key: "C", label: "둘 다 부족하다", weights: { focus: 2 } },
      { key: "D", label: "둘 다 충분하다", weights: { overload: 2 } }
    ]
  },
  {
    id: "Q6",
    title: "집중이 깨지는 주된 이유는?",
    options: [
      { key: "A", label: "체력 고갈(피로/근피로/두통 등)", weights: { stamina: 2 } },
      { key: "B", label: "실기·공부 일정 충돌 압박", weights: { routine: 2 } },
      { key: "C", label: "폰/소음/환경 같은 외부 요인", weights: { focus: 2 } },
      { key: "D", label: "거의 깨지지 않는다", weights: { overload: 2 } }
    ]
  },
  {
    id: "Q7",
    title: "성적/실기 상태 점검 주기와 깊이는?",
    options: [
      { key: "A", label: "모의고사/실기 평가 후에만 본다", weights: { routine: 2 } },
      { key: "B", label: "월 1회 대충 확인한다", weights: { stamina: 1 } },
      { key: "C", label: "주 1회 체크하나 깊이 분석은 부족", weights: { focus: 2 } },
      { key: "D", label: "주간 단위로 지표·오답·작품 피드백까지 철저", weights: { overload: 2 } }
    ]
  },
  {
    id: "Q8",
    title: "이상적인 하루 운영 방식은?",
    options: [
      { key: "A", label: "실기·공부 각각 절반, 균형형", weights: { focus: 2 } },
      { key: "B", label: "실기 위주, 공부는 최소한", weights: { stamina: 2 } },
      { key: "C", label: "공부 위주, 실기는 보조", weights: { overload: 2 } },
      { key: "D", label: "모든 걸 다 채우는 빡센 루틴", weights: { overload: 2 } }
    ]
  }
];

export const PRIORITY_ORDER: OutcomeType[] = ['stamina', 'routine', 'focus', 'overload'];
