import React, { useEffect, useState } from "react";
import Report, { type AIReport } from "../components/Report";

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<AIReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("💡 你可以用自然語言輸入，例如：「找上週有關台積電的報告」");

  // 🟢 抓取報告資料（支援搜尋）
  const fetchReports = async (searchTerm?: string) => {
    try {
      setLoading(true);
      setMessage("🔍 搜尋中...");

      // 若有搜尋字串，就呼叫 search API
      const url = searchTerm
        ? `/api/reports/search?q=${encodeURIComponent(searchTerm)}`
        : "/api/reports";

      const res = await fetch(url);
      if (!res.ok) throw new Error("API 回應錯誤");

      const data = await res.json();
      setReports(data);
      setMessage(data.length === 0 ? "⚠️ 找不到符合的報告" : "");
    } catch (error) {
      console.error(error);
      setMessage("❌ 無法取得資料，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  // 預設載入全部報告
  useEffect(() => {
    fetchReports();
  }, []);

  // 搜尋觸發
  const handleSearch = () => {
    if (!query.trim()) {
      setMessage("⚠️ 請輸入搜尋內容");
      return;
    }
    fetchReports(query);
  };

  return (
    <div
      style={{
        padding: "32px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1
        style={{
          color: "#2F4F2F",
          fontWeight: 700,
          fontSize: "28px",
          marginBottom: "10px",
        }}
      >
        AI 報告查詢
      </h1>
      <p style={{ color: "#666", fontSize: "15px", marginBottom: "24px" }}>
        你可以用自然語言輸入想找的主題，例如：「上週越南貿易新聞摘要」、「AI 晶片趨勢分析」。
      </p>

      {/* 🔍 搜尋欄 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="輸入想查詢的報告（例如：台積電、能源政策...）"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={{
            flex: 1,
            padding: "12px 18px",
            borderRadius: "25px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "15px",
            transition: "all 0.2s ease",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#3A5F3D")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
        />
        <button
          onClick={handleSearch}
          style={{
            background: "#3A5F3D",
            color: "white",
            padding: "10px 22px",
            borderRadius: "25px",
            border: "none",
            fontSize: "15px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#4E7E4F")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#3A5F3D")}
        >
          搜尋
        </button>
      </div>

      {/* 📢 訊息區 */}
      {message && (
        <p
          style={{
            color: "#777",
            fontSize: "14px",
            marginBottom: "16px",
            transition: "opacity 0.3s",
          }}
        >
          {message}
        </p>
      )}

      {/* 📄 報告清單 */}
      {loading ? (
        <div style={{ marginTop: "40px", textAlign: "center", color: "#666" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              border: "3px solid #ccc",
              borderTop: "3px solid #3A5F3D",
              borderRadius: "50%",
              margin: "0 auto 10px",
              animation: "spin 1s linear infinite",
            }}
          />
          <p>資料載入中...</p>
          <style>
            {`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      ) : reports.length > 0 ? (
        reports.map((r, i) => (
          <div
            key={i}
            style={{
              animation: "fadeIn 0.4s ease",
              marginBottom: "20px",
            }}
          >
            <Report report={r} />
          </div>
        ))
      ) : (
        !loading && (
          <p style={{ marginTop: "30px", color: "#777" }}>目前沒有報告可顯示。</p>
        )
      )}
    </div>
  );
};

export default ReportsPage;
