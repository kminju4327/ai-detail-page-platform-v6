# AI 상세페이지 생성 플랫폼

건강기능식품·일반식품 이커머스 셀러를 위한 **AI 상세페이지 생성기**.
제품 정보를 입력하면 AI가 상세페이지 구성안을 생성하고, 동시에 한국 식품 표시·광고
규정(식품 등의 표시·광고에 관한 법률 제8조) 기준으로 과대광고 리스크를 자동 체크·보완한다.

기존 AI 카피 생성기와의 차별점은 **"생성 → 컴플라이언스 자동 체크 → 자동 보완"** 파이프라인이다.

---

## 1. 프로젝트 개요

- **목표**: 카테고리를 좁혀(건기식/일반식품) 도메인 지식을 깊게 반영하고, 표시광고 컴플라이언스를 자동 체크해 실무에 바로 쓸 수 있는 수준의 상세페이지를 생성한다.
- **핵심 기능**: 제품 입력 / 상세페이지 생성 / 컴플라이언스 체크 / 자동 보완 / 부분 재생성(자연어 피드백 포함) / 텍스트·HTML 복사 / HTML 다운로드 / 새로 만들기 / 컴플라이언스 배지 / 테마 컬러 / 디자인 컨셉.
- **현재 범위(MVP)**: 상세페이지 하나에 집중. 광고문구·SNS·숏폼은 향후 확장.

---

## 2. 기술 스택

- **React 18** + **Vite 5** (빌드/개발 서버)
- **lucide-react** (아이콘)
- 상태 관리: React Hooks (외부 상태 라이브러리 없음)
- 스타일: 인라인 스타일 + 전역 CSS (`src/styles`)
- AI: **Claude API** (기본 모델 `claude-sonnet-4-6`)

---

## 3. 폴더 구조

```
ai-detail-page/
├── index.html                  # HTML 엔트리
├── package.json
├── vite.config.js              # Vite 설정 + Anthropic API 프록시
├── .env.example                # 환경변수 예시
├── .gitignore
├── PROJECT_README.md           # 이 문서
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                # React 엔트리
    ├── App.jsx                 # 레이아웃 조립 (좌: 입력 / 우: 결과)
    ├── components/             # UI 컴포넌트
    │   ├── Field.jsx           # 라벨+입력 래퍼
    │   ├── InputRail.jsx       # 좌측 제품 입력 폼 전체
    │   ├── StageProgress.jsx   # 파이프라인 진행 표시
    │   ├── ResultToolbar.jsx   # 결과 복사 / 새로 만들기
    │   ├── ComplianceReport.jsx# 컴플라이언스 배지 + 리스크 카드
    │   ├── PreviewSection.jsx  # 재생성 버튼 포함 미리보기 래퍼
    │   ├── DetailPagePreview.jsx# 상세페이지 미리보기 렌더링
    │   └── ResultPanel.jsx     # 우측 결과 패널 (툴바+리포트+미리보기)
    ├── prompts/                # 모든 프롬프트 빌더
    │   ├── numericGuidance.js  # 순도/함량/EPA·DHA 수치 지침
    │   ├── generationPrompt.js # 생성 프롬프트 (분석+작성 통합)
    │   ├── compliancePrompt.js # 컴플라이언스 체크 프롬프트
    │   ├── remediationPrompt.js# 자동 보완 프롬프트
    │   └── regeneratePrompt.js # 부분 재생성 프롬프트
    ├── compliance/             # 컴플라이언스 규칙
    │   ├── categoryRules.js    # 카테고리별 규칙셋 + 빌더
    │   └── complianceRules.js  # 공통 9대 체크 규칙
    ├── services/               # 외부 연동 / 파이프라인
    │   ├── claudeClient.js     # Claude API 호출 + JSON 파싱
    │   └── pipeline.js         # 생성→체크→보완 파이프라인
    ├── hooks/
    │   └── useDetailPageGenerator.js  # 상태/액션 커스텀 훅
    ├── utils/
    │   ├── jsonParser.js       # 잘린 JSON 복구 파서
    │   ├── htmlExport.js       # 상세페이지 → 독립 실행 HTML 문서 변환/다운로드
    │   └── copyResult.js       # 결과 → 평문 텍스트 변환
    └── styles/
        ├── global.css          # 전역 스타일 + 애니메이션 + 반응형
        └── theme.js            # 색상/컨셉/입력 스타일 토큰
```

---

## 4. 실행 방법

