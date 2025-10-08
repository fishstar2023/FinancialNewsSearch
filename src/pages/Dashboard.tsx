import React, { useEffect, useState } from "react";
import Report from "../components/Report";
import "./Dashboard.css";

type AIReport = {
  title: string;
  summary: string;
  trends: string[];
  analysis: string[];
  suggestions: string[];
  countries: string[];
  generatedAt: string;
};

const AVAILABLE_TOPICS = [
  "金融", "科技", "能源", "政治", "貿易",
  "區域發展", "環境永續", "基礎建設"
];

// 範例新聞網站（可擴充到 20+）
const NEWS_WEBSITES = [
  { name: "VNExpress", country: "越南", url: "https://vnexpress.net" },
  { name: "ThaiPBS", country: "泰國", url: "https://www.thaipbs.or.th" },
  { name: "Phnom Penh Post", country: "柬埔寨", url: "https://www.phnompenhpost.com" },
  { name: "The Nation", country: "泰國", url: "https://www.nationthailand.com" },
  { name: "Bangkok Post", country: "泰國", url: "https://www.bangkokpost.com" },
];

const Dashboard: React.FC = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedWebsites, setSelectedWebsites] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [outputFormat, setOutputFormat] = useState<"excel" | "ppt">("excel");
  const [reports, setReports] = useState<AIReport[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // 關鍵字操作
  const handleAddKeyword = () => {
    if (inputValue.trim() && !keywords.includes(inputValue.trim())) {
      setKeywords([...keywords, inputValue.trim()]);
      setInputValue("");
    }
  };
  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  // 主題切換
  const handleToggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  // 網站切換
  const handleToggleWebsite = (url: string) => {
    setSelectedWebsites(prev =>
      prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]
    );
  };

  // 搜尋 / 生成報告
  const handleSearch = async () => {
    if (keywords.length === 0 && selectedTopics.length === 0) return;
    if (!userEmail) {
      setMessage("請先輸入你的 Email 📨");
      return;
    }

    setLoading(true);
    setReports([]);
    setMessage("");

    // ===============================
    // ⚠️ 前端模擬生成報告
    // 替換成後端 API 可傳送：
    // keywords, selectedTopics, selectedWebsites, startDate, endDate, outputFormat, email
    // ===============================
    setTimeout(() => {
      const fakeReport: AIReport = {
        title: "範例報告：東南亞金融趨勢",
        summary: "本報告整合近期東南亞金融新聞，摘要如下...",
        trends: ["貨幣政策調整", "股市波動", "新興科技投資"],
        analysis: ["各國利率影響市場情緒", "科技股增長趨勢"],
        suggestions: ["關注印尼與新加坡市場", "留意貨幣波動風險"],
        countries: ["印尼", "新加坡"],
        generatedAt: new Date().toISOString(),
      };

      setReports([fakeReport]);
      setLoading(false);
      setMessage(`報告已寄送到 ${userEmail} 📧`);
    }, 2000);
  };

  // 自動淡出訊息
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="dashboard-container">
      <h1>新聞摘要產生器</h1>
      <p>選擇主題、關鍵字、新聞網站及日期區間，生成 AI 摘要報告。</p>

      {/* Email */}
      <input
        type="email"
        placeholder="請輸入你的 Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        className="email-input"
      />

      {/* 主題 */}
      <div className="topics-container">
        {AVAILABLE_TOPICS.map(topic => (
          <button
            key={topic}
            onClick={() => handleToggleTopic(topic)}
            className={`topic-button ${selectedTopics.includes(topic) ? "selected" : ""}`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* 關鍵字 + 按鈕 */}
      <div className="keywords-container">
        <input
          type="text"
          value={inputValue}
          placeholder="輸入自訂關鍵字（例如：數位貨幣、半導體）"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddKeyword()}
        />
        <button onClick={handleAddKeyword} className="action-button add-button">
          新增
        </button>
      </div>

      {/* 已選關鍵字 */}
      <div>
        {keywords.map(k => (
          <span key={k} className="keyword-chip" onClick={() => handleRemoveKeyword(k)}>
            {k} ✕
          </span>
        ))}
      </div>

      {/* 新聞網站選擇 */}
      <div className="websites-container">
        <h3>選擇新聞網站</h3>
        {NEWS_WEBSITES.map(site => (
          <button
            key={site.url}
            onClick={() => handleToggleWebsite(site.url)}
            className={`website-button ${selectedWebsites.includes(site.url) ? "selected" : ""}`}
          >
            {site.name} ({site.country})
          </button>
        ))}
      </div>

      {/* 日期區間 */}
      <div className="date-range-container">
        <label>
          開始日期:
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </label>
        <label>
          結束日期:
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </label>
      </div>

      {/* 輸出格式 */}
      <div className="output-format-container">
        <label>
          <input
            type="radio"
            name="format"
            value="excel"
            checked={outputFormat === "excel"}
            onChange={() => setOutputFormat("excel")}
          />
          Excel
        </label>
        <label>
          <input
            type="radio"
            name="format"
            value="ppt"
            checked={outputFormat === "ppt"}
            onChange={() => setOutputFormat("ppt")}
          />
          PPT
        </label>
      </div>

      {/* 生成報告按鈕 */}
      <button
        onClick={handleSearch}
        disabled={loading}
        className={`action-button generate-button ${loading ? "loading" : ""}`}
      >
        {loading ? "生成中..." : "生成報告"}
      </button>

      {/* 訊息 */}
      {message && !loading && <div className="success-message"><span>{message}</span></div>}

      {/* Loading */}
      {loading && (
        <div className="loading-wrapper">
          <div className="spinner"></div>
          <p className="loading-text">生成中，請稍候...</p>
        </div>
      )}

      {/* 報告列表 */}
      {reports.map((report, i) => (
        <div key={i} className="report-card">
          <Report report={report} />
        </div>
      ))}

      {/* 尚無報告 */}
      {reports.length === 0 && !loading && !message && (
        <p className="no-report">尚無報告，請選擇主題或輸入關鍵字開始生成。</p>
      )}
    </div>
  );
};

export default Dashboard;
