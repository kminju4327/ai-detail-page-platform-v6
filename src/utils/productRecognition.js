// ═══════════════════════════════════════════════════════════════
// PRODUCT RECOGNITION
// 역할: 제품이 일반 건강식품인지 건강기능식품인지 판별
// ═══════════════════════════════════════════════════════════════

/**
 * 판별 로직:
 * 1. 명확한 키워드로 먼저 판별
 * 2. 애매하면 사용자에게 질문
 * 3. 카테고리 정보 활용
 */

// ═══════════════════════════════════════════════════════════════
// 건강기능식품 명확한 키워드
// ═══════════════════════════════════════════════════════════════
const HEALTH_FUNCTIONAL_KEYWORDS = [
  // 명확한 기능성 표현
  "혈당",
  "혈압",
  "콜레스테롤",
  "항산화",
  "면역력",
  "간 건강",
  "뼈 건강",
  "눈 건강",
  "장 건강",
  "피부 건강",
  
  // 인정된 원료
  "루테인",
  "베타글루칸",
  "홍국쌀",
  "기능성",
  
  // 명시적 인정
  "식약처 인정",
  "기능식",
  "건강기능"
];

// ═══════════════════════════════════════════════════════════════
// 일반 건강식품 명확한 키워드
// ═══════════════════════════════════════════════════════════════
const GENERAL_HEALTH_FOOD_KEYWORDS = [
  // 순수 식품 표현
  "비타민",
  "미네랄",
  "오메가",
  "프로바이오틱",
  "효소",
  "식물성",
  "천연",
  "유기농",
  
  // 원료명
  "홍삼",
  "인삼",
  "영지버섯",
  "당귀",
  "황련",
  "가시오가피",
  "알티지",
  "생선유",
  "아마씨",
  
  // 일반 식품 표현
  "보조식품",
  "영양제",
  "건강식품",
  "건강보조식품"
];

// ═══════════════════════════════════════════════════════════════
// 카테고리별 기본값
// ═══════════════════════════════════════════════════════════════
const CATEGORY_PRODUCT_TYPE = {
  "건강기능식품": "HEALTH_FUNCTIONAL",
  "건강관리 식품": "GENERAL_HEALTH_FOOD", // 서브카테고리로 구분
  "신선식품": "GENERAL_FOOD",
  "가공식품": "GENERAL_FOOD"
};

// ═══════════════════════════════════════════════════════════════
// 메인 함수
// ═══════════════════════════════════════════════════════════════

/**
 * 제품 유형 판별
 * @param {string} productName - 제품명
 * @param {string} subCategory - 서브 카테고리
 * @param {object} userInput - 사용자 입력 (benefits, functionality 등)
 * @returns {object} {
 *   type: "HEALTH_FUNCTIONAL" | "GENERAL_HEALTH_FOOD" | "UNKNOWN",
 *   confidence: 0-100,
 *   reason: "판별 근거",
 *   needsQuestion: boolean,
 *   question: "사용자 질문 (필요시)"
 * }
 */
