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
    name: '',
    phone: '',
    email: ''
  });

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 디버깅을 위해 API 호출 우회
    console.log('Quiz Data:', { answers, contactInfo });
    
    // 점수 계산 및 결과 결정
    const scores = calculateScores(answers);
    const determinedOutcome = determineOutcome(scores);
    
    setOutcome(determinedOutcome);
    setCurrentStep('result');
  };

  const handleRestart = () => {
    setCurrentStep('cover');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setOutcome(null);
    setContactInfo({ name: '', phone: '', email: '' });
  };

  // Cover Page
  if (currentStep === 'cover') {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto md:max-w-2xl lg:max-w-4xl">
          <div className="md:min-h-screen md:flex md:items-center md:justify-center">
            <div className="w-full md:max-w-md">
              <div className="px-6 py-12 text-center">
                {/* 3D Study Icon */}
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                  예체능 입시생을 위한<br />
                  2분 학습 습관 테스트
                </h1>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">간단한 테스트 - 2분 만에 확인하는 나의 학습 습관</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">솔루션: 나의 공부 성향을 분석하여 맞춤 전략을 전달해드릴게요</span>
                  </div>
                </div>

                {/* Start Button */}
                <button
                  onClick={handleStartQuiz}
                  className="w-full bg-orange-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-colors"
                >
                  진단 시작하기
                </button>
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
              <div className="px-6 py-8">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>진행률</span>
                    <span>{currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    {currentQuestion.title}
                  </h2>
                  
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => handleAnswerSelect(option.key)}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-colors ${
                          selectedAnswer === option.key
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-medium">{option.key}.</span> {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex space-x-3">
                  {currentQuestionIndex > 0 && (
                    <button
                      onClick={handlePrevious}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      이전
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-colors ${
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
    );
  }

  // Contact Page
  if (currentStep === 'contact') {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto md:max-w-2xl lg:max-w-4xl">
          <div className="md:min-h-screen md:flex md:items-center md:justify-center">
            <div className="w-full md:max-w-md">
              <div className="px-6 py-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  연락처를 입력해주세요
                </h2>

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      휴대폰 번호 *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="010-1234-5678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이름 (선택)
                    </label>
                    <input
                      type="text"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="홍길동"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 (선택)
                    </label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="example@email.com"
                    />
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-gray-100 p-4 rounded-xl">
                    <p className="text-sm text-gray-600">
                      입력하신 연락처 및 개인정보는 진단 결과 제공 목적으로만 사용되어요.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-colors"
                  >
                    진단 결과 확인하기
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
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
              <div className="sticky top-0 bg-white px-6 py-2">
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
              
              <div className="px-6 py-4">
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
                  <div className="bg-orange-50 p-6 rounded-xl mb-4">
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
                    <div className="bg-white p-3 rounded-lg border border-orange-200">
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
                  href="/counsel"
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