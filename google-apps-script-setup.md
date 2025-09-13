# Google Apps Script 설정 가이드

## 1. Google 스프레드시트 생성
1. [Google Sheets](https://sheets.google.com) 접속
2. 새 스프레드시트 생성
3. 스프레드시트 이름을 "미대 재수생 학습 진단 결과" 등으로 설정
4. URL에서 스프레드시트 ID 복사 (예: `1ABC123...`)

## 2. Google Apps Script 설정
1. 스프레드시트에서 `확장 프로그램` > `Apps Script` 클릭
2. `google-apps-script.js` 파일의 내용을 복사하여 붙여넣기
3. `SPREADSHEET_ID` 부분을 실제 스프레드시트 ID로 변경
4. `Ctrl+S`로 저장

## 3. API 배포
1. Apps Script 에디터에서 `배포` > `새 배포` 클릭
2. 유형: `웹 앱` 선택
3. 실행: `나`
4. 액세스 권한: `모든 사용자`
5. `배포` 클릭
6. 웹 앱 URL 복사 (예: `https://script.google.com/macros/s/ABC123.../exec`)

## 4. 프론트엔드 연동
1. `frontend-api-integration.js`의 코드를 `src/app/page.tsx`의 `handleContactSubmit` 함수에 적용
2. `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` 부분을 실제 웹 앱 URL로 변경

## 5. 테스트
1. Apps Script 에디터에서 `testFunction` 실행하여 테스트
2. 실제 웹사이트에서 퀴즈 완료 후 데이터 저장 확인
3. 스프레드시트에서 데이터 확인

## 스프레드시트 구조
| 생성일 | 학년 | 휴대폰 번호 | 학습 유형 |
|--------|------|-------------|-----------|
| 2024-01-15 14:30:25 | 고3 | 010-1234-5678 | 체력 소진형 |
| 2024-01-15 14:35:12 | 재수 | 010-9876-5432 | 루틴 붕괴형 |

## 주의사항
- 스프레드시트 ID는 공개되지 않도록 주의
- 웹 앱 URL은 공개되어도 됨 (데이터는 스프레드시트에만 저장)
- Apps Script는 일일 실행 제한이 있음 (무료 계정 기준)
- 한국 시간(UTC+9)으로 자동 설정됨
