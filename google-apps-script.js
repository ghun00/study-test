// Google Apps Script 코드
// 스프레드시트에 연락처 및 진단 결과 저장

function doPost(e) {
  try {
    // 요청 데이터 파싱
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      // URL 파라미터로 전달된 경우
      data = {
        phone: e.parameter.phone,
        grade: e.parameter.grade,
        outcome: e.parameter.outcome
      };
    } else {
      throw new Error('No data provided');
    }
    
    // 필수 필드 검증
    if (!data.phone || !data.grade || !data.outcome) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: '필수 필드가 누락되었습니다.'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // 현재 스프레드시트 사용
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 헤더가 없으면 추가
    const headers = sheet.getRange(1, 1, 1, 4).getValues()[0];
    if (!headers[0] || headers[0] === '') {
      sheet.getRange(1, 1, 1, 4).setValues([['생성일', '학년', '휴대폰 번호', '학습 유형']]);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
    }
    
    // 현재 날짜/시간 생성
    const now = new Date();
    const koreanTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
    const formattedDate = Utilities.formatDate(koreanTime, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
    
    // 학습 유형 한글 변환
    const outcomeMap = {
      'stamina': '체력 소진형',
      'routine': '루틴 붕괴형', 
      'focus': '집중 단절형',
      'overload': '자기주도 과부하형'
    };
    
    const koreanOutcome = outcomeMap[data.outcome] || data.outcome;
    
    // 새 행에 데이터 추가
    const newRow = [
      formattedDate,           // 생성일
      data.grade,             // 학년
      data.phone,             // 휴대폰 번호
      koreanOutcome           // 학습 유형
    ];
    
    sheet.appendRow(newRow);
    
    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: '데이터가 성공적으로 저장되었습니다.',
        data: {
          date: formattedDate,
          grade: data.grade,
          phone: data.phone,
          outcome: koreanOutcome
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 에러 응답
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: '서버 오류가 발생했습니다: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 (데이터 저장 포함)
function doGet(e) {
  try {
    // URL 파라미터로 전달된 데이터 처리
    if (e.parameter && e.parameter.phone && e.parameter.grade && e.parameter.outcome) {
      const data = {
        phone: e.parameter.phone,
        grade: e.parameter.grade,
        outcome: e.parameter.outcome
      };
      
      // 스프레드시트에 데이터 저장
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      
      // 헤더가 없으면 추가
      const headers = sheet.getRange(1, 1, 1, 4).getValues()[0];
      if (!headers[0] || headers[0] === '') {
        sheet.getRange(1, 1, 1, 4).setValues([['생성일', '학년', '휴대폰 번호', '학습 유형']]);
        sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
      }
      
      // 현재 날짜/시간 생성
      const now = new Date();
      const koreanTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
      const formattedDate = Utilities.formatDate(koreanTime, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
      
      // 학습 유형 한글 변환
      const outcomeMap = {
        'stamina': '체력 소진형',
        'routine': '루틴 붕괴형', 
        'focus': '집중 단절형',
        'overload': '자기주도 과부하형'
      };
      
      const koreanOutcome = outcomeMap[data.outcome] || data.outcome;
      
      // 새 행에 데이터 추가
      const newRow = [
        formattedDate,           // 생성일
        data.grade,             // 학년
        data.phone,             // 휴대폰 번호
        koreanOutcome           // 학습 유형
      ];
      
      sheet.appendRow(newRow);
      
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: '데이터가 성공적으로 저장되었습니다.',
          data: {
            date: formattedDate,
            grade: data.grade,
            phone: data.phone,
            outcome: koreanOutcome
          }
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // 파라미터가 없으면 테스트 메시지 반환
    return ContentService
      .createTextOutput(JSON.stringify({
        message: 'Google Apps Script API가 정상적으로 작동합니다.',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: '서버 오류가 발생했습니다: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 테스트 함수
function testFunction() {
  const testData = {
    phone: '010-1234-5678',
    grade: '고3',
    outcome: 'stamina'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log(result.getContent());
}