```bash
# 1) 의존성 설치
npm install

# 2) 환경변수 설정 (아래 5번 참고)
cp .env.example .env
# .env 파일을 열어 VITE_ANTHROPIC_API_KEY 를 실제 키로 채운다

# 3) 개발 서버 실행
npm run dev
# http://localhost:5173 접속

# 4) 프로덕션 빌드
npm run build

# 5) 빌드 결과 미리보기
npm run preview
```

---

## 5. 환경변수(.env) 설정

`.env.example` 을 복사해 `.env` 를 만든 뒤 값을 채운다.

| 변수 | 필수 | 설명 |
|---|---|---|
| `VITE_ANTHROPIC_API_KEY` | ✅ | Anthropic API 키 (https://console.anthropic.com 에서 발급) |
| `VITE_ANTHROPIC_MODEL` | 선택 | 사용할 모델. 기본값 `claude-sonnet-4-6` |

---

## 6. Claude API 연결 방법

브라우저에서 Anthropic API를 직접 호출하면 (1) CORS가 막히고 (2) API 키가 노출된다.
이를 피하기 위해 **개발 서버(Vite)의 프록시**를 사용한다.

- 프론트엔드는 `/api/anthropic` 로 요청한다 (`src/services/claudeClient.js`).
- `vite.config.js` 의 프록시가 이 요청을 `https://api.anthropic.com/v1/messages` 로 전달하며, 서버 단에서 `x-api-key` / `anthropic-version` 헤더를 붙인다.
- 따라서 `.env` 의 키는 브라우저 번들에 포함되지 않는다.

> ⚠️ **프로덕션 배포 시 주의**: `npm run build` 로 만든 정적 파일에는 Vite dev 프록시가 없다.
> 실제 배포에서는 별도의 백엔드(서버리스 함수 등)를 만들어 API 키를 서버에서만 다루고,
> 프론트는 그 백엔드로 요청하도록 `API_ENDPOINT` 를 바꿔야 한다. (아래 TODO 참고)

---

## 7. 각 파일 역할 (요약)

- **App.jsx**: 좌/우 2단 레이아웃 조립만 담당.
- **hooks/useDetailPageGenerator.js**: 모든 상태와 액션(generate/regenerate/reset/copy)을 관리. 뷰와 로직 분리의 핵심.
- **services/pipeline.js**: 생성 → 컴플라이언스 → 자동보완(최대 1회) 흐름. 진행 상태를 콜백으로 전달.
- **services/claudeClient.js**: 실제 API 호출 + JSON 파싱(잘림 복구 포함).
- **prompts/**: 프롬프트 문자열을 조립하는 순수 함수들. 프롬프트 수정은 여기서만.
- **compliance/**: 카테고리별 규칙셋과 공통 체크 규칙. 새 카테고리 추가의 진입점.
- **utils/**: JSON 복구, 결과 텍스트 변환 등 순수 유틸.
- **components/**: 화면 요소. 로직 없이 props로만 동작.

---

## 8. 프롬프트 구조

파이프라인은 4종류의 프롬프트를 사용한다 (모두 `src/prompts/`).

1. **생성 프롬프트** (`generationPrompt.js`)
   - 타깃 페인포인트 분석 + 상세페이지 작성을 **한 번의 호출**로 통합.
   - 카테고리 제약(`categoryRules`) + 수치 지침(`numericGuidance`)을 주입.
   - 출력: hero + 6개 섹션(problem/solution/objection_handling/benefit_list/how_to_use/trust_badges) JSON.

2. **컴플라이언스 프롬프트** (`compliancePrompt.js`)
   - 생성 콘텐츠를 9대 규칙 + 카테고리별 focus로 검토.
   - 출력: `flags[]`(위반유형/문구/리스크레벨/수정제안) + `overall_status`(pass/needs_review).

3. **자동 보완 프롬프트** (`remediationPrompt.js`)
   - needs_review 시 flags를 반영해 콘텐츠를 1회 자동 수정.

4. **부분 재생성 프롬프트** (`regeneratePrompt.js`)
   - 특정 섹션(또는 hero)만 톤 유지하며 다시 작성.

### 수치 지침 (numericGuidance.js) — 중요
오메가3 등에서 반복적으로 발생한 이슈를 데이터 단에서 해결하기 위한 로직.
- 원료 **순도(%)** vs **실제 함량(mg)** 구분
- 실제 함량이 **원료 총중량** 기준인지 **핵심 활성성분** 기준인지 구분
- **EPA/DHA 개별 함량** 입력 시 실제 수치 표기, 없으면 "성분표 참조"로 안내(플레이스홀더 금지)

---

## 9. 컴플라이언스 구조

- **공통 9대 규칙** (`complianceRules.js`): 카테고리 무관하게 항상 적용.
  1. 질병 예방·치료 효능 암시 2. 의약품 오인 3. 건기식 아닌 것을 건기식으로 오인
  4. 거짓·과장(수치 불명확 포함) 5. 소비자 기만 6. 타업체 비방/부당비교(은근한 비교 포함)
  7. 사행심 조장 8. 상호·상표 오인 9. 암묵적 효능 암시
- **카테고리별 규칙** (`categoryRules.js`): 생성 가이드 / 금지어 / 추가 규칙(extraRules) / 컴플라이언스 focus.
- **설계 철학**: AI는 명백한 위반을 1차로 거르고(HIGH), 애매한 뉘앙스(LOW/MEDIUM)는 화면에 표시만 하여 **사람이 최종 판단**한다. 자동 보완은 최대 1회(무한 반복 시 카피가 밋밋·방어적으로 변하는 것을 방지).

### 새 카테고리 추가 방법 (예: 신선식품)
1. `src/compliance/categoryRules.js` 의 `CATEGORY_RULES` 에 항목 추가:
   ```js
   "신선식품": {
     generationGuidance: "원산지 표시 규정 준수, 신선도·당도·산지 중심으로 소구...",
     forbiddenWords: [...],
     extraRules: [...],
     complianceFocus: ["원산지 표시 누락 여부", ...],
   }
   ```
2. `src/components/InputRail.jsx` 의 카테고리 토글 배열에 `"신선식품"` 추가.
- 파이프라인/프롬프트 코드는 **수정 불필요** (규칙 객체만 읽어서 동작).

---

## 10. 앞으로 개발해야 할 TODO

- [ ] **프로덕션 API 프록시**: 배포 환경용 백엔드(서버리스 함수 등) 구축, `claudeClient.js` 의 `API_ENDPOINT` 교체. (현재는 Vite dev 프록시 전용)
- [x] ~~**자연어 피드백 기반 부분 재생성**: "더 짧게", "이 문장만 빼줘" 같은 입력을 받아 반영.~~ (완료 — 각 섹션 말풍선 버튼)
- [ ] **카테고리 확장**: 신선식품(원산지표시법), 가공식품(알레르기·첨가물 표시) 규칙셋 추가.
- [ ] **제품 사진 AI 분석(비전)**: 현재는 미리보기만. 사진에서 특징 자동 추출.
- [ ] **숏폼 영상 기획 기능**: 상세페이지 결과를 입력으로 재사용해 대본+장면 생성.
- [ ] **결과 버전 관리**: undo/이력, 이전 버전 되돌리기.
- [ ] **컴플라이언스 규칙 최신화**: 법령 개정 반영 (식약처 mfds.go.kr, 한국건강기능식품협회 khff.or.kr).

---

## 11. 다른 AI가 이어서 개발할 때 참고사항

- **프롬프트를 고칠 땐 `src/prompts/` 만** 보면 된다. UI/파이프라인과 분리돼 있다.
- **컴플라이언스 규칙을 고칠 땐 `src/compliance/` 만** 보면 된다.
- **로직과 뷰가 분리**돼 있다: 상태/액션은 `hooks/useDetailPageGenerator.js`, 화면은 `components/`. 새 UI를 추가할 때 로직은 훅에, 표현은 컴포넌트에.
- **파이프라인 흐름**은 `services/pipeline.js` 한 파일에 모여 있다. 단계 추가/제거는 여기서.
- **stage 값 의미**: `-1` 대기 / `0` 생성중 / `2` 컴플라이언스 / `3` 자동보완 / `4` 완료. (`StageProgress.jsx` 가 이 값으로 진행 표시)
- **알려진 함정**:
  - LLM 응답이 `max_tokens` 에 걸려 잘리면 JSON 파싱이 실패한다 → `utils/jsonParser.js` 가 복구를 시도하지만, 잦으면 `services/pipeline.js` 의 `TOKENS` 값을 올려야 한다.
  - 프롬프트 빌더에서 문자열 조립 시 변수 선언 순서(특히 `numericGuidance` ↔ `epaGuidance`)에 주의. (과거 TDZ 버그 이력)
- **테스트 시나리오**(회귀 방지용):
  - 일반식품 "베르베린": 당뇨/혈당 등 질병 언급이 안 나와야 함.
  - 건기식 "오메가3": 원료 총중량(1000mg)과 EPA/DHA(예: 480/360mg)가 구분 표기돼야 함.
  - 공통: "다른 제품과 뭐가 다른가요" 같은 비교 프레임이 안 나와야 함.
