import React, { useEffect, useState } from "react";
import "./Dashboard.css";

type TaskStatus = "idle" | "creating" | "running" | "completed" | "failed";

interface TaskResponse {
  task_id: string;
  message: string;
}

interface TaskProgress {
  task_id: string;
  status: string;
  progress: number;
  error: string | null;
  current_step?: string;
  step_message?: string;
  artifacts?: {
    report_pdf_path?: string;
    email_sent_to?: string;
  };
}

const NewsReportForm: React.FC = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [taskId, setTaskId] = useState<string | null>(null);
  const [progress, setProgress] = useState<TaskProgress | null>(null);
  const [status, setStatus] = useState<TaskStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const BASE_URL = "http://localhost:8000/api/tasks";

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

  const handleGenerateReport = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!userPrompt.trim()) {
      setErrorMessage("請輸入搜尋需求");
      return;
    }
    if (!userEmail.trim()) {
      setErrorMessage("請輸入電子郵件");
      return;
    }
    if (!validateEmail(userEmail)) {
      setErrorMessage("請輸入正確的電子郵件格式");
      return;
    }

    setStatus("creating");
    setProgress(null);
    setTaskId(null);

    try {
      const response = await fetch(`${BASE_URL}/news-report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_prompt: userPrompt,
          email: userEmail,
          language: "Chinese",
          time_range: "最近7天內",
          count_hint: "5-10篇",
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        if (err.detail?.[0]?.msg?.includes("quota")) {
          throw new Error("API 配額已用完，請稍後再試");
        }
        throw new Error("系統忙碌，請稍後再試");
      }

      const data: TaskResponse = await response.json();
      setTaskId(data.task_id);
      setStatus("running");
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "建立任務時發生錯誤"
      );
      setStatus("idle");
    }
  };

  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${BASE_URL}/${taskId}`);
        if (!res.ok) throw new Error("查詢任務失敗");
        const data: TaskProgress = await res.json();
        setProgress(data);

        // 成功狀態
        if (data.status === "completed" || data.status === "succeeded") {
          clearInterval(interval);
          setStatus("idle"); // 允許重新生成
          setSuccessMessage(
            `🎉 所有步驟完成！報告已發送至: ${
              data.artifacts?.email_sent_to || userEmail
            }`
          );
          setTaskId(null);
          setProgress(null); // 隱藏進度條
        } else if (data.status === "failed") {
          clearInterval(interval);
          setStatus("idle"); // 允許重新生成
          setErrorMessage("系統忙碌，請稍後再試");
          setTaskId(null);
          setProgress(null);
        }
      } catch {
        clearInterval(interval);
        setStatus("idle"); // 允許重新生成
        setErrorMessage("系統忙碌，請稍後再試");
        setTaskId(null);
        setProgress(null);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [taskId, userEmail]);

  return (
    <div className="dashboard-container" style={{ fontFamily: "'Source Han Serif SC', '思源宋體', serif" }}>
      <div className="dashboard-header">
        <h1>AI 新聞報告產生器</h1>
        <p>輸入搜尋需求與你的信箱，AI 將生成報告並寄送給你。</p>
      </div>

      <div className="section">
        <h3>搜尋需求</h3>
        <textarea
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder={`請詳述你的需求，例如：
請幫我檢查近兩個月的金融科技新聞，大約五篇`}
          className="prompt-input"
        />
      </div>

      <div className="section">
        <h3>收件信箱</h3>
        <input
          type="email"
          placeholder="your.email@example.com"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className={`email-input ${
            userEmail && !validateEmail(userEmail) ? "input-error" : ""
          }`}
        />
        {userEmail && !validateEmail(userEmail) && (
          <p className="error-message">⚠ 請輸入正確的電子郵件格式</p>
        )}
      </div>

      <div className="generate-section">
        <button
          onClick={handleGenerateReport}
          disabled={status === "creating" || status === "running"}
          className={`action-button ${status === "running" ? "loading" : ""}`}
        >
          {status === "running"
            ? "生成中..."
            : status === "creating"
            ? "建立任務中..."
            : "生成報告"}
        </button>
      </div>

      {/* ✅ 進度條 */}
      {progress && status === "running" && (
        <div className="progress-section">
          <p>⏳ 任務狀態：{progress.status}</p>
          <div className="progress-bar-wrapper">
            <div
              className="progress-bar"
              style={{ width: `${progress.progress}%` }}
            ></div>
          </div>
          <p>📈 進度：{progress.progress}%</p>
          {progress.current_step && <p>🔍 步驟：{progress.current_step}</p>}
          {progress.step_message && <p>{progress.step_message}</p>}
        </div>
      )}

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {progress?.artifacts?.report_pdf_path && (
        <div className="report-result">
          <a
            href={`http://localhost:8000${progress.artifacts.report_pdf_path}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            📎 點此下載報告 PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default NewsReportForm;
