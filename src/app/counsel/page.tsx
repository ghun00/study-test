'use client';

import { useState } from 'react';

export default function CounselPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    grade: '',
    targetSchool: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      alert('이름과 휴대폰 번호는 필수입니다.');
      return;
    }

    // 여기서 실제 상담 신청 API를 호출하거나 외부 링크로 이동
    alert('상담 신청이 완료되었습니다. 곧 연락드리겠습니다.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <span className="text-white text-xl font-bold">🎨</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            미대 재수 <span className="text-orange-500">전문 상담</span>
          </h1>
          <p className="text-gray-600 text-lg">
            개인 맞춤형 학습 관리로 목표 대학 합격까지 함께합니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Features */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                우리 학원만의 특별한 관리 시스템
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      개인별 체력·컨디션 관리
                    </h3>
                    <p className="text-gray-600 text-sm">
                      실기 후 회복 루틴부터 학습 강도 조절까지, 개인의 체력 소모량에 맞춘 맞춤형 관리
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      루틴 복구 시스템
                    </h3>
                    <p className="text-gray-600 text-sm">
                      계획이 무너져도 빠르게 복구할 수 있는 특화된 플래너와 데일리 코칭 시스템
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      집중 지속 프로그램
                    </h3>
                    <p className="text-gray-600 text-sm">
                      환경 제어부터 집중/휴식 사이클까지, 끝까지 몰입할 수 있는 환경 조성
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      효율 기반 성장 설계
                    </h3>
                    <p className="text-gray-600 text-sm">
                      "많이"보다 "제대로"를 목표로 한 루틴 다이어트와 성취 기반 동기 강화
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-4">학원 실적</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">목표 대학 합격률</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">합격생 배출</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">15년</div>
                  <div className="text-sm text-gray-600">전문 경력</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">학습 관리</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                무료 상담 신청
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    placeholder="홍길동"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    휴대폰 번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    placeholder="010-1234-5678"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                    학년
                  </label>
                  <select
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  >
                    <option value="">선택해주세요</option>
                    <option value="고3">고3</option>
                    <option value="재수">재수</option>
                    <option value="N수">N수</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="targetSchool" className="block text-sm font-medium text-gray-700 mb-2">
                    목표 대학
                  </label>
                  <input
                    type="text"
                    id="targetSchool"
                    name="targetSchool"
                    value={formData.targetSchool}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    placeholder="홍익대학교 미술대학"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    상담 희망 내용
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none"
                    placeholder="궁금한 점이나 상담받고 싶은 내용을 자유롭게 작성해주세요"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-200"
                >
                  무료 상담 신청하기
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  상담 신청 시 개인정보 처리방침에 동의한 것으로 간주됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="bg-orange-500 text-white p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-orange-100 mb-6">
              개인 맞춤형 학습 관리로 목표 대학 합격까지 함께합니다
            </p>
            <a
              href="#contact-form"
              className="inline-block bg-white text-orange-500 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              상담 신청하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
