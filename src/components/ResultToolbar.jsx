// 결과 상단 툴바: 텍스트 복사 / HTML 복사 / HTML 다운로드 / 새로 만들기.

import { Copy, Check, RefreshCw, Code, Download } from "lucide-react";

const baseBtn = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "7px 12px",
  borderRadius: 8,
  border: "1px solid #DEDCD3",
  background: "#fff",
  color: "#4A4940",
  fontSize: 12.5,
  cursor: "pointer",
};

export default function ResultToolbar({
  copied,
  htmlCopied,
  themeColor,
  onCopy,
  onCopyHtml,
  onDownloadHtml,
  onReset,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 8,
        marginBottom: 18,
        flexWrap: "wrap",
      }}
    >
      <button onClick={onCopy} style={baseBtn}>
        {copied ? <Check size={13} color="#2F6F45" /> : <Copy size={13} />}
        {copied ? "복사됨" : "텍스트 복사"}
      </button>
      <button onClick={onCopyHtml} style={baseBtn}>
        {htmlCopied ? <Check size={13} color="#2F6F45" /> : <Code size={13} />}
        {htmlCopied ? "복사됨" : "HTML 복사"}
      </button>
      <button
        onClick={onDownloadHtml}
        style={{
          ...baseBtn,
          border: "none",
          background: themeColor,
          color: "#fff",
          fontWeight: 600,
        }}
      >
        <Download size={13} /> HTML 다운로드
      </button>
      <button onClick={onReset} style={baseBtn}>
        <RefreshCw size={13} /> 새로 만들기
      </button>
    </div>
  );
}
