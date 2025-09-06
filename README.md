# Outcome Quiz - 미대 재수생 학습 진단 웹앱

미대 재수 종합학원을 위한 마케팅 퀴즈 웹앱입니다. 2분 내로 미대 재수생의 공부·실기 병행 습관을 진단하고 맞춤형 솔루션을 제공합니다.

## 🎯 주요 기능

- **8문항 퀴즈**: 공부·실기 병행 습관 진단
- **4가지 결과 유형**: stamina, routine, focus, overload
- **연락처 수집**: 휴대폰 필수, 이메일 선택
- **상담 전환**: 결과별 맞춤 CTA로 상담 신청 유도
- **토스 스타일 디자인**: 깔끔하고 미니멀한 UI/UX

## 🛠️ 기술 스택

- **Frontend**: Next.js 14 (App Router) + TypeScript + TailwindCSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (예정)

## 📋 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. `supabase-schema.sql` 파일의 내용을 Supabase SQL Editor에서 실행
3. 프로젝트 설정에서 API URL과 anon key 복사

### 3. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📊 데이터베이스 스키마

### leads 테이블
- `id`: UUID (Primary Key)
- `name`: 이름 (선택사항)
- `phone`: 휴대폰 번호 (필수)
- `email`: 이메일 (선택사항)
- `outcome`: 진단 결과 유형
- `created_at`: 생성일시

### quiz_responses 테이블
- `id`: UUID (Primary Key)
- `lead_id`: leads 테이블 외래키
- `answers`: 퀴즈 답변 (JSONB)
- `scores`: 각 유형별 점수 (JSONB)
- `created_at`: 생성일시

## 🎨 디자인 가이드

- **색상**: 흰 배경, 블랙/그레이 타이포, 주요 CTA는 블랙 버튼
- **폰트**: Pretendard/Inter 계열 Sans-serif
- **스타일**: 라운드 코너, 적당한 흰 여백, 카드형 객관식 버튼
- **반응형**: 모바일 퍼스트 디자인

## 📱 페이지 구조

- `/`: 메인 퀴즈 페이지 (8문항 → 연락처 입력 → 결과)
- `/counsel`: 상담 신청 LP 페이지
- `/api/quiz`: 퀴즈 결과 처리 API

## 🔧 주요 로직

### 점수 계산
각 질문의 선택지에 부여된 가중치를 합산하여 4개 유형별 점수 계산

### 결과 결정
최고 점수 유형을 결과로 결정, 동점 시 우선순위: stamina > routine > focus > overload

## 🚀 배포

### Vercel 배포
1. GitHub에 코드 푸시
2. Vercel에서 프로젝트 연결
3. 환경변수 설정
4. 배포 완료

## 📈 마케팅 활용

1. **DB 확보**: 퀴즈 참여자의 연락처 수집
2. **상담 전환**: 결과별 맞춤 솔루션으로 상담 신청 유도
3. **이벤트 트래킹**: 결과 노출(ViewContent), CTA 클릭(Lead) 추적

## 🔒 보안 고려사항

- Supabase RLS 정책으로 데이터 접근 제어
- 환경변수를 통한 API 키 관리
- 입력 데이터 검증 및 에러 처리

## 📞 지원

문의사항이 있으시면 개발팀에 연락해주세요.