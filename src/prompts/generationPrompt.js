// BRAND ENGINE V5 generation prompt
// 핵심: 기존 Health Template 치환 방식 제거, Brain 기반으로 처음부터 생성.

import { buildGenerationConstraint } from "../compliance/categoryRules.js";
import { buildProductBlock, buildNumericGuidance } from "./numericGuidance.js";
import { getBrain as getBrainConfig } from "../data/brainConfigs.js";
import { getProductKnowledge, getSafeProductFeatures } from "../data/productKnowledge.js";

export const DETAIL_PAGE_SCHEMA = `{"hero_headline":"string","hero_subcopy":"string","sections":[{"type":"problem|solution|objection_handling|benefit_list|how_to_use|trust_badges|section","title":"string","body":"string","items":["string"]}]}`;

function buildBrainBlock(product) {
  const brain = getBrainConfig(product.mainCategory, product.subCategory, product.name);
  if (!brain) return "";
  return `\n[Selected Product Type Brain]\nBrain: ${brain.name}\nCopy Tone: ${brain.copyTone}\nKey Elements: ${brain.keyElements?.join(", ") || ""}\nPersuasion Points:\n${brain.persuasionPoints?.map((p, i) => `${i + 1}. ${p.label} (${p.score}%)`).join("\n") || ""}\nStory Flow:\n${brain.storyFlow?.map((s, i) => `${i + 1}. ${s}`).join("\n") || ""}\nWriting Rules:\n${brain.writingRules?.map(r => `- ${r}`).join("\n") || ""}\nExample Sentences:\n${brain.exampleSentences?.map(s => `- ${s}`).join("\n") || ""}\nForbidden Words:\n${brain.forbiddenWords?.join(", ") || ""}\nForbidden Patterns:\n${brain.forbiddenPatterns?.join(", ") || ""}\n`;
}

function buildProductKnowledgeBlock(product) {
  const knowledge = getProductKnowledge(product.name);
  const safeFeatures = getSafeProductFeatures(product.name);
  if (!knowledge && !safeFeatures) return "";
  
  const safeQualitiesStr = safeFeatures?.qualities?.join(", ") || "";
  const safeUsagesStr = safeFeatures?.usages?.join(", ") || "";
  const safeFeelingsStr = safeFeatures?.feelings?.join(", ") || "";
  
  return `\n[Product Knowledge / Safe Auto Fill]\n사용자 입력이 부족하면 아래의 일반적으로 적용 가능한 특징만 보완하세요.\nSafe Qualities: ${safeQualitiesStr}\nSafe Usages: ${safeUsagesStr}\nSafe Feelings: ${safeFeelingsStr}\nCommon Qualities: ${knowledge?.commonQualities?.join(", ") || ""}\nCommon Usages: ${knowledge?.commonUsages?.join(", ") || ""}\nCommon Feelings: ${knowledge?.commonFeelings?.join(", ") || ""}\nAvoid Words: ${knowledge?.avoidWords?.join(", ") || "당도 수치, 원산지, 인증, 특정 등급, 함량 수치 등 확인 불가능한 정보"}\n`;
}

