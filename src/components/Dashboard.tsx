import React from "react";
import NewsReportForm from "../components/NewsReportForm";
import "./Dashboard.css"; // 確保 CSS 生效

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-wrapper" style={{ padding: "40px 20px" }}>
      <NewsReportForm />
    </div>
  );
};

export default Dashboard;
