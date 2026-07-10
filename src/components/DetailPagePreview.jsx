// 생성된 상세페이지 미리보기.
// hero + 각 섹션을 선택된 디자인 컨셉/테마 컬러로 렌더링하고,
// 각 블록에 부분 재생성 버튼(PreviewSection)을 붙인다.

import PreviewSection from "./PreviewSection.jsx";
import { CONCEPT_STYLES, sectionLabel } from "../styles/theme.js";

export default function DetailPagePreview({ draft, image, concept, themeColor, onRegen, regenIndex }) {
  if (!draft) return null;

  const conceptStyle = CONCEPT_STYLES[concept];

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      {/* HERO */}
      <PreviewSection idx="hero" onRegen={onRegen} loading={regenIndex === "hero"} accent={themeColor}>
        <div
          style={{
            borderRadius: conceptStyle.radius,
            boxShadow: conceptStyle.shadow,
            border: conceptStyle.border,
            padding: 28,
            background: "#fff",
          }}
        >
          {image && (
            <img
              src={image}
              alt="product"
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: conceptStyle.radius,
                marginBottom: 18,
              }}
            />
          )}
          <div
            style={{
              fontFamily: conceptStyle.headFont,
              fontWeight: conceptStyle.headWeight,
              fontSize: 26,
              lineHeight: 1.3,
              color: "#1F2A24",
              marginBottom: 8,
            }}
          >
            {draft.hero_headline}
          </div>
          <div style={{ fontSize: 14.5, color: "#6B6A61" }}>{draft.hero_subcopy}</div>
        </div>
      </PreviewSection>

      {/* SECTIONS */}
      {draft.sections?.map((s, i) => (
        <PreviewSection key={i} idx={i} onRegen={onRegen} loading={regenIndex === i} accent={themeColor}>
          <div
            style={{
              borderRadius: conceptStyle.radius,
              boxShadow: conceptStyle.shadow,
              border: conceptStyle.border,
              padding: "20px 24px",
              background: "#fff",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: themeColor,
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {sectionLabel(s.type)}
            </div>
            {s.title && (
              <div
                style={{
                  fontFamily: conceptStyle.headFont,
                  fontWeight: conceptStyle.headWeight,
                  fontSize: 17,
                  marginBottom: 6,
                  color: "#1F2A24",
                }}
              >
                {s.title}
              </div>
            )}
            {s.body && (
              <div style={{ fontSize: 14, color: "#4A4940", lineHeight: 1.6 }}>{s.body}</div>
            )}
            {s.items && (
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: "#4A4940", lineHeight: 1.8 }}>
                {s.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            )}
          </div>
        </PreviewSection>
      ))}
    </div>
  );
}
