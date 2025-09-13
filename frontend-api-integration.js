// 프론트엔드에서 Google Apps Script API 호출하는 코드
// src/app/page.tsx의 handleContactSubmit 함수에 추가할 코드

const handleContactSubmit = async (e) => {
  e.preventDefault();
  
  // 휴대폰 번호 및 학년 필수 검증
  if (!contactInfo.phone.trim() || !contactInfo.grade) {
    console.log('Phone number or grade is empty, showing toast');
    setShowToast(true);
    setTimeout(() => {
      console.log('Hiding toast');
      setShowToast(false);
    }, 3000);
    return;
  }
  
  try {
    // 점수 계산 및 결과 결정
    const scores = calculateScores(answers);
    const determinedOutcome = determineOutcome(scores);
    
    // Google Apps Script API 호출
    const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL_HERE', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: contactInfo.phone,
        grade: contactInfo.grade,
        outcome: determinedOutcome
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Data saved successfully:', result.data);
      // 성공적으로 저장되면 결과 페이지로 이동
      setOutcome(determinedOutcome);
      setCurrentStep('result');
    } else {
      console.error('Failed to save data:', result.error);
      // 에러 발생 시에도 결과는 보여주기 (사용자 경험을 위해)
      setOutcome(determinedOutcome);
      setCurrentStep('result');
    }
    
  } catch (error) {
    console.error('API call failed:', error);
    // 네트워크 에러 등이 발생해도 결과는 보여주기
    const scores = calculateScores(answers);
    const determinedOutcome = determineOutcome(scores);
    setOutcome(determinedOutcome);
    setCurrentStep('result');
  }
};
