// 제품명을 기반으로 일반적으로 적용 가능한 특징을 자동 보완
// 확인할 수 없는 정보(원산지, 인증, 수치)는 절대 포함하지 않음

export const PRODUCT_KNOWLEDGE_BASE = {
  // ============================================================
  // 신선식품 > 과일
  // ============================================================
  과일: {
    commonQualities: [
      "신선하게 선별한",
      "자연스러운 단맛",
      "풍부한 과즙",
      "아삭한 식감",
    ],
    commonUsages: [
      "식탁 위의 일상",
      "가족과 함께 즐기기",
      "특별한 선물",
    ],
    commonFeelings: [
      "신선함이 먼저 느껴지는",
      "먹기 좋은 크기",
      "손으로 집어먹기 편한",
    ],
    copytone: "신선하고 자연스러운 톤",
    avoidWords: ["당도", "브릭스", "당일", "프리미엄", "특등급"],
  },

  배: {
    commonQualities: [
      "아삭한 식감",
      "풍부한 과즙",
      "은은한 단맛",
      "부드러운 목넘김",
    ],
    commonUsages: [
      "가을 제철 과일",
      "선물하기 좋은",
      "가족 식탁",
    ],
    commonFeelings: [
      "한 입 베어 무는 순간의 신선함",
      "자연스러운 단맛",
      "불필요한 것 없는 순수함",
    ],
    storyElements: ["재배 환경", "선별 기준", "신선한 상태 유지"],
    copytone: "세련되고 자연스러운",
  },

  사과: {
    commonQualities: [
      "아삭한 식감",
      "상큼한 풍미",
      "신선한 과즙",
      "깔끔한 단맛",
    ],
    commonUsages: [
      "아침 일상",
      "건강한 간식",
      "아이들도 좋아하는",
    ],
    commonFeelings: [
      "첫 입의 아삭함",
      "상큼함이 도는",
      "매일 손에 들고 싶은",
    ],
    storyElements: ["품종의 특성", "신선도", "보관 방법"],
    copytone: "친근하고 건강한",
  },

  포도: {
    commonQualities: [
      "탱탱한 식감",
      "달콤한 맛",
      "풍부한 과즙",
      "한입 크기",
    ],
    commonUsages: [
      "특별한 자리",
      "가족 모임",
      "프리미엄 선물",
    ],
    commonFeelings: [
      "한 송이의 우아함",
      "입 안에서 터지는 과즙",
      "보는 것만으로 즐거운",
    ],
    storyElements: ["재배 기술", "선별 과정", "신선 포장"],
    copytone: "우아하고 프리미엄한",
  },

  딸기: {
    commonQualities: [
      "신선한 붉은색",
      "달콤한 향",
      "부드러운 식감",
      "싱싱한 맛",
    ],
    commonUsages: [
      "제철의 맛",
      "어린이 간식",
      "특별한 디저트",
    ],
    commonFeelings: [
      "입 안에서 살살 녹는",
      "신선함 그 자체",
      "자연의 단맛",
    ],
    storyElements: ["제철 수확", "신선 배송", "보관 관리"],
    copytone: "싱싱하고 자연스러운",
  },

  // ============================================================
  // 축산물 > 소고기
  // ============================================================
  소고기: {
    commonQualities: [
      "신선한 색감",
      "적절한 마블링",
      "부드러운 식감",
      "풍부한 풍미",
    ],
    commonUsages: [
      "특별한 식탁",
      "가족 모임",
      "프리미엄 요리",
    ],
    commonFeelings: [
      "입 안에서 녹는 부드러움",
      "우아한 맛의 깊이",
      "신선함이 살아있는",
    ],
    storyElements: ["신선 상태", "위생 관리", "조리 방법"],
    copytone: "프리미엄하고 신뢰감 있는",
  },

  // ============================================================
  // 수산물 > 생선
  // ============================================================
  생선: {
    commonQualities: [
      "신선한 윤기",
      "깔끔한 맛",
      "부드러운 식감",
      "담백한 풍미",
    ],
    commonUsages: [
      "건강한 식탁",
      "일주일 단백질",
      "가족 식사",
    ],
    commonFeelings: [
      "신선함이 살아있는",
      "깔끔하게 즐기는",
      "자연의 맛",
    ],
    storyElements: ["신선도", "손질 여부", "보관 방법", "조리 팁"],
    copytone: "신선하고 신뢰감 있는",
  },

  연어: {
    commonQualities: [
      "선명한 오렌지색",
      "부드러운 식감",
      "풍부한 맛",
      "신선함",
    ],
    commonUsages: [
      "건강한 식단",
      "초밥 요리",
      "그릴 요리",
    ],
    commonFeelings: [
      "입 안에서 녹는 부드러움",
      "풍부한 바다의 맛",
      "신선함 그대로",
    ],
    storyElements: ["원산지 신뢰", "신선도 기준", "손질 상태"],
    copytone: "우아하고 건강한",
  },

  고등어: {
    commonQualities: [
      "신선한 광택",
      "진한 풍미",
      "건강한 맛",
      "탄력 있는 식감",
    ],
    commonUsages: [
      "일상 밥상",
      "건강한 단백질",
      "고소한 맛",
    ],
    commonFeelings: [
      "자연의 맛이 살아있는",
      "담백하면서도 풍부한",
      "신선함이 먼저 느껴지는",
    ],
    storyElements: ["신선 상태", "위생 처리", "조리 방법"],
    copytone: "자연스럽고 건강한",
  },

  // ============================================================
  // 음료 > 커피
  // ============================================================
  커피: {
    commonQualities: [
      "풍부한 향",
      "깊은 풍미",
      "로스팅의 매력",
      "부드러운 맛",
    ],
    commonUsages: [
      "아침의 시작",
      "일상의 여유",
      "특별한 시간",
    ],
    commonFeelings: [
      "한 잔의 가치",
      "향이 먼저 인사하는",
      "시간을 멈추게 하는",
    ],
    storyElements: ["원두의 특성", "로스팅", "향미 프로필", "추출 방법"],
    copytone: "감성적이고 경험 중심적인",
  },

  원두커피: {
    commonQualities: [
      "신선한 향",
      "깊이 있는 맛",
      "매력적인 로스팅",
      "복합적인 풍미",
    ],
    commonUsages: [
      "아침 루틴",
      "여유로운 시간",
      "고급 커피 경험",
    ],
    commonFeelings: [
      "향이 집을 채우는",
      "입 안의 여운",
      "매일 다시 마시고 싶은",
    ],
    storyElements: ["로스팅 정도", "원두의 배경", "추출 팁"],
    copytone: "우아하고 감각적인",
  },

  분쇄커피: {
    commonQualities: [
      "편리한 사용",
      "신선한 향",
      "깔끔한 추출",
      "일관된 맛",
    ],
    commonUsages: [
      "바쁜 아침",
      "간편한 경험",
      "직장 커피",
    ],
    commonFeelings: [
      "순간의 여유",
      "손쉬운 프리미엄",
      "매일의 소확행",
    ],
    storyElements: ["분쇄도", "신선도", "추출 가이드"],
    copytone: "실용적이면서도 세련된",
  },

  // ============================================================
  // 건강관리 식품 > 일반 건강식품
  // ============================================================
  루테인: {
    commonQualities: [
      "핵심 기능성 원료",
      "안전한 제조",
      "신뢰할 수 있는 배합",
      "꾸준한 관리 가능",
    ],
    commonUsages: [
      "일상 루틴",
      "눈 건강 관리",
      "꾸준한 섭취",
    ],
    commonFeelings: [
      "안심할 수 있는",
      "꼼꼼하게 준비한",
      "신뢰감 있는",
    ],
    storyElements: ["원료 품질", "배합의 이유", "일상에서의 활용"],
    copytone: "신뢰감 있고 따뜻한",
  },

  오메가3: {
    commonQualities: [
      "건강한 원료",
      "안전한 추출",
      "신뢰할 수 있는 제조",
      "일상의 선택",
    ],
    commonUsages: [
      "건강한 루틴",
      "가족 건강 관리",
      "매일의 습관",
    ],
    commonFeelings: [
      "꾸준함이 만드는 변화",
      "안심할 수 있는",
      "자연스러운 선택",
    ],
    storyElements: ["원료 신뢰성", "함량 투명성", "섭취 방법"],
    copytone: "신뢰감 있고 자연스러운",
  },

  홍삼: {
    commonQualities: [
      "전통의 원료",
      "안전한 제조",
      "오랜 신뢰성",
      "자연의 선택",
    ],
    commonUsages: [
      "건강 관리",
      "에너지 관리",
      "일상의 활력",
    ],
    commonFeelings: [
      "오랜 신뢰의 이유를 알 수 있는",
      "자연스러운 활력",
      "꾸준함의 가치",
    ],
    storyElements: ["전통 처방", "현대적 제조", "품질 관리"],
    copytone: "신뢰감 있고 따뜻한",
  },

  // ============================================================
  // 건강관리 식품 > 건강기능식품
  // ============================================================
  베르베린: {
    commonQualities: [
      "식약처 인정 기능성",
      "임상 근거",
      "신뢰할 수 있는 함량",
      "안전성 검증",
    ],
    commonUsages: [
      "혈당 관리",
      "건강한 루틴",
      "꾸준한 케어",
    ],
    commonFeelings: [
      "과학적 근거가 있는",
      "신뢰할 수 있는",
      "안심할 수 있는",
    ],
    storyElements: ["기능성 인정", "임상 데이터", "안전성", "함량 투명성"],
    copytone: "과학적이고 신뢰감 있는",
  },

  비타민D: {
    commonQualities: [
      "식약처 인정",
      "임상 데이터",
      "정확한 함량",
      "안전한 제조",
    ],
    commonUsages: [
      "건강한 관리",
      "계절 보충",
      "일상 건강",
    ],
    commonFeelings: [
      "과학이 뒷받침하는",
      "정확함이 느껴지는",
      "신뢰할 수 있는",
    ],
    storyElements: ["기능성", "임상 근거", "섭취 기준", "안전성"],
    copytone: "과학적이고 명확한",
  },

  프로바이오틱스: {
    commonQualities: [
      "식약처 인정 기능성",
      "신뢰할 수 있는 균주",
      "안전한 제조",
      "검증된 효과",
    ],
    commonUsages: [
      "장 건강",
      "소화 건강",
      "일상 건강 관리",
    ],
    commonFeelings: [
      "과학적 근거가 있는",
      "신뢰할 수 있는",
      "꾸준한 관리의 가치",
    ],
    storyElements: ["균주 정보", "기능성 인정", "임상 데이터"],
    copytone: "신뢰감 있고 과학적인",
  },
};

