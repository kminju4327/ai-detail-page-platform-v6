# BRAND ENGINE V5 수정 요약

## 핵심 수정

1. 기존 Health Template 고정 출력 제거
- Mock 생성 함수에서 `이게 우리의 기준입니다`, `매일 챙기기`, `4주`, `원료와 함량`, `섭취 방법` 고정 문장 제거
- 제품명/카테고리/Brain 기반으로 Hero와 Section을 새로 생성하도록 변경

2. 제품명만으로 생성 가능
- `canGenerate` 조건을 `제품명`만 필수로 변경
- `핵심 장점` 입력 라벨을 선택 사항으로 변경
- 핵심 장점이 비어 있으면 Product Knowledge + Brain keyElements 기반으로 안전하게 보완

3. 건강 카테고리 명칭 변경
- UI 메인 카테고리를 `건강관리 식품`에서 `건강기능식품`으로 변경
- 기존 프로젝트에 저장된 `건강관리 식품` 데이터는 자동으로 `건강기능식품`으로 보정
- Health Brain은 건강기능식품 계열에서만 작동하도록 격리

4. Brain 연결 개선
- `getBrainConfig(mainCategory, subCategory, productName)` 형태로 호출
- 햇반/즉석밥/간편식 계열은 Rice/Instant Meal Brain으로 매핑
- 사과/배 등 과일은 Fresh Food Brain으로 매핑
- 카스테라는 Bakery Brain으로 매핑

5. Prompt V5 개선
- `src/prompts/generationPrompt.js`를 V5 구조로 교체
- Brain, Product Knowledge, Safe Auto Fill, 금지어, 예시 문장을 프롬프트에 전달
- 비건강식품에서는 원료/함량/섭취방법/4주/매일 챙기기/건강 루틴 표현 금지

## 테스트 기준

### 사과
성공: 아삭한 식감, 풍부한 과즙, 자연스러운 단맛, 신선도, 보관/배송
실패: 비타민, 원료와 함량, 섭취 방법, 4주, 매일 챙기기

### 햇반
성공: 밥맛, 식감, 간편 조리, 실온 보관, 전자레인지, 자취/캠핑/바쁜 식사
실패: 원료, 함량, 섭취, 4주, 건강 루틴

### 카스테라
성공: 촉촉한 식감, 부드러움, 풍미, 간식, 선물
실패: 원료, 함량, 섭취방법, 기능성

## 빌드 결과

`npm run build` 성공 확인.