export function recognizeProductType(productName, subCategory = "", userInput = {}) {
  let type = "UNKNOWN";
  let confidence = 0;
  let reason = "";

  // ─────────────────────────────────────────────────────────────
  // Step 1: 카테고리 기반 판별
  // ─────────────────────────────────────────────────────────────
  if (subCategory) {
    const categoryHint = CATEGORY_PRODUCT_TYPE[subCategory];
    if (categoryHint === "HEALTH_FUNCTIONAL") {
      type = "HEALTH_FUNCTIONAL";
      confidence = 70;
      reason = `카테고리: ${subCategory}`;
    } else if (categoryHint === "GENERAL_HEALTH_FOOD") {
      type = "GENERAL_HEALTH_FOOD";
      confidence = 70;
      reason = `카테고리: ${subCategory}`;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Step 2: 키워드 기반 판별
  // ─────────────────────────────────────────────────────────────
  const productText = (productName + " " + (userInput.benefits || "")).toLowerCase();

  const healthFunctionalMatches = HEALTH_FUNCTIONAL_KEYWORDS.filter((keyword) =>
    productText.includes(keyword.toLowerCase())
  ).length;

  const generalHealthMatches = GENERAL_HEALTH_FOOD_KEYWORDS.filter((keyword) =>
    productText.includes(keyword.toLowerCase())
  ).length;

  if (healthFunctionalMatches > generalHealthMatches && healthFunctionalMatches > 0) {
    type = "HEALTH_FUNCTIONAL";
    confidence = Math.min(95, 60 + healthFunctionalMatches * 10);
    reason = `키워드 매칭: ${HEALTH_FUNCTIONAL_KEYWORDS.filter((k) =>
      productText.includes(k.toLowerCase())
    ).join(", ")}`;
  } else if (generalHealthMatches > healthFunctionalMatches && generalHealthMatches > 0) {
    type = "GENERAL_HEALTH_FOOD";
    confidence = Math.min(95, 60 + generalHealthMatches * 10);
    reason = `키워드 매칭: ${GENERAL_HEALTH_FOOD_KEYWORDS.filter((k) =>
      productText.includes(k.toLowerCase())
    ).join(", ")}`;
  }

  // ─────────────────────────────────────────────────────────────
  // Step 3: 신뢰도 판단 및 질문 필요성
  // ─────────────────────────────────────────────────────────────
  const needsQuestion = confidence < 60;

  return {
    type,
    confidence,
    reason: reason || "판별할 수 없음",
    needsQuestion,
    question: needsQuestion
      ? "이 제품은 다음 중 어떤 종류인가요?\n- 일반 건강식품 (일반 보조식품, 비타민 등)\n- 건강기능식품 (식약처 인정 기능성, 임상 데이터 있음)"
      : undefined
  };
}

// ═══════════════════════════════════════════════════════════════
// 헬퍼 함수: 제품 유형 확신도 높이기
// ═══════════════════════════════════════════════════════════════

export function hasApprovalIndicators(userInput = {}) {
  /**
   * 건강기능식품임을 나타내는 지표
   * - 임상 데이터 제공
   * - 정확한 함량 제시
   * - 기능성 인정 명시
   * - 국가 인증 언급
   */
  const indicators = {
    hasClinicalData: !!(
      userInput.clinicalData ||
      userInput.researchPeriod ||
      userInput.studyCount
    ),
    hasExactDosage: !!(userInput.dosage || userInput.dailyAmount),
    mentionsFunctionality: !!(
      userInput.benefits &&
      /혈당|혈압|콜레스테롤|항산화|면역|건강/i.test(userInput.benefits)
    ),
    mentionsApproval: !!(
      userInput.certification ||
      /식약처|인정|기능식/i.test(userInput.benefits || "")
    )
  };

  return indicators;
}

export function suggestProductType(userInput = {}) {
  /**
   * 사용자 입력 기반 제품 유형 제안
   */
  const indicators = hasApprovalIndicators(userInput);

  if (indicators.hasClinicalData || indicators.mentionsApproval) {
    return "HEALTH_FUNCTIONAL";
  }

  if (
    indicators.hasExactDosage &&
    !indicators.hasClinicalData &&
    !indicators.mentionsApproval
  ) {
    return "GENERAL_HEALTH_FOOD";
  }

  return "UNKNOWN";
}

// ═══════════════════════════════════════════════════════════════
// 타입별 생성 프롬프트 선택
// ═══════════════════════════════════════════════════════════════

export function getPromptByType(type) {
  if (type === "HEALTH_FUNCTIONAL") {
    return "buildHealthFunctionalFoodPrompt";
  } else if (type === "GENERAL_HEALTH_FOOD") {
    return "buildGeneralHealthFoodPrompt";
  }
  return null;
}

export function getBrainByType(type) {
  if (type === "HEALTH_FUNCTIONAL") {
    return "healthFunctionalFoodBrain";
  } else if (type === "GENERAL_HEALTH_FOOD") {
    return "generalHealthFoodBrain";
  }
  return null;
}

export default {
  recognizeProductType,
  hasApprovalIndicators,
  suggestProductType,
  getPromptByType,
  getBrainByType
};