// 제품명으로 일반적인 특징 조회
export const getProductKnowledge = (productName) => {
  // 정확한 매칭
  if (PRODUCT_KNOWLEDGE_BASE[productName]) {
    return PRODUCT_KNOWLEDGE_BASE[productName];
  }

  // 부분 매칭 (제품명에 포함된 경우)
  for (const [key, value] of Object.entries(PRODUCT_KNOWLEDGE_BASE)) {
    if (productName.includes(key) || key.includes(productName)) {
      return value;
    }
  }

  // ✨ 정의되지 않은 제품은 제너릭 기본값 반환
  console.log(`⚠️ "${productName}"은 productKnowledge에 없습니다. 기본값 사용.`);
  return {
    commonQualities: [
      "신뢰할 수 있는 원료",
      "투명한 정보 공개",
      "엄격한 품질 기준",
      "안전한 제조 과정"
    ],
    commonUsages: [
      "일상의 건강 관리",
      "꾸준한 습관으로",
      "신뢰 기반의 선택"
    ],
    commonFeelings: [
      "신뢰감 있는",
      "안심할 수 있는",
      "믿을 수 있는",
      "투명한"
    ],
    avoidWords: [
      "효능", "치료", "예방", "질병", "약", "임상 증명",
      "기적", "확실한 효과", "100% 개선"
    ]
  };
};

// 제품 특징 중 Safe Auto Fill 항목만 추출
export const getSafeProductFeatures = (productName) => {
  const knowledge = getProductKnowledge(productName);
  if (!knowledge) return [];

  // 일반적으로 적용 가능한 특징만 반환
  return {
    qualities: knowledge.commonQualities || [],
    usages: knowledge.commonUsages || [],
    feelings: knowledge.commonFeelings || [],
  };
};

// 피해야 할 단어 목록 조회
export const getAvoidWords = (productName) => {
  const knowledge = getProductKnowledge(productName);
  return knowledge?.avoidWords || [];
};
