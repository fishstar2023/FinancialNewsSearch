import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ReportsPage from "./pages/Reports"; 
import SettingsPage from "./pages/Settings";

const App: React.FC = () => {
  return (
    <Router>
      <div
        style={{
          fontFamily: '"思源宋體", "Noto Serif TC", serif',
          background: "#f2f3f2", // 莫蘭迪淺灰綠底
          minHeight: "100vh",
        }}
      >
        {/* 導覽列 */}
        <nav
          style={{
            backgroundColor: "#6b8e70", // 莫蘭迪綠色
            color: "#fff",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "18px" }}>
            東南亞金融新聞摘要系統
          </div>
          <div>
            <Link to="/" style={navLinkStyle}>
              首頁
            </Link>
            { <Link to="/reports" style={navLinkStyle}>
              AI 報告紀錄
            </Link> }
            <Link to="/settings" style={navLinkStyle}>
              設定
            </Link>
          </div>
        </nav>

        {/* 主內容 */}
        <main style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {<Route path="/reports" element={<ReportsPage />} />}
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>

        {/* 頁尾 */}
        <footer
          style={{
            textAlign: "center",
            padding: "12px 0",
            color: "#64748b",
            borderTop: "1px solid #e2e8f0",
            marginTop: "30px",
            fontSize: "14px",
          }}
        >
          © 2025 東南亞金融新聞智能摘要系統
        </footer>
      </div>
    </Router>
  );
};

const navLinkStyle: React.CSSProperties = {
  color: "#fff",
  textDecoration: "none",
  marginRight: "20px",
  fontSize: "15px",
};

export default App;