export function buildGenerationPrompt(product) {
  const categoryConstraint = buildGenerationConstraint(product.category);
  const productBlock = buildProductBlock({
    ...product,
    benefits: product.benefits || "미입력 - 제품명과 Brain Knowledge 기반으로 안전하게 보완",
  });
  const hasNumeric = product.purity || product.actualAmount || product.epa || product.dha;
  const numericGuidance = hasNumeric ? buildNumericGuidance(product) : "";
  const brainBlock = buildBrainBlock(product);
  const productKnowledgeBlock = buildProductKnowledgeBlock(product);
  const isHealth = product.category === "건강기능식품";

  // ═══════════════════════════════════════════════════════════════
  // 섹션별 상세 작성 지시
  // ═══════════════════════════════════════════════════════════════
  const sectionWritingGuide = `
[섹션별 카피 작성 지시 - 반드시 새로운 문장을 작성하세요]

1. hero_headline (50-80자)
   목적: 고객의 작은 불편함을 인정하고, 관리로 해결 가능함을 암시
   작성원칙:
   - 고객의 감정이나 일상 상황부터 시작
   - "관리", "습관", "선택" 같은 능동적 단어 사용
   - "저녁이 되면 피곤하다", "눈이 자주 침침하다" 같은 구체적 상황으로 공감
   금지: "고객의 작은 불편함을 인정하고" 같은 설명 문장 절대 금지
   예: "저녁이 되면 피곤한 당신, 작은 관리로 시작해보세요"

2. problem 섹션 (120-160자)
   목적: 구체적 일상 상황을 통해 공감하되, 문제로 진단하지 않기
   작성원칙:
   - 실제 고객이 겪는 일상의 불편함을 구체적으로 묘사
   - "많은 분들이...", "당신도 경험하실 거예요" 식의 공감 톤
   - 질병이나 증상처럼 표현 금지
   금지: "고객의 일상 고민을 중심으로" 같은 템플릿 설명 절대 금지
   예: "저녁이 되면 몸이 무거워지는 경험, 혼자가 아닙니다. 많은 분들이 같은 고민을 합니다. 원료를 믿고 꾸준히 관리하는 것이 답입니다."

3. ingredient 섹션 (100-150자)
   목적: 주 원료가 무엇이고, 왜 신뢰할 수 있는 원료인지 전달
   작성원칙:
   - 원료명을 먼저 소개
   - "10년 이상의 연구", "국제 학술지 발표" 등 신뢰 근거 제시
   - 원료의 역사나 국제적 인정 강조
   금지: "핵심 원료의 가치를 중심으로" 같은 설명 문장 절대 금지
   예: "[원료명]은 20년 이상 국제 학술지에 발표된 원료입니다. 50개국 이상에서 신뢰받으며, 엄격한 품질 기준을 통과한 원료만 사용합니다."

4. trustHistory 섹션 (100-150자)
   목적: 원료의 연구 역사, 학술 발표, 국제적 인정을 통해 신뢰도 증명
   작성원칙:
   - 원료의 구체적 연구 배경 설명
   - "Nature", "Lancet" 같은 저명 학술지 언급 (가능한 경우만)
   - 임상 데이터나 논문 발표 강조
   금지: "원료의 신뢰도와 역사" 같은 헤더 설명 금지, 실제 카피만
   예: "이 원료는 2015년부터 국제 학술지에 발표되기 시작했으며, 현재까지 150건 이상의 연구논문이 존재합니다. 대학 연구팀과의 임상 협력으로 신뢰성을 확보했습니다."

5. formula 섹션 (120-160자)
   목적: 왜 이 함량으로, 이렇게 배합했는가를 통해 과학성 전달
   작성원칙:
   - 배합 의도를 설명 (단순 수치가 아닌 '왜')
   - "흡수율을 높이기 위해", "상승 작용을 위해" 같은 과학적 근거
   - 단순히 함량만 나열하지 말기
   금지: "함량 및 배합의 의도" 같은 제목 설명 절대 금지
   예: "단순히 원료를 많이 넣는 것이 아닙니다. 흡수율을 최적화하기 위해 [원료A]와 [원료B]를 7:3의 비율로 배합했습니다. 각 원료가 상승 작용하도록 설계된 조합입니다."

6. manufacturing 섹션 (120-160자)
   목적: 인증, 검사, 기준을 통해 원료를 제대로 만들었음을 증명
   작성원칙:
   - GMP, HACCP 같은 실제 인증 명시
   - 정기적 품질 검사 내용
   - 제조 과정의 엄격함 강조
   금지: "제조 신뢰와 품질 관리" 같은 설명 문장 금지
   예: "GMP 인증 시설에서 제조되며, 원료부터 완성품까지 매 단계마다 검사합니다. 중금속, 미생물, 농약 잔류 검사를 정기적으로 실시하여 안전성을 확보합니다."

7. routine 섹션 (100-140자)
   목적: 섭취법을 통해 '매일의 습관', '일관성'을 강조
   작성원칙:
   - 구체적 섭취 방법 (1일 1회, 물과 함께 등)
   - "매일", "꾸준히", "습관처럼" 같은 일상화 톤
   - "4주 후 변화" 같은 결과 보장 표현 금지
   금지: "일상의 관리 루틴" 같은 설명 문장 금지
   예: "아침 식사 후, 물과 함께 1회 섭취하세요. 가장 중요한 것은 꾸준함입니다. 며칠이 아니라 매일, 습관처럼 섭취할 때 의미가 있습니다."

[공통 주의사항]
✓ 위의 설명(목적, 작성원칙)은 지시일 뿐, 최종 결과에 포함되면 안 됩니다
✓ 각 섹션마다 80-150자의 자연스러운 브랜드 카피를 새로 작성하세요
✓ 제품/원료를 모르면 ${product.name} 기반 안전한 표현만 사용
✓ 고객에게 직접 말하는 톤 (2인칭)으로 작성
✓ 템플릿의 설명이나 예시를 그대로 출력하지 마세요
`;

  return `당신은 BRAND ENGINE V5의 AI Commerce Brain입니다.
기존 고정 템플릿을 채우지 말고, 제품을 이해한 뒤 처음부터 상세페이지 문장을 작성하세요.

[제품 정보]
${productBlock}
제품 분류: ${product.mainCategory || ""} > ${product.subCategory || ""}

${brainBlock}
${productKnowledgeBlock}
[제품 카테고리 제약 - ${product.category}]
${categoryConstraint}

${numericGuidance}

[Core Rules]
1. 제품명만 있어도 생성 가능해야 합니다. 핵심 장점이 비어 있으면 Product Knowledge와 Brain의 keyElements를 사용해 안전하게 보완하세요.
2. 확인 불가능한 수치, 원산지, 인증, 등급, 당도, 함량은 절대 생성하지 마세요.
3. 같은 단어와 같은 문장 구조를 반복하지 마세요.
4. 실제 프리미엄 쇼핑몰 상세페이지처럼 설득 중심으로 작성하세요.
5. Hero부터 CTA까지 모두 새로 작성하세요. "이게 우리의 기준입니다", "이제 시작해보세요" 같은 고정 문구를 사용하지 마세요.
${isHealth ? "6. 건강기능식품은 기능성, 원료, 함량, 섭취 방법을 법적 표현 범위 내에서 명확하게 다룰 수 있습니다." : "6. 건강기능식품이 아닌 카테고리에서는 원료, 함량, 섭취방법, 매일 챙기기, 4주, 기능성, 건강 루틴 표현을 절대 사용하지 마세요."}

${sectionWritingGuide}

반드시 아래 JSON 형식으로만 답하세요. 설명 문구 없이 JSON만.
${DETAIL_PAGE_SCHEMA}`;
}
