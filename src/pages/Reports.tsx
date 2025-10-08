import React from "react";
import Report, { type AIReport } from "../components/Report";

const ReportsPage: React.FC = () => {
  const mockReports: AIReport[] = [
    {
      title: "2025 Q3 金融市場分析",
      summary: "本季度市場波動較大...",
      trends: ["東南亞股市回升", "美聯準會利率政策影響"],
      analysis: ["金融股表現良好", "能源股波動明顯"],
      suggestions: ["觀察利率政策", "短線操作注意風險"],
      countries: ["新加坡", "越南"],
      generatedAt: new Date().toLocaleString(),
    },
  ];

  return (
    <div>
      <h1>歷史 AI 報告</h1>
      {mockReports.map((r, i) => (
        <Report key={i} report={r} />
      ))}
    </div>
  );
};

export default ReportsPage;
