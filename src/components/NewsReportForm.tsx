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

  const handleGenerateReport = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!userPrompt.trim()) {
      setErrorMessage("請輸入報告主題或關鍵描述");
      return;
    }
    if (!userEmail.trim()) {
      setErrorMessage("請輸入電子郵件");
      return;
    }

    setStatus("creating");

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
        const errData = await response.json();
        throw new Error(errData.detail?.[0]?.msg || "任務建立失敗");
      }

      const data: TaskResponse = await response.json();
      setTaskId(data.task_id);
      setStatus("running");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "建立任務時發生錯誤");
      } else {
        setErrorMessage("建立任務時發生未知錯誤");
      }
      setStatus("failed");
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

        if (data.status === "completed") {
          clearInterval(interval);
          setStatus("completed");
          setSuccessMessage(
            `📄 報告已寄送至 ${data.artifacts?.email_sent_to || userEmail}`
          );
        } else if (data.status === "failed") {
          clearInterval(interval);
          setStatus("failed");
          setErrorMessage(data.error || "任務失敗");
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "未知錯誤";
        setErrorMessage("查詢任務狀態時發生錯誤: " + msg);
        clearInterval(interval);
        setStatus("failed");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [taskId, userEmail]);

  return (
    <div className="dashboard-container">
      <h1>AI 新聞報告產生器</h1>
      <p>輸入分析主題與你的信箱，AI 將生成報告並寄送給你。</p>

      <div className="section">
        <h3>搜尋需求</h3>
        <textarea
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="請詳述你的需求，
例如：請幫我檢查近兩個月的金融科技新聞，大約五篇"
          rows={4}
          className="prompt-input"
        />
      </div>

      <div className="section email-section">
        <label className="email-label">請填寫你的信箱</label>
        <input
          type="email"
          placeholder="your.email@example.com"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="email-input"
        />
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

      {progress && status === "running" && (
        <div className="progress-section">
          <p>⏳ 任務狀態：{progress.status}</p>
          <p>📈 進度：{progress.progress}%</p>
          {progress.current_step && <p>🔍 步驟：{progress.current_step}</p>}
          {progress.step_message && <p>{progress.step_message}</p>}
        </div>
      )}

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {status === "completed" && progress?.artifacts?.report_pdf_path && (
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
