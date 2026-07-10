// ═══════════════════════════════════════════════════════════════
// HEALTH FUNCTIONAL FOOD TEMPLATE
// 역할: 기능성 인정 식품의 섹션 구조 정의
// 특징: 임상 데이터 중심, 정확한 함량 강조
// ═══════════════════════════════════════════════════════════════

export const HEALTH_FUNCTIONAL_FOOD_TEMPLATE = {
  structure: [
    {
      order: 1,
      sectionId: "hero",
      displayName: "Hero - 기능성 인정",
      purpose: "건강 수치 개선 필요성과 과학적 솔루션",
      goal: "\"이 제품은 식약처에서 인정한 기능성이 있습니다\"를 명확히",
      wordCount: "50-80자",
      role: "신뢰 형성"
    },
    
    {
      order: 2,
      sectionId: "healthConcern",
      displayName: "건강 우려사항",
      purpose: "건강 수치 개선의 필요성 명시",
      goal: "혈당, 혈압 등 의학적 관심사 언급 (일반식품과의 차이)",
      wordCount: "100-130자",
      role: "기능성 필요성 강조"
    },
    
    {
      order: 3,
      sectionId: "approvedFunctionality",
      displayName: "기능성 인정 사항",
      purpose: "식약처 인정 기능성 명시",
      goal: "\"[기능명]에 대해 식약처에서 인정받았습니다\"",
      wordCount: "80-120자",
      role: "신뢰도 확보"
    },
    
    {
      order: 4,
      sectionId: "ingredientClinical",
      displayName: "원료와 임상 데이터",
      purpose: "주 원료가 어떤 임상 데이터를 가지는지",
      goal: "논문 수, 임상시험 결과, 연구기관 명시",
      wordCount: "120-150자",
      role: "과학적 신뢰"
    },
    
    {
      order: 5,
      sectionId: "dosageJustification",
      displayName: "함량과 용량의 과학적 근거",
      purpose: "왜 이 함량과 이 용량인지 설명",
      goal: "\"임상에서 효과가 있던 [X]mg\", \"1일 [Y]회\"",
      wordCount: "110-140자",
      role: "효과 기대"
    },
    
    {
      order: 6,
      sectionId: "manufacturingStandard",
      displayName: "제조 기준과 안전성",
      purpose: "의약품 수준의 제조 기준",
      goal: "GMP, 중금속/미생물 검사 등 의약품 기준",
      wordCount: "100-130자",
      role: "안전성 확보"
    },
    
    {
      order: 7,
      sectionId: "properUsage",
      displayName: "올바른 섭취 방법",
      purpose: "기능성을 발현하기 위한 정확한 용법",
      goal: "\"1일 2캡슐을 물과 함께 섭취\", \"최소 4주 이상\"",
      wordCount: "100-130자",
      role: "효과 보장"
    },
    
    {
      order: 8,
      sectionId: "continuedUse",
      displayName: "지속적 섭취의 중요성",
      purpose: "건강기능식품은 꾸준함이 중요",
      goal: "\"3개월 이상 지속 섭취 권장\", \"개인차 있음\"",
      wordCount: "80-110자",
      role: "구매 의욕 + 현실적 기대치"
    }
  ]
};

export const healthFunctionalFoodTemplate = HEALTH_FUNCTIONAL_FOOD_TEMPLATE;
