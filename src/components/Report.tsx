import React, { useState } from "react";

export type AIReport = {
  title: string;
  summary: string;
  trends: string[];
  analysis: string[];
  suggestions: string[];
  countries: string[];
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
        style={{ cursor: "pointer", color: "#3A5F3D" }}
      >
        {report.title} {expanded ? "▲" : "▼"}
      </h2>

      {expanded && (
        <>
          <div>
            <h3 style={{ color: "#7F9773" }}>摘要</h3>
            <p>{report.summary}</p>
          </div>
          <div>
            <h3 style={{ color: "#7F9773" }}>趨勢</h3>
            <ul>{report.trends.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </div>
          <div>
            <h3 style={{ color: "#7F9773" }}>分析</h3>
            <ul>{report.analysis.map((a, i) => <li key={i}>{a}</li>)}</ul>
          </div>
          <div>
            <h3 style={{ color: "#7F9773" }}>建議</h3>
            <ul>{report.suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
