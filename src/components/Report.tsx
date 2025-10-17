import React, { useState } from "react";

export type AIReport = {
  title: string;
  summary: string;
  bulletPoints?: string[]; // ✅ 新增：摘要重點欄位
  trends?: string[];
  analysis?: string[];
  suggestions?: string[];
  countries?: string[];
  source?: string; // ✅ 來源網站
  generatedAt: string;
};

interface ReportProps {
  report: AIReport;
}

const Report: React.FC<ReportProps> = ({ report }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      style={{
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "20px",
        background: "#F7F8F5",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        color: "#4B4B4B",
        lineHeight: 1.6,
      }}
    >
      <h2
        onClick={() => setExpanded(!expanded)}
        style={{
          cursor: "pointer",
          color: "#3A5F3D",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{report.title}</span>
        <span>{expanded ? "▲" : "▼"}</span>
      </h2>

      {expanded && (
        <>
          <div>
            <h3 style={{ color: "#7F9773" }}>摘要</h3>
            <p>{report.summary}</p>
          </div>

          {report.bulletPoints && report.bulletPoints.length > 0 && (
            <div>
              <h3 style={{ color: "#7F9773" }}>重點</h3>
              <ul>
                {report.bulletPoints.map((bp, i) => (
                  <li key={i}>{bp}</li>
                ))}
              </ul>
            </div>
          )}

          {report.trends && report.trends.length > 0 && (
            <div>
              <h3 style={{ color: "#7F9773" }}>趨勢</h3>
              <ul>{report.trends.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
          )}

          {report.analysis && report.analysis.length > 0 && (
            <div>
              <h3 style={{ color: "#7F9773" }}>分析</h3>
              <ul>{report.analysis.map((a, i) => <li key={i}>{a}</li>)}</ul>
            </div>
          )}

          {report.suggestions && report.suggestions.length > 0 && (
            <div>
              <h3 style={{ color: "#7F9773" }}>建議</h3>
              <ul>{report.suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          )}

          {report.countries && report.countries.length > 0 && (
            <div>
              <h3 style={{ color: "#7F9773" }}>涉及國家</h3>
              <p>{report.countries.join(", ")}</p>
            </div>
          )}

          <div style={{ fontSize: "0.85em", color: "#888", marginTop: "12px" }}>
            {report.source && <p>來源：{report.source}</p>}
            <p>產出時間：{report.generatedAt}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
