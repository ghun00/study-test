'use client';

import { useState } from 'react';
import { QuizAnswer, OutcomeType } from '@/types/quiz';
import { QUIZ_QUESTIONS } from '@/lib/constants';
import { calculateScores, determineOutcome } from '@/lib/scoring';
import { OUTCOME_CONTENTS } from '@/lib/outcomes';

type QuizStep = 'cover' | 'quiz' | 'contact' | 'result';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<QuizStep>('cover');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<OutcomeType | null>(null);
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    grade: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
  };

  const handleAnswerSelect = (optionKey: string) => {
    setSelectedAnswer(optionKey);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedOption: selectedAnswer
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setCurrentStep('contact');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]?.selectedOption || null);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
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
    
    setIsSubmitting(true);
    
    try {
      // 점수 계산 및 결과 결정
      const scores = calculateScores(answers);
      const determinedOutcome = determineOutcome(scores);
      
      // Google Apps Script API 호출 (URL 파라미터 방식)
      const params = new URLSearchParams();
      params.append('phone', contactInfo.phone);
      params.append('grade', contactInfo.grade);
      params.append('outcome', determinedOutcome);
      
      // Google Apps Script API 호출 (GET 방식)
      await fetch(`https://script.google.com/macros/s/AKfycbz5D6jUZc6deEXtRorLMnDsqyb9kuos6cyGrBHxrb2BDdvG-PTNndZhudZKILqt5iCd_Q/exec?${params}`, {
        method: 'GET',
        mode: 'no-cors'
      });
      
      console.log('Data sent to Google Sheets');
      // no-cors 모드에서는 응답을 읽을 수 없으므로 항상 성공으로 처리
      setOutcome(determinedOutcome);
      setCurrentStep('result');
      
    } catch (error) {
      console.error('API call failed:', error);
      // 네트워크 에러 등이 발생해도 결과는 보여주기
      const scores = calculateScores(answers);
      const determinedOutcome = determineOutcome(scores);
      setOutcome(determinedOutcome);
      setCurrentStep('result');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setCurrentStep('cover');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setOutcome(null);
    setContactInfo({ phone: '', grade: '' });
  };

  // Cover Page
  if (currentStep === 'cover') {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto md:max-w-2xl lg:max-w-4xl">
          <div className="md:min-h-screen md:flex md:items-center md:justify-center">
            <div className="w-full md:max-w-md">
              <div className="px-4 py-12 text-center">
                {/* 3D Study Icon */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-inner">
                      <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  </div>
                  {/* Floating elements for 3D effect */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-orange-300 rounded-full animate-bounce"></div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  예체능 입시생을 위한<br />
                  <span className="text-orange-500">2분 학습 습관 테스트</span>
                </h1>
              </div>

              {/* Features */}
              <div className="px-4 space-y-6 mb-12">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">간단한 테스트</h3>
                    <p className="text-gray-600 text-sm">2분 만에 확인하는 나의 학습 습관</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">솔루션</h3>
                    <p className="text-gray-600 text-sm">나의 공부 성향을 분석하여 맞춤 전략을 전달해드릴게요</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="px-4">
                <button
                  onClick={handleStartQuiz}
                  className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  테스트 시작하기
                </button>
              </div>

              {/* Footer */}
              <div className="px-4 text-center mt-8">
                <p className="text-gray-500 text-sm">
                  무료 테스트 · 개인정보 보호 · 즉시 결과 확인
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Page
  if (currentStep === 'quiz') {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto md:max-w-2xl lg:max-w-4xl">
          <div className="md:min-h-screen md:flex md:items-center md:justify-center">
            <div className="w-full md:max-w-md">
              <div className="px-4 py-8">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>진행률</span>
                    <span>{currentQuestionIndex + 1}/{QUIZ_QUESTIONS.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    {currentQuestion.title}
                  </h2>
                  
                  <div className="space-y-3 mb-8">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => handleAnswerSelect(option.key)}
                        className={`w-full p-4 text-left border rounded-xl transition-colors duration-200 ${
                          selectedAnswer === option.key
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:bg-orange-50 hover:border-orange-200'
                        }`}
                      >
                        <span className="font-medium text-gray-900">
                          {option.key}. {option.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-3">
                    {currentQuestionIndex > 0 && (
                      <button
                        onClick={handlePrevious}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                      >
                        이전
                      </button>
                    )}
                    <button
                      onClick={handleNext}
                      disabled={!selectedAnswer}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-colors duration-200 ${
                        selectedAnswer
                          ? 'bg-orange-500 text-white hover:bg-orange-600'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? '완료' : '다음'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Contact Page
  if (currentStep === 'contact') {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto md:max-w-2xl lg:max-w-4xl">
          <div className="md:min-h-screen md:flex md:items-center md:justify-center">
            <div className="w-full md:max-w-md">
              <div className="px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    연락처를 입력해주세요
                  </h1>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600">
                      입력하신 연락처 및 개인정보는 진단 결과 제공과 이벤트 제공 목적으로만 사용돼요.
                    </p>
                  </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      학년 <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['고1', '고2', '고3', '재수', 'N수'].map((grade) => (
                        <button
                          key={grade}
                          type="button"
                          onClick={() => setContactInfo({ ...contactInfo, grade })}
                          className={`px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                            contactInfo.grade === grade
                              ? 'border-orange-500 bg-orange-50 text-orange-700 font-semibold'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-25'
                          }`}
                        >
                          {grade}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      휴대폰 번호 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      placeholder="010-1234-5678"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                      isSubmitting
                        ? 'bg-orange-300 text-white cursor-not-allowed'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>분석 중...</span>
                      </>
                    ) : (
                      <span>진단 결과 확인하기</span>
                    )}
                  </button>
                </form>

                <button
                  onClick={() => setCurrentQuestionIndex(QUIZ_QUESTIONS.length - 1)}
                  className="w-full mt-4 text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors duration-200"
                >
                  ← 이전으로 돌아가기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Alert */}
        {showToast && (
          <div className="fixed top-12 left-12 right-12 z-[9999] animate-pulse">
            <div className="bg-red-500 text-white px-4 py-2 rounded-xl shadow-2xl border-2 border-red-600">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-sm">학년과 연락처를 입력해주세요</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Result Page
  if (currentStep === 'result' && outcome) {
    const content = OUTCOME_CONTENTS[outcome];
    const outcomeLabels = {
      stamina: '체력 소진형',
      routine: '루틴 붕괴형', 
      focus: '집중 단절형',
      overload: '자기주도 과부하형'
    };
    
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto md:max-w-2xl lg:max-w-4xl">
          <div className="md:min-h-screen md:flex md:items-center md:justify-center">
            <div className="w-full md:max-w-md">
              {/* App Bar */}
              <div className="sticky top-0 bg-white px-4 py-2">
                <div className="flex items-center">
                  <button
                    onClick={() => setCurrentStep('contact')}
                    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="px-4 py-4">
                {/* Diagnosis Type */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-2xl text-white mb-4">
                  <h2 className="text-xl font-bold mb-2">
                    진단 유형: {outcomeLabels[outcome]}
                  </h2>
                  <p className="text-orange-100 text-sm">
                    {content.headline}
                  </p>
                </div>

                {/* Report Content */}
                <div className="space-y-4">
                  {/* Problem Analysis */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-red-500 text-xs">!</span>
                      </span>
                      문제 분석
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {content.problem}
                    </p>
                  </div>

                  {/* Solutions */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-500 text-xs">✓</span>
                      </span>
                      개선 방안
                    </h3>
                    <ul className="space-y-3">
                      {content.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-5 h-5 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 text-sm leading-relaxed">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Academy Management */}
                  <div className="bg-orange-50 p-6 rounded-xl mb-24">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-orange-500 text-xs">🏫</span>
                      </span>
                      ST예인에서는 이렇게 실행하고 있어요
                    </h3>
                    <ul className="space-y-3 mb-4">
                      {content.academyManagement.methods.map((method, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 text-sm leading-relaxed">{method}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-white p-3 rounded-lg border border-orange-200 mb-4">
                      <p className="text-xs text-orange-600 font-medium">
                        {content.academyManagement.measurements}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating CTA Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-4">
          <div className="max-w-md mx-auto md:max-w-2xl lg:max-w-4xl">
            <div className="md:min-h-screen md:flex md:items-center md:justify-center">
              <div className="w-full md:max-w-md">
                <a
                  href="https://naver.me/FvQ8qPej"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-center hover:bg-orange-600 transition-colors duration-200"
                >
                  {content.ctaText}
                </a>
                <button
                  onClick={handleRestart}
                  className="w-full text-gray-500 py-3 text-sm hover:text-gray-700 transition-colors duration-200 mt-2"
                >
                  다시 진단하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
